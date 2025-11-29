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
import { API } from "../api/API";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.auth);
  const queryClient = useQueryClient();

  const [opened, setOpened] = useState(false);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [isNew, setIsNew] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["faq", id],
    queryFn: async () => {
      const res = await API.get(`faqs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const faq = data?.data;

  const createMutation = useMutation((newFaq) => API.post("/faqs", newFaq), {
    onSuccess: () => {
      queryClient.invalidateQueries(["faqs"]);
      setOpened(false);
    },
  });

  const editMutation = useMutation(
    (updatedFaq) => API.put(`/faqs/${id}`, updatedFaq),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["faq", id]);
        queryClient.invalidateQueries(["faqs"]);
        setOpened(false);
      },
    }
  );

  const deleteMutation = useMutation((faqId) => API.delete(`/faqs/${faqId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["faqs"]);
      navigate("/posts");
    },
  });

  const handleSave = () => {
    const payload = { question: editQuestion, answer: editAnswer };
    if (isNew) {
      createMutation.mutate(payload);
    } else {
      editMutation.mutate(payload);
    }
  };

  const handleDelete = (faqId) => {
    deleteMutation.mutate(faqId);
  };

  const handleLoginRedirect = () => {
    navigate("/");
  };

  if (id && isLoading)
    return (
      <Center style={{ height: "70vh" }}>
        <Loader size="sm" />
      </Center>
    );

  if (id && (isError || !faq))
    return (
      <Center style={{ height: "70vh" }}>
        <Text color="red">Error loading FAQ</Text>
      </Center>
    );

  return (
    <Container size="md" py="xl" mt="90px" mih="70vh">
      {auth && (
        <Group position="center" mb="xl">
          <Button
            color="green"
            onClick={() => {
              setEditQuestion("");
              setEditAnswer("");
              setIsNew(true);
              setOpened(true);
            }}
          >
            Add New Post
          </Button>
        </Group>
      )}

      {id && faq && (
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
                    setIsNew(false);
                    setOpened(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="red"
                  fullWidth
                  radius="md"
                  onClick={() => handleDelete(faq.id)}
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
      )}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={isNew ? "Add New FAQ" : "Edit FAQ"}
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
            <Button
              color="dark"
              onClick={handleSave}
              loading={createMutation.isLoading || editMutation.isLoading}
            >
              {isNew ? "Create" : "Save"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
