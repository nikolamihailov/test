import { useMutation } from "@tanstack/react-query";
import { ServiceAddUpdate } from "../../types/Service";
import { updateService } from "../../services/services/serviceService";

export const useUpdateService = (token: string | undefined, id: number) => {
  return useMutation({
    mutationKey: ["update service", id],
    mutationFn: (serviceData: ServiceAddUpdate) => updateService(token, id, serviceData),
  });
};
