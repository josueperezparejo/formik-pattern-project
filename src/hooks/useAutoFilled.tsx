import { InitialValues } from "@/app/page";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export interface FormState {
  currentStep: number;
  formData: InitialValues;
}

const fetchFormData = (): Promise<FormState> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        currentStep: 3,
        formData: {
          apodo: "El pepe",
          nombre: "Josue David",
          apellido: "Perez Parejo",
          email: "juan.perez@example.com",
          password: "Josue123*",
          confirmPassword: "Josue123*",
          descripcion: "Descripción de ejemplo",
          categoria: { label: "Tecnología", value: "tecnologia" },
          fechaNacimiento: new Date(),
          genero: "masculino",
          notificaciones: false,
          edad: "30",
          terminosCondiciones: true,
          userRole: { label: "Administrador", value: "admin", id: 1 },
          userRoleAuto: "",
          currency: undefined,
          price: undefined,
          friends: [
            {
              name: "Josue",
              lastName: "Perez",
            },
          ],
        },
      });

      // resolve(undefined);
    }, 1000);
  });
};

export const useAutoFilled = () => {
  const query = useQuery({
    queryKey: queryKeys.formikMultiStep.example,
    queryFn: fetchFormData,
  });

  return query;
};
