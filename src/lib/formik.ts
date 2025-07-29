import { ObjectSchema } from "yup";
import { FormikErrors } from "formik";

type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K | `${string & K}.${string & DeepKeys<T[K]>}`;
    }[keyof T]
  : never;

// Type to get the properties of an array
type ArrayProperties<T> = T extends (infer U)[] ? keyof U : never;

export function createFieldNameTyped<T>() {
  function nameTyped<K extends DeepKeys<T>>(field: K): K {
    return field;
  }

  // Function to create array field name typed
  function arrayFieldNameTyped<
    K extends keyof T,
    P extends ArrayProperties<T[K]>
  >(
    arrayField: K extends keyof T & (T[K] extends any[] ? K : never)
      ? K
      : never,
    property: P,
    index: number
  ): string {
    return `${String(arrayField)}[${index}].${String(property)}`;
  }

  return {
    nameTyped,
    arrayFieldNameTyped,
  };
}

export function createFieldValueTyped<T>(
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<T>>
) {
  function setFieldValueTyped<K extends keyof T>(
    field: K,
    value: T[K],
    shouldValidate?: boolean
  ) {
    return setFieldValue(field as string, value, shouldValidate);
  }

  return { setFieldValueTyped };
}

export function getClearFieldsObjectFromSchema(
  schema: ObjectSchema<any>
): Record<string, any> {
  const fieldsToClear = Object.keys(schema.fields);

  const clearFields: Record<string, any> = {};

  fieldsToClear.forEach((field) => {
    clearFields[field] = "";
  });

  return clearFields;
}
