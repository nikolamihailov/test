import { Box, Typography, Chip, List, ListItem, Avatar, useTheme, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../../components/UI/Modal/Modal";
import EditForm from "./forms/EditForm";
import DeleteConfirm from "./forms/DeleteConfirm";
import { useAuth } from "../../../contexts/AuthContext";
import { useUpdateService } from "../../../hooks/services/useUpdateService";
import { useDeleteService } from "../../../hooks/services/useDeleteService";
import { ServiceAddUpdate } from "../../../types/Service";
import {
  serviceAvatarSx,
  serviceIconSx,
  serviceItemAdminBtnSx,
  serviceItemChipSx,
  serviceItemSX,
  serviceItemTextBoxSx,
  serviceListItemSx,
  serviceListSx,
} from "../../../utils/StylesHelper/Services";

type ServiceItemProps = {
  id: number;
  name: string;
  price: number;
  durationMinutes: number;
  staffMembers: number;
  refetchServices: () => void;
};

function ServiceItemAdmin({
  id,
  name,
  price,
  durationMinutes,
  staffMembers,
  refetchServices,
}: ServiceItemProps) {
  const [open, setIsOpen] = useState(false);
  const [operation, setOperation] = useState<"" | "edit" | "delete">("");
  const theme = useTheme();
  const { token, logoutExpiredSession } = useAuth();

  const { mutateAsync: updateService } = useUpdateService(token, id);
  const { mutateAsync: deleteService } = useDeleteService(token, id);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onUpdateSubmit = useCallback(
    async (serviceData: ServiceAddUpdate) => {
      updateService(serviceData)
        .then((serviceData) => {
          toast.success(`Service ${serviceData.name} updated!`);
          handleClose();
          refetchServices();
        })
        .catch((error) => {
          if (error.response?.status === 403) {
            logoutExpiredSession();
          } else {
            toast.error("Failed to update service.");
          }
        });
    },
    [logoutExpiredSession, updateService, handleClose, refetchServices]
  );

  const onDeleteSubmit = useCallback(async () => {
    deleteService()
      .then(() => {
        toast.success(`Service deleted!`);
        handleClose();
        refetchServices();
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          logoutExpiredSession();
        } else {
          toast.error("Failed to delete service.");
        }
      });
  }, [logoutExpiredSession, deleteService, handleClose, refetchServices]);

  return (
    <Box sx={serviceItemSX(theme)}>
      <Box sx={serviceItemTextBoxSx}>
        <Box sx={{ display: "flex", gap: "0.4rem", margin: "0 auto" }}>
          <Chip
            label={`${"specialists".toUpperCase()}: ${staffMembers}`}
            sx={serviceItemChipSx(theme)}
          />
        </Box>

        <Typography
          variant="h5"
          component="p"
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          {name}
        </Typography>

        <List sx={serviceListSx}>
          <ListItem sx={serviceListItemSx}>
            <Avatar sx={serviceAvatarSx}>
              <MonetizationOnIcon sx={serviceIconSx(theme)} />
            </Avatar>
            <span>
              <strong>{price.toFixed(2)}</strong> USD
            </span>
          </ListItem>
          <ListItem sx={serviceListItemSx}>
            <Avatar sx={serviceAvatarSx}>
              <AccessTimeIcon sx={serviceIconSx(theme)} />
            </Avatar>
            <span>
              <strong>{durationMinutes}</strong> minutes
            </span>
          </ListItem>
        </List>
        <Box
          sx={{ display: "flex", gap: "2.4rem", justifyContent: "center", alignItems: "center" }}
        >
          <Button
            sx={serviceItemAdminBtnSx(theme)}
            onClick={() => {
              setIsOpen(true);
              setOperation("edit");
            }}
          >
            Edit
            <EditIcon sx={{ fontSize: "2.4rem", cursor: "pointer" }} />
          </Button>

          <Button
            sx={serviceItemAdminBtnSx(theme)}
            onClick={() => {
              setIsOpen(true);
              setOperation("delete");
            }}
          >
            Delete
            <DeleteIcon sx={{ fontSize: "2.4rem", cursor: "pointer" }} />
          </Button>
        </Box>

        <Modal
          open={open}
          handleClose={handleClose}
          title={operation === "edit" ? "Edit Service" : "Delete Service"}
        >
          {operation === "edit" && (
            <EditForm handleClose={handleClose} serviceId={id} onSubmit={onUpdateSubmit} />
          )}
          {operation === "delete" && (
            <DeleteConfirm handleClose={handleClose} onSubmit={onDeleteSubmit} />
          )}
        </Modal>
      </Box>
    </Box>
  );
}

export default ServiceItemAdmin;
