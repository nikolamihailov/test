import { Box, Dialog, DialogTitle, DialogContent, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";
import { dialogTitleSx, modalSX } from "../../../utils/StylesHelper/Modal";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
};

function Modal({ open, handleClose, title, children }: ModalProps) {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: modalSX(theme),
      }}
      aria-hidden="false"
    >
      {title && (
        <DialogTitle sx={dialogTitleSx}>
          {title}
          <IconButton onClick={handleClose} sx={{ p: 0, ml: 1 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent sx={{ p: 0 }}>
        <Box>{children}</Box>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;