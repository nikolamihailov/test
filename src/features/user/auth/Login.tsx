import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LoginRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../../../hooks/users/useLogin";
import useTitle from "../../../hooks/useTitle";
import { Link } from "react-router-dom";
import Section from "../../../components/UI/Section/Section";

function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync, isPending } = useLogin();
  const theme = useTheme();

  useTitle("Login | Flow - SPA and Fitness");

  const onSubmit = async (data: { email: string; password: string }) => {
    await mutateAsync(data);
  };

  return (
    <Section
      bgColor="#ffe066"
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4.8rem 0.8rem",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "40rem",
          },
          margin: "auto",
          padding: 4,
          marginTop: "4.8rem",
          border: "1px solid #ccc",
          borderRadius: "1rem",
          boxShadow: "0 0 16px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2.4rem",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="input-email"
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email", {
              required: "Email is required!",
            })}
            error={errors.email?.message?.length ? true : false}
            helperText={errors.email?.message}
            type="email"
          />
          <FormControl variant="outlined" fullWidth error={!!errors.password}>
            <InputLabel htmlFor="outlined-adornment-password" error={!!errors.password}>
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((isShown) => !isShown)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              {...register("password", {
                required: "Password is required!",
              })}
              error={!!errors.password}
            />
            <FormHelperText error={!!errors.password}>{errors.password?.message}</FormHelperText>
          </FormControl>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Don't have an account?
            <Button
              component={Link}
              to="/register"
              sx={{ marginLeft: 1, color: theme.palette.primary.main }}
            >
              Register here
            </Button>
          </Typography>
          <Button
            variant="contained"
            startIcon={<LoginRounded />}
            type="submit"
            size="medium"
            sx={{
              padding: "1rem",
              bgcolor: theme.palette.primary.main,
              ":hover": { bgcolor: "#572000" },
            }}
          >
            {isPending ? <CircularProgress size={24} color="inherit" /> : "Log-in"}
          </Button>
        </form>
      </Box>
    </Section>
  );
}

export default Login;
