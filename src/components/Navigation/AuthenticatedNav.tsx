import { useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button, useTheme } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo/Logo";
import logo from "/logo.png";
import styles from "./Navigation.module.css";
import { logoutBtnSX } from "../../utils/StylesHelper/LogoutBtn";

function AuthenticatedNav() {
  const { logoutUser } = useAuth();
  const naviagetTo = useNavigate();
  const theme = useTheme();

  const handleLogout = useCallback(() => {
    logoutUser();
    naviagetTo("/");
  }, [logoutUser, naviagetTo]);

  return (
    <>
      <li>
        <NavLink to="/#about">About us</NavLink>
      </li>
      <li>
        <NavLink to="/#contact">Contact us</NavLink>
      </li>
      <li>
        <NavLink to="/services" className={({ isActive }) => (isActive ? styles["active"] : "")}>
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to={"/home"}>
          <Logo src={logo} width={60} />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/appointments"
          className={({ isActive }) => (isActive ? styles["active"] : "")}
        >
          Appointments
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? styles["active"] : "")}>
          Profile
        </NavLink>
      </li>
      <li>
        <Button onClick={handleLogout} color="secondary" sx={logoutBtnSX(theme)}>
          Logout
        </Button>
      </li>
    </>
  );
}

export default AuthenticatedNav;
