import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api/API";
import FAQCard from "../components/FaqCard";
import {
  Container,
  Grid,
  Loader,
  Center,
  Text,
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useState } from "react";
import useAuthStore from "../store/slices/useAuthStore";

const Posts = () => {
  const { auth } = useAuthStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await API.get("/faqs");
      return res.data;
    },
  });

  const [opened, setOpened] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const createMutation = useMutation({
    mutationFn: (newFaq) => API.post("/faqs", newFaq),
    onSuccess: () => {
      queryClient.invalidateQueries(["faqs"]);
      setOpened(false);
    },
  });

  const handleCreate = () => {
    createMutation.mutate({ question: newQuestion, answer: newAnswer });
  };

  if (isLoading)
    return (
      <Center style={{ height: "70vh" }}>
        <Loader />
      </Center>
    );

  if (isError)
    return (
      <Center style={{ height: "70vh" }}>
        <Text color="red">Error loading FAQs</Text>
      </Center>
    );

  return (
    <Container size="xl" mt="100px">
      {auth && (
        <Group position="center" mb="xl">
          <Button color="green" onClick={() => setOpened(true)}>
            + Add New FAQ
          </Button>
        </Group>
      )}

      <Grid mih="70vh">
        {data?.data.map((faq) => (
          <Grid.Col key={faq.id} span={4}>
            <FAQCard {...faq} auth={auth} />
          </Grid.Col>
        ))}
      </Grid>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New FAQ"
        centered
      >
        <Stack>
          <TextInput
            label="Question"
            placeholder="Enter your question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.currentTarget.value)}
          />
          <Textarea
            label="Answer"
            placeholder="Enter the answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.currentTarget.value)}
          />
          <Group position="right">
            <Button
              color="dark"
              onClick={handleCreate}
              loading={createMutation.isLoading}
            >
              Create
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default Posts;
