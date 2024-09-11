import { Box, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { selectSx } from "../../utils/StylesHelper/Pagination";

type SelectProps = {
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  itemName: string;
};

function SelectItemsPerPage({ itemsPerPage, onItemsPerPageChange, itemName }: SelectProps) {
  const theme = useTheme();

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const selectedValue = Number(event.target.value);
    onItemsPerPageChange(selectedValue);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "3.2rem", alignItems: "center" }}>
        <Typography variant="body2" sx={{ fontSize: "2rem" }}>
          {itemName} per page:
        </Typography>
        <Select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          displayEmpty
          inputProps={{ "aria-label": `${itemName} per page` }}
          sx={selectSx(theme)}
        >
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={24}>24</MenuItem>
        </Select>
      </Box>
    </>
  );
}

export default SelectItemsPerPage;
