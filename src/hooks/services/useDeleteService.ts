import { useMutation } from "@tanstack/react-query";
import { deleteService } from "../../services/services/serviceService";

export const useDeleteService = (token: string | undefined, id: number) => {
  return useMutation({
    mutationKey: ["delete service", id],
    mutationFn: () => deleteService(token, id),
  });
};
