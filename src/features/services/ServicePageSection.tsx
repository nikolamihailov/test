import { Box, Typography, useTheme } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useService } from "../../hooks/services/useService";
import { sectionStyles } from "../../utils/StylesHelper/Section";
import serviceImg from "/service.png";
import Button from "../../components/UI/Button/Button";
import SectionInfo from "../../components/Sections/SectionInfo";
import { ArrowBack } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import ServiceStaffMember from "./ServiceStaffMember";
import Spinner from "../../components/Spinner/Spinner";
import { serviceItemImgSx, servicePageSectionSx } from "../../utils/StylesHelper/Services";

type ServicePageSectionProps = {
  id: number | undefined;
};

function ServicePageSection({ id }: ServicePageSectionProps) {
  const theme = useTheme();
  const { token } = useAuth();
  const { data, isLoading } = useService(token, id);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box sx={sectionStyles(theme)}>
      <Button
        bgColor={theme.palette.primary.main}
        color={theme.palette.secondary.main}
        el="link"
        hoverBgColor={theme.palette.primary.light}
        hoverColor={theme.palette.secondary.main}
        href={"/services"}
        style={{ position: "absolute", top: "3rem", left: "1.5rem", padding: "0.8rem" }}
      >
        <ArrowBack />
      </Button>

      <SectionInfo subheading="Service Details" heading={`Learn More About ${data?.name}`} />

      <Box sx={servicePageSectionSx}>
        <Box>
          <Box component="img" src={serviceImg} alt={data?.name} sx={serviceItemImgSx} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "3.2rem", textAlign: "left" }}>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: theme.spacing(1) }}>
            <DescriptionIcon
              sx={{ marginRight: theme.spacing(1), color: theme.palette.primary.main }}
            />
            <Typography variant="body2" sx={{ fontSize: "2rem" }}>
              <strong>Description:</strong> {data?.description}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccessTimeIcon
              sx={{ marginRight: theme.spacing(1), color: theme.palette.primary.main }}
            />
            <Typography variant="body2" sx={{ fontSize: "2rem" }}>
              <strong>Duration:</strong> {data?.durationMinutes} minutes
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MonetizationOnIcon
              sx={{ marginRight: theme.spacing(1), color: theme.palette.primary.main }}
            />
            <Typography variant="body2" sx={{ fontSize: "2rem" }}>
              <strong>Price:</strong> ${data?.price}
            </Typography>
          </Box>

          {data?.users && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "3.2rem" }}>
              <Typography variant="body1" sx={{ fontSize: "2.1rem" }}>
                {data.users.length >= 1 && "Specialists:"}
              </Typography>
              {data?.users.map((u) => {
                return (
                  <ServiceStaffMember key={u.email} firstName={u.firstName} lastName={u.lastName} />
                );
              })}
            </Box>
          )}

          {data?.users.length === 0 && (
            <Typography variant="body1" sx={{ marginBottom: theme.spacing(2), fontSize: "2.1rem" }}>
              No specialist currently do this service.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ServicePageSection;
