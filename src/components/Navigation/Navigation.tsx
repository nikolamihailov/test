import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo/Logo";
import MobileNav from "./MobileNav/MobileNav";
import logo from "/logo.png";
import styles from "./Navigation.module.css";

function Navigation() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const { isAuthenticated, logoutUser } = useAuth();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <>
      {isMdUp && (
        <Box component="nav" sx={{ padding: 1.5, bgcolor: theme.palette.primary.main }}>
          <ul className={styles["main-nav"]}>
            <li>
              <NavLink to="/#about">About us</NavLink>
            </li>
            <li>
              <NavLink to="/#contact">Contact</NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to={"/services"}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                  >
                    Services
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to={"/"}>
                <Logo src={logo} width={60} />
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to={"/appointments"}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                  >
                    Appointments
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/profile"}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/"} onClick={() => logoutUser()}>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to={"/login"}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/register"}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </Box>
      )}
      {!isMdUp && (
        <Box
          component="nav"
          sx={{ padding: ["1.5rem 2.5rem"], bgcolor: theme.palette.primary.main }}
        >
          <MobileNav />
        </Box>
      )}
    </>
  );
}

export default Navigation;
