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

const Login = () => {
  const { logIn } = useAuthStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const username = e.target.username.value;
    const password = e.target.password.value;
    mutation.mutate({ username, password });
  };

  return (
    <Container size={400} my={230}>
      <Paper padding="lg" radius="md">
        <Title order={2} align="center" mb="xl">
          Login
        </Title>
        <form onSubmit={handleLogin}>
          <Stack>
            <TextInput
              name="username"
              label="Username"
              placeholder="Enter your username"
              required
            />
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              required
            />
            {error && <Text color="red">{error}</Text>}
            <Button type="submit" fullWidth loading={mutation.isLoading}>
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
