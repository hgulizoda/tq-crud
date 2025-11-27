import { Container, Title, Text, Button, Center, Stack } from "@mantine/core";
import { IconLogin } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../store/slices/authSlice";

export default function LogInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container size="sm" style={{ minHeight: "70vh" }}>
      <Center style={{ height: "80vh" }}>
        <Stack spacing="xl" align="center">
          <IconLogin size={64} stroke={1.5} color="#ff6b6b" />
          <Title order={2}>Please log in</Title>
          <Text align="center" color="dimmed">
            You need to be logged in to edit or delete FAQs.
          </Text>
          <Button
            size="md"
            leftIcon={<IconLogin size={20} />}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            onClick={() => {
              dispatch(logIn());
              navigate("/posts");
            }}
          >
            Log in
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}
