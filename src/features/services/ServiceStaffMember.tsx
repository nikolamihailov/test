import { Box, Chip, useTheme } from "@mui/material";
import { serviceItemChipSx } from "../../utils/StylesHelper/Services";

type ServiceStaffMembersProps = {
  firstName: string;
  lastName: string;
};

function ServiceStaffMember({ firstName, lastName }: ServiceStaffMembersProps) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: "0.4rem" }}>
      <Chip
        label={`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}
        sx={serviceItemChipSx(theme)}
      />
    </Box>
  );
}

export default ServiceStaffMember;
