import {
  Box,
  Button,
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
import { AppRegistrationOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Section from "../../../components/UI/Section/Section";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import { useRegister } from "../../../hooks/users/useRegister";
import { User } from "../../../types/User";

function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
      age: 18,
    },
  });

  const { mutateAsync } = useRegister();
  const theme = useTheme();

  useTitle("Register | Flow - SPA and Fitness");

  const onSubmit = async (data: User) => {
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
            sm: "80vw",
            md: "80rem",
          },
          margin: "auto",
          padding: 4,
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
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            display: "grid",
            gap: "2.4rem",
            alignItems: "center",
            gridTemplateColumns: {
              sm: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
            },
          }}
        >
          <TextField
            id="input-email"
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            type="email"
          />
          <TextField
            id="input-first-name"
            label="First Name"
            variant="outlined"
            fullWidth
            {...register("firstName", {
              required: "First name is required!",
              minLength: {
                value: 1,
                message: "First name must be at least 1 character long",
              },
              maxLength: {
                value: 50,
                message: "First name must be less than or equal to 50 characters",
              },
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            type="text"
          />
          <TextField
            id="input-last-name"
            label="Last Name"
            variant="outlined"
            fullWidth
            {...register("lastName", {
              required: "Last name is required!",
              minLength: {
                value: 1,
                message: "Last name must be at least 1 character long",
              },
              maxLength: {
                value: 50,
                message: "Last name must be less than or equal to 50 characters",
              },
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            type="text"
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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                maxLength: {
                  value: 16,
                  message: "Password must not be over 16 characters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message:
                    "Password must contain at least one uppercase letter, one number, and one special character",
                },
              })}
              error={!!errors.password}
            />
            <FormHelperText error={!!errors.password}>{errors.password?.message}</FormHelperText>
          </FormControl>
          <TextField
            id="input-phone"
            label="Phone"
            variant="outlined"
            fullWidth
            {...register("phone", {
              required: "Phone is required!",
              pattern: {
                value: /^\+?\d+$/,
                message: "Invalid phone number",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            type="text"
          />
          <TextField
            id="input-age"
            label="Age"
            variant="outlined"
            fullWidth
            {...register("age", {
              required: "Age is required!",
              min: {
                value: 18,
                message: "You must be at least 18 years old.",
              },
              max: {
                value: 128,
                message: "Age must be less than or equal to 128.",
              },
            })}
            error={!!errors.age}
            helperText={errors.age?.message}
            type="number"
          />
          <Typography variant="body1" sx={{ textAlign: "center", gridColumn: "1/-1" }}>
            Already have an account?
            <Button
              component={Link}
              to="/login"
              sx={{ marginLeft: 1, color: theme.palette.primary.main }}
            >
              Login here
            </Button>
          </Typography>
          <Button
            variant="contained"
            startIcon={<AppRegistrationOutlined />}
            type="submit"
            size="medium"
            sx={{
              padding: "1rem",
              gridColumn: "1/-1",
              bgcolor: theme.palette.primary.main,
              ":hover": { bgcolor: "#572000" },
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Section>
  );
}

export default Register;
