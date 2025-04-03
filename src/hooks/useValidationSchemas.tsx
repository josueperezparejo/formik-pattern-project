import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useValidationSchema = () => {
  const t = useTranslations("Validations");

  const stepOneSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(2, t("nombre.min"))
      .max(50, t("nombre.max"))
      .required(t("nombre.required")),
    apellido: Yup.string()
      .min(2, t("apellido.min"))
      .max(50, t("apellido.max"))
      .required(t("apellido.required")),
    email: Yup.string().email(t("email.email")).required(t("email.required")),
    password: Yup.string()
      .min(8, t("password.min"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        t("password.matches")
      )
      .required(t("password.required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("confirmPassword.oneOf"))
      .required(t("confirmPassword.required")),
    descripcion: Yup.string()
      .min(10, t("descripcion.min"))
      .max(500, t("descripcion.max"))
      .required(t("descripcion.required")),
    friends: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .min(2, t("friends.name.min"))
          .max(50, t("friends.name.max"))
          .required(t("friends.name.required")),
        lastName: Yup.string()
          .min(2, t("friends.lastName.min"))
          .max(50, t("friends.lastName.max"))
          .required(t("friends.lastName.required")),
      })
    ),
  });

  const stepTwoSchema = Yup.object().shape({
    apodo: Yup.string().required("este apodo es requerido"),
    categoria: Yup.object().required(t("categoria.required")),
    fechaNacimiento: Yup.date()
      .min(new Date(), t("fechaNacimiento.min"))
      .required(t("fechaNacimiento.required")),
    genero: Yup.string().required(t("genero.required")),
    notificaciones: Yup.boolean(),
  });

  const stepThreeSchema = Yup.object().shape({
    edad: Yup.number()
      .min(18, t("edad.min"))
      .max(120, t("edad.max"))
      .required(t("edad.required")),
    terminosCondiciones: Yup.boolean().oneOf(
      [true],
      t("terminosCondiciones.oneOf")
    ),
    userRole: Yup.object().required(t("userRole.required")),
    currency: Yup.object().required(t("currency.required")),
    price: Yup.number().required(t("price.required")),
  });

  return { stepOneSchema, stepTwoSchema, stepThreeSchema };
};
