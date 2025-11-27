import { useState } from "react";
import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Flex,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/API";
import { useQueryClient } from "@tanstack/react-query";

export default function FAQCard({ id, question, answer, createdAt }) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.auth);
  const queryClient = useQueryClient();

  const [opened, setOpened] = useState(false);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const handleLoginRedirect = () => navigate("/");

  const deleteItem = async (id) => {
    try {
      await API.delete(`/faqs/${id}`);
      queryClient.invalidateQueries(["faqs"]);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const editItem = async () => {
    try {
      await API.put(`/faqs/${id}`, {
        question: editQuestion,
        answer: editAnswer,
      });
      queryClient.invalidateQueries(["faqs"]);
      queryClient.invalidateQueries(["faq", id]);
      setOpened(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text
            fw={500}
            component={Link}
            to={`/post/${id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            Question: {question}
          </Text>
          <Badge color="gray">{new Date(createdAt).toLocaleDateString()}</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          Answer: {answer}
        </Text>

        <Flex gap="md" mt="md">
          {auth ? (
            <>
              <Button
                color="dark"
                fullWidth
                radius="md"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditQuestion(question);
                  setEditAnswer(answer);
                  setOpened(true);
                }}
              >
                Edit
              </Button>
              <Button
                color="red"
                fullWidth
                radius="md"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(id);
                }}
              >
                Delete
              </Button>
            </>
          ) : (
            <Button
              color="gray"
              fullWidth
              radius="md"
              onClick={handleLoginRedirect}
            >
              Please log in to edit or delete
            </Button>
          )}
        </Flex>
      </Card>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit FAQ"
        centered
      >
        <TextInput
          label="Question"
          value={editQuestion}
          onChange={(e) => setEditQuestion(e.currentTarget.value)}
        />
        <Textarea
          label="Answer"
          mt="sm"
          value={editAnswer}
          onChange={(e) => setEditAnswer(e.currentTarget.value)}
        />
        <Group position="right" mt="md">
          <Button color="dark" onClick={editItem}>
            Save
          </Button>
        </Group>
      </Modal>
    </>
  );
}
