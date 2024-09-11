import {
  Box,
  Typography,
  useTheme,
  Button,
  Grow,
  List,
  ListItem,
  Avatar,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import { UserFormFields, UserWithRole } from "../../../types/User";
import {
  userAdminItemSX,
  userIconSx,
  userItemAdminBtnSx,
  userItemAvatarSx,
  userItemBoxSx,
  userItemChipSx,
  userItemListItemSx,
  userItemListSx,
} from "../../../utils/StylesHelper/AdminUsers";
import { useAuth } from "../../../contexts/AuthContext";
import { useDeleteUserMutation } from "../../../hooks/users/useDeleteUser";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../../components/UI/Modal/Modal";
import DeleteConfirm from "./forms/DeleteConfrim";
import EditForm from "./forms/EditForm";
import { useUpdateUserMutation } from "../../../hooks/users/useUpdateUser";
import { useNavigate } from "react-router-dom";
import EditFormStaff from "./forms/EditFormStaff";

type UserItemProps = UserWithRole & {
  refetchUsers: () => void;
};

enum Operation {
  None = "",
  Edit = "edit",
  Delete = "delete",
}

function UserItemAdmin({
  id,
  email,
  firstName,
  lastName,
  serviceIds,
  role,
  refetchUsers,
}: UserItemProps) {
  const [open, setIsOpen] = useState(false);
  const [operation, setOperation] = useState<Operation>(Operation.None);
  const theme = useTheme();
  const { logoutExpiredSession, user, updateLoggedUser, deletedUserAccount } = useAuth();
  const navigateTo = useNavigate();

  const { mutateAsync: deleteUser } = useDeleteUserMutation(id);
  const { mutateAsync: updateUser } = useUpdateUserMutation(id);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onUpdateSubmit = useCallback(
    async (userData: UserFormFields) => {
      updateUser(userData)
        .then(() => {
          toast.success(`User updated!`);
          handleClose();
          refetchUsers();
          if (user?.email === email) {
            updateLoggedUser();
          }
        })
        .catch((error) => {
          if (error.response?.status === 403) {
            logoutExpiredSession();
          } else {
            toast.error("Failed to update user.");
          }
        });
    },
    [
      logoutExpiredSession,
      updateUser,
      handleClose,
      refetchUsers,
      updateLoggedUser,
      email,
      user?.email,
    ]
  );

  const onDeleteSubmit = useCallback(async () => {
    deleteUser()
      .then(() => {
        toast.success(`User deleted!`);
        handleClose();
        refetchUsers();
        if (user?.email === email) {
          deletedUserAccount();
          navigateTo("/login");
        }
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          logoutExpiredSession();
        } else {
          toast.error("Failed to delete user.");
        }
      });
  }, [
    logoutExpiredSession,
    deleteUser,
    handleClose,
    refetchUsers,
    deletedUserAccount,
    email,
    user?.email,
    navigateTo,
  ]);

  return (
    <Grow in={true} timeout={{ appear: 100, enter: 300, exit: 200 }}>
      <Box sx={userAdminItemSX(theme)}>
        <Box sx={userItemBoxSx}>
          {role === "STAFF_MEMBER" && (
            <Box sx={{ display: "flex", gap: "0.4rem", margin: "0 auto" }}>
              <Chip
                label={`${"services".toUpperCase()}: ${serviceIds.length}`}
                sx={userItemChipSx(theme)}
              />
            </Box>
          )}
          <Typography
            variant="h5"
            component="p"
            sx={{ fontWeight: 600, color: theme.palette.primary.main }}
          >
            {firstName} {lastName} {email === user?.email && "- You"}
          </Typography>

          <List sx={userItemListSx}>
            <ListItem sx={userItemListItemSx}>
              <Avatar sx={userItemAvatarSx}>
                <EmailIcon sx={userIconSx(theme)} />
              </Avatar>
              <span>{email}</span>
            </ListItem>
            <ListItem sx={userItemListItemSx}>
              <Avatar sx={userItemAvatarSx}>
                <BadgeIcon sx={userIconSx(theme)} />
              </Avatar>
              <span>{role}</span>
            </ListItem>
          </List>
          <Box
            sx={{ display: "flex", gap: "2.4rem", justifyContent: "center", alignItems: "center" }}
          >
            {(role !== "ADMIN" || email === user?.email) && (
              <Button
                sx={userItemAdminBtnSx(theme)}
                onClick={() => {
                  setIsOpen(true);
                  setOperation(Operation.Edit);
                }}
              >
                Edit
                <EditIcon sx={{ fontSize: "1.5rem", cursor: "pointer" }} />
              </Button>
            )}

            {(role !== "ADMIN" || email === user?.email) && (
              <Button
                sx={userItemAdminBtnSx(theme)}
                onClick={() => {
                  setIsOpen(true);
                  setOperation(Operation.Delete);
                }}
              >
                Delete
                <DeleteIcon sx={{ fontSize: "1.5rem", cursor: "pointer" }} />
              </Button>
            )}
          </Box>
        </Box>

        <Modal
          open={open}
          handleClose={handleClose}
          title={operation === "edit" ? "Edit User" : "Delete User"}
        >
          {operation === "edit" && role !== "STAFF_MEMBER" && (
            <EditForm handleClose={handleClose} id={id} onSubmit={onUpdateSubmit} />
          )}
          {operation === "edit" && role === "STAFF_MEMBER" && (
            <EditFormStaff handleClose={handleClose} id={id} onSubmit={onUpdateSubmit} />
          )}
          {operation === "delete" && (
            <DeleteConfirm handleClose={handleClose} onSubmit={onDeleteSubmit} />
          )}
        </Modal>
      </Box>
    </Grow>
  );
}

export default UserItemAdmin;
