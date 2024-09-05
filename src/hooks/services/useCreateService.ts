import { useMutation } from "@tanstack/react-query";
import { ServiceAddUpdate } from "../../types/Service";
import { createService } from "../../services/services/serviceService";

export const useCreateService = (token: string | undefined) => {
  return useMutation({
    mutationKey: ["create service"],
    mutationFn: (serviceData: ServiceAddUpdate) => createService(token, serviceData),
  });
};
