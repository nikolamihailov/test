import { Chip, useTheme } from "@mui/material";
import { serviceItemChipSx } from "../../utils/StylesHelper/Services";

type ServiceStaffMembersProps = {
  firstName: string;
  lastName: string;
};

function ServiceStaffMember({ firstName, lastName }: ServiceStaffMembersProps) {
  const theme = useTheme();

  return (
    <Chip
      label={`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}
      sx={serviceItemChipSx(theme)}
    />
  );
}

export default ServiceStaffMember;
