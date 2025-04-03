"use client";

import { useState } from "react";

import { ErrorMessage, useField } from "formik";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

interface Option {
  id: string | number;
  label: string;
  value?: unknown;
}

interface Props {
  name: string;
  label?: string;
  disabled: boolean;
  placeholder?: string;
  commandEmpty?: string;
  options: Option[];
}

export function FormCombobox({
  name,
  label,
  disabled,
  placeholder,
  commandEmpty,
  options,
}: Props) {
  const [field, , helpers] = useField(name);

  const [openCombobox, setOpenCombobox] = useState<boolean>(false);

  const handleSelectToggleCombobox = (option: Option) => {
    if (field.value && field.value.value === option?.value) {
      helpers.setValue(null);
    } else {
      helpers.setValue(option);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label
          onClick={() => setOpenCombobox(true)}
          className="text-sm font-medium"
        >
          {label}
        </Label>
      )}

      <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox}
            className="w-full justify-between"
          >
            {field.value
              ? options.find((option) => option.id === field.value?.id)?.label
              : placeholder}

            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder={placeholder || "Buscar..."}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>{commandEmpty || "No encontrado."}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
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

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
}
