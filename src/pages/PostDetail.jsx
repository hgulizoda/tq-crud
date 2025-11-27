import {
  Container,
  Card,
  Text,
  Stack,
  Badge,
  Title,
  Flex,
  Button,
  Group,
  Loader,
  Center,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function PostDetail() {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.auth);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["faq", id],
    queryFn: async () => {
      const res = await API.get(`faqs/${id}`);

      return res.data;
    },
  });

  const [opened, setOpened] = useState(false);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  if (isLoading)
    return (
      <Center style={{ height: "70vh" }}>
        <Loader size="sm" />
      </Center>
    );

  if (isError || !data)
    return (
      <Center style={{ height: "70vh" }}>
        <Text color="red">Error loading FAQ</Text>
      </Center>
    );

  const faq = data.data;
  console.log(faq);

  async function deleteItem(id) {
    try {
      await API.delete(`/faqs/${id}`);
      navigate("/posts");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  async function editItem() {
    try {
      await API.put(`/faqs/${id}`, {
        question: editQuestion,
        answer: editAnswer,
      });
      setOpened(false);
      queryClient.invalidateQueries(["faq", id]);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  function handleLoginRedirect() {
    navigate("/");
  }

  return (
    <Container size="md" py="xl" mt="90px" mih="70vh">
      <Card
        shadow="md"
        p="lg"
        radius="md"
        withBorder
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <Stack spacing="md">
          <Title order={2} c="dark">
            {faq.question}
          </Title>
          <Badge color="gray" variant="outline">
            {new Date(faq.createdAt).toLocaleDateString()}
          </Badge>
          <Text size="md" c="dimmed">
            {faq.answer}
          </Text>

          {auth ? (
            <Flex gap="md" mt="md">
              <Button
                color="dark"
                fullWidth
                radius="md"
                onClick={() => {
                  setEditQuestion(faq.question);
                  setEditAnswer(faq.answer);
                  setOpened(true);
                }}
              >
                Edit
              </Button>
              <Button
                color="red"
                fullWidth
                radius="md"
                onClick={() => deleteItem(faq.id)}
              >
                Delete
              </Button>
            </Flex>
          ) : (
            <Group position="center" mt="md">
              <Button
                color="gray"
                variant="outline"
                onClick={handleLoginRedirect}
              >
                Please log in to edit or delete
              </Button>
            </Group>
          )}
        </Stack>
      </Card>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit FAQ"
        centered
      >
        <Stack>
          <TextInput
            label="Question"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.currentTarget.value)}
          />
          <Textarea
            label="Answer"
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.currentTarget.value)}
          />
          <Group position="right">
            <Button color="dark" onClick={editItem}>
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
