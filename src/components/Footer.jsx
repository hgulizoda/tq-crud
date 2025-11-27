import {
  Paper,
  Container,
  Group,
  Text,
  Anchor,
  Stack,
  ActionIcon,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export default function AppFooter() {
  return (
    <Paper component="footer" p="md" style={{ marginTop: "auto" }}>
      <Container
        size="xl"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack spacing={0}>
          <Text fw={700} fz="lg">
            IdeaHub
          </Text>
          <Text c="dimmed" fz="sm">
            Your place for inspiration
          </Text>
        </Stack>

        <Group spacing="md">
          <Anchor href="/" color="dark" underline={false}>
            Home
          </Anchor>
          <Anchor href="/faqs" color="dark" underline={false}>
            FAQs
          </Anchor>
          <Anchor href="/about" color="dark" underline={false}>
            About
          </Anchor>
        </Group>

        <Group spacing="xs">
          <ActionIcon
            size="lg"
            variant="light"
            color="dark"
            component="a"
            href="https://twitter.com"
          >
            <IconBrandTwitter size={20} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="light"
            color="dark"
            component="a"
            href="https://github.com"
          >
            <IconBrandGithub size={20} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="light"
            color="dark"
            component="a"
            href="https://linkedin.com"
          >
            <IconBrandLinkedin size={20} />
          </ActionIcon>
        </Group>
      </Container>

      <Text align="center" c="dimmed" fz="sm" mt="md">
        © {new Date().getFullYear()} IdeaHub. All rights reserved.
      </Text>
    </Paper>
  );
}
