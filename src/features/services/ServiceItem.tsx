import { Box, Typography, Chip, List, ListItem, Avatar, useTheme } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import serviceImg from "/service.png";
import Button from "../../components/UI/Button/Button";
import {
  serviceAvatarSx,
  serviceIconSx,
  serviceItemChipSx,
  serviceItemImgSx,
  serviceItemSX,
  serviceItemTextBoxSx,
  serviceListItemSx,
  serviceListSx,
} from "../../utils/StylesHelper/Services";

type ServiceItemProps = {
  id: number;
  name: string;
  price: number;
  durationMinutes: number;
  staffMembers: number;
};

function ServiceItem({ id, name, price, durationMinutes, staffMembers }: ServiceItemProps) {
  const theme = useTheme();
  return (
    <Box sx={serviceItemSX(theme)}>
      <Box>
        <Box component="img" src={serviceImg} alt={name} sx={serviceItemImgSx} />
      </Box>
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
        <Button
          bgColor={theme.palette.primary.main}
          color={theme.palette.secondary.main}
          el="link"
          hoverBgColor={theme.palette.primary.light}
          hoverColor={theme.palette.secondary.main}
          href={`${id}`}
        >
          Details
        </Button>
      </Box>
    </Box>
  );
}

export default ServiceItem;