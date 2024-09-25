import { Box } from "@mui/material";
import staffAvatar from "/user-avatar.png";
import { UserWithRole } from "../../types/User";
import { useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { RoleTypes } from "../../types/Role";
import { Avatar, BookButton, ContainerStaffMember } from "../../utils/StylesHelper/Services";

type ServiceStaffMembersProps = {
  staff: UserWithRole;
  openModal: () => void;
  changeSelectedStaff: (staff: UserWithRole) => void;
};

// Styled components

function ServiceStaffMember({ staff, openModal, changeSelectedStaff }: ServiceStaffMembersProps) {
  const { user } = useAuth();

  const openBookForm = useCallback(() => {
    openModal();
    changeSelectedStaff(staff);
  }, [openModal, changeSelectedStaff, staff]);

  return (
    <ContainerStaffMember>
      <Avatar>
        <img src={staffAvatar} alt={"avatar"} />
      </Avatar>
      <Box sx={{ wordBreak: "break-word", whiteSpace: "normal" }}>
        <h3>
          {staff.firstName} {staff.lastName}
        </h3>
      </Box>
      {user?.role === RoleTypes.User && <BookButton onClick={openBookForm}>Book</BookButton>}
    </ContainerStaffMember>
  );
}

export default ServiceStaffMember;
