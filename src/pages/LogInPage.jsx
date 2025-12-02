import { useState } from "react";
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/slices/useAuthStore";
import { LOGIN_API } from "../api/API";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required().min("4"),
    password: yup.string().required().min("4"),
  })
  .required();

const Login = () => {
  const { logIn } = useAuthStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async ({ username, password }) => {
      const res = await LOGIN_API.post("/auth/login", { username, password });
      return res.data;
    },
    onSuccess: (data) => {
      logIn(data);
      navigate("/posts");
    },
    onError: () => {
      setError("Invalid username or password");
    },
  });

  const handleLogin = ({ username, password }) => {
    setError("");
    mutation.mutate({ username, password });
  };

  return (
    <Container size={400} my={230}>
      <Paper padding="lg" radius="md">
        <Title align="center">Login</Title>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Stack gap={0}>
            <TextInput
              name="username"
              label="Username"
              placeholder="Enter your username"
              {...register("username")}
              error={errors.username?.message}
              mb={30}
            />

            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password?.message}
              mb={20}
            />

            <Button type="submit" fullWidth loading={mutation.isLoading}>
              Login
            </Button>
            {error && <Text color="red">{error}</Text>}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
