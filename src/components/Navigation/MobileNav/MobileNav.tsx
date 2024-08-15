import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Box, Drawer, IconButton, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "/logo.png";
import styles from "./MobileNav.module.css";

function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);
  const { isAuthenticated, logoutUser } = useAuth();
  const theme = useTheme();

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <NavLink to={"/"}>
        <Logo src={logo} width={60} />
      </NavLink>
      <IconButton onClick={() => setOpen(true)} sx={{ color: theme.palette.secondary.main }}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
            <IconButton onClick={handleCloseDrawer}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
          <ul className={styles["mobile-nav"]}>
            <li>
              <NavLink to="/#about" onClick={handleCloseDrawer}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/#contact" onClick={handleCloseDrawer}>
                Contact
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to={"/services"}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                    onClick={handleCloseDrawer}
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/appointments"}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                    onClick={handleCloseDrawer}
                  >
                    Appointments
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/profile"}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                    onClick={handleCloseDrawer}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/"}
                    onClick={() => {
                      logoutUser();
                      handleCloseDrawer();
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </Box>
      </Drawer>
    </Box>
  );
}

export default MobileNav;
