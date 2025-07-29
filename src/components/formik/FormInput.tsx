"use client";

import { useEffect, useState } from "react";

import { ErrorMessage, useField } from "formik";
import { NumericFormat } from "react-number-format";
import { LuLoaderCircle, LuSearch } from "react-icons/lu";

import { Checkbox } from "../ui/checkbox";
import { Calendar } from "../ui/calendar";

import { cn, DateTimeFormatter } from "@/lib";

import {
  Eye,
  Check,
  EyeOff,
  Pencil,
  CalendarIcon,
  ChevronsUpDown,
} from "lucide-react";

import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "../ui/select";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Label } from "../ui/label";

interface Option {
  id: string | number;
  label: string;
  value?: unknown;
}

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  type:
    | React.HTMLInputTypeAttribute
    | "textarea"
    | "checkbox"
    | "switch"
    | "price"
    | "select"
    | "combobox"
    | "calendar";
  disabled?: boolean;
  isEditing?: boolean;
  isLoading?: boolean;
  showErrorMessage?: boolean;
  currencyPrefix?: string;
  options?: Option[];
  optionsEmptyCombobox?: string;
  onChangeCallback?: () => void;
}

export function FormInput({
  name,
  type,
  label,
  options,
  disabled,
  isEditing,
  isLoading,
  className,
  placeholder,
  currencyPrefix,
  optionsEmptyCombobox,
  showErrorMessage = true,
  onChangeCallback,
  ...props
}: Props) {
  let inputElement;

  const [field, meta, helpers] = useField(name);

  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [openCombobox, setOpenCombobox] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSelectToggleCombobox = (option: Option) => {
    if (field.value && field.value.value === option.value) {
      helpers.setValue(undefined);
    } else {
      helpers.setValue(option);
      onChangeCallback?.(); // <-- Llamada a la función de callback
    }
  };

  const handleChange = (value: unknown) => {
    helpers.setValue(value);
    onChangeCallback?.(); // <-- Llamada a la función de callback
  };

  switch (type) {
    case "textarea":
      inputElement = (
        <Textarea
          disabled={disabled}
          id={name}
          {...field}
          {...props}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          className={`border ${
            meta.touched && meta.error ? "border-red-500" : ""
          } ${className}`}
        />
      );
      break;
    case "password":
      inputElement = (
        <div className="relative">
          <Input
            disabled={disabled}
            id={name}
            {...field}
            {...props}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
            className={`border ${
              meta.touched && meta.error ? "border-red-500" : ""
            } ${className}`}
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <EyeOff className="text-muted-foreground h-4 w-4" />
            ) : (
              <Eye className="text-muted-foreground h-4 w-4" />
            )}
          </Button>
        </div>
      );

      break;
    case "search":
      inputElement = (
        <div className="relative">
          <Input
            disabled={disabled}
            id={name}
            {...field}
            {...props}
            type={type}
            placeholder={placeholder}
            className={`border pr-8 ${
              meta.touched && meta.error ? "border-red-500" : ""
            } ${className}`}
          />
          <LuSearch
            size={12}
            className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
            aria-hidden="true"
          />
        </div>
      );

      break;
    case "date":
      inputElement = (
        <Input
          disabled={disabled}
          id={name}
          {...field}
          {...props}
          type={type}
          placeholder={placeholder}
          className={`border ${
            meta.touched && meta.error ? "border-red-500" : ""
          } ${className}`}
        />
      );

      break;
    case "switch":
      inputElement = (
        <Switch
          disabled={disabled}
          id={name}
          {...field}
          {...props}
          checked={field.value}
          onCheckedChange={(checked) => {
            field.onChange({ target: { name, value: checked } });
          }}
        />
      );
      break;
    case "checkbox":
      inputElement = (
        <Checkbox
          disabled={disabled}
          id={name}
          {...field}
          {...props}
          checked={field.value}
          onCheckedChange={(checked) => {
            field.onChange({ target: { name, value: checked } });
          }}
          className={`${
            meta.touched && meta.error ? "border-red-500" : ""
          } ${className}`}
        />
      );
      break;
    case "price":
      let numericValue: string;

      inputElement = (
        <NumericFormat
          {...field}
          {...props}
          id={name}
          disabled={disabled}
          prefix={currencyPrefix || "$"}
          placeholder={placeholder}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={2}
          fixedDecimalScale
          allowNegative={false}
          className={`border ${
            meta.touched && meta.error ? "border-red-500" : ""
          } ${className}`}
          customInput={Input}
          onValueChange={(values) => {
            numericValue = `${values?.floatValue}` || "";
          }}
          onChange={(event) => {
            event.target.value = numericValue;
            field.onChange(event);
          }}
        />
      );
      break;
    case "select":
      inputElement = (
        <Select
          disabled={disabled || isLoading}
          open={openSelect}
          onOpenChange={setOpenSelect}
          onValueChange={(value) => {
            helpers.setValue(JSON.parse(value));
          }}
          value={field.value ? JSON.stringify(field.value) : ""}
        >
          <SelectTrigger id={name}>
            <SelectValue
              placeholder={
                isLoading ? (
                  <LuLoaderCircle className="animate-spin" />
                ) : (
                  placeholder || "Select an option"
                )
              }
            />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.id} value={JSON.stringify(option)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
      break;
    case "combobox":
      inputElement = (
        <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
          <PopoverTrigger className="truncate" asChild>
            <Button
              id={name}
              disabled={disabled || isLoading}
              variant="outline"
              role="combobox"
              aria-expanded={openCombobox}
              className="w-full justify-between truncate"
            >
              {isLoading ? (
                <LuLoaderCircle className="animate-spin" />
              ) : field.value ? (
                options?.find((option) => option.id === field.value?.id)?.label
              ) : (
                placeholder
              )}

              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <CommandDialog>
              <CommandInput
                placeholder={placeholder || "Buscar..."}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>
                  {optionsEmptyCombobox || "No encontrado."}
                </CommandEmpty>
                <CommandGroup>
                  {options?.map((option) => (
                    <CommandItem
                      key={option.id}
                      value={JSON.stringify(option)}
                      onSelect={() => {
                        handleSelectToggleCombobox(option);
                        setOpenCombobox(false);
                      }}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          field.value && field.value.id === option.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
      break;
    case "calendar":
      const dateFormated = DateTimeFormatter.formatDateToLocal(field.value);
      const date = new Date(dateFormated);

      inputElement = (
        <div className="w-full">
          <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
            <PopoverTrigger asChild>
              <Button
                id={name}
                disabled={disabled}
                variant="outline"
                role="calendar"
                aria-expanded={openCombobox}
                className="w-full justify-between"
              >
                {field.value
                  ? DateTimeFormatter.formatDateToLocal(
                      field.value,
                      "dd/MM/yyyy"
                    )
                  : placeholder || "Selecciona una fecha"}
                <CalendarIcon className="size-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                captionLayout={"dropdown"}
                mode="single"
                selected={field.value ? date : undefined}
                defaultMonth={field.value ? date : undefined}
                onSelect={(date) => {
                  handleChange(date ? date.toISOString() : undefined);
                  setOpenCombobox(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      );
      break;

    default:
      inputElement = (
        <Input
          disabled={disabled}
          id={name}
          {...field}
          {...props}
          type={type}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          className={`border ${
            meta.touched && meta.error ? "border-red-500" : ""
          } ${className}`}
        />
      );
      break;
  }

  useEffect(() => {
    if (meta.value && meta.error) {
      helpers.setTouched(true, true);
      return;
    }

    if (meta.touched) {
      helpers.setTouched(true, true);
      return;
    }
  }, [meta?.error, meta?.touched, meta?.value, helpers]);

  return (
    <div className={cn("space-y-2 space-x-2")}>
      {(type === "checkbox" || type === "switch") && (
        <div className="flex items-start space-x-2">
          {inputElement}
          <div className="grid gap-1.5 leading-none">
            {isEditing && (
              <div className="flex items-center space-x-2">
                <Label
                  onClick={(event) => {
                    if (disabled) event.preventDefault();
                  }}
                  htmlFor={name}
                  className="text-sm leading-none font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label || <span className="invisible">.</span>}
                </Label>
                <Pencil size={12} />
              </div>
            )}

            {!isEditing && (
              <Label
                onClick={(event) => {
                  if (disabled) event.preventDefault();
                }}
                htmlFor={name}
                className="text-sm leading-none font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label || <span className="invisible">.</span>}
              </Label>
            )}
          </div>
        </div>
      )}

      {type !== "checkbox" && type !== "switch" && (
        <>
          {isEditing && (
            <div className="flex items-center space-x-2">
              <Label
                onClick={(event) => {
                  if (disabled) event.preventDefault();
                }}
                htmlFor={name}
                className="text-sm leading-none font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label || <span className="invisible">.</span>}
              </Label>
              <Pencil size={12} />
            </div>
          )}

          {!isEditing && (
            <Label
              onClick={(event) => {
                if (disabled) event.preventDefault();
              }}
              htmlFor={name}
              className="text-sm leading-none font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label || <span className="invisible">.</span>}
            </Label>
          )}

          {inputElement}
        </>
      )}

      {showErrorMessage && (
        <ErrorMessage
          name={name}
          component="p"
          className="text-sm text-red-500"
        />
      )}
    </div>
  );
}
