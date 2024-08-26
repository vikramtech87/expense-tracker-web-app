import { type RegisterFormData, registerFormSchema } from "@/lib/types/schemas/register-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod";

const useRegisterForm = () => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  return form;
};

export default useRegisterForm;