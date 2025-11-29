import {
  AppShell,
  Container,
  Group,
  Text,
  UnstyledButton,
  ActionIcon,
  Menu,
  Avatar,
  Burger,
  Button,
} from "@mantine/core";
import {
  IconSearch,
  IconChevronDown,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/slices/useAuthStore";

export default function FancyHeader() {
  const [opened, setOpened] = useState(false);

  const { auth, user, logOut } = useAuthStore();
  const navigate = useNavigate();
  return (
    <AppShell header={{ height: 70 }} padding="md">
      <AppShell.Header>
        <Container size="xl" style={{ height: "100%" }}>
          <Group
            justify="space-between"
            align="center"
            style={{ height: "100%" }}
          >
            <Text
              fw={700}
              size="xl"
              style={{
                background: "linear-gradient(135deg, #4C6EF5, #15AABF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Logo
            </Text>

            <Group gap="lg" visibleFrom="sm">
              <NavLink to="/posts">FAQs</NavLink>
            </Group>

            <Group gap="md">
              <ActionIcon variant="subtle" radius="xl" size={36}>
                <IconSearch size={20} />
              </ActionIcon>
              {auth ? (
                <>
                  <Menu width={180} position="bottom-end">
                    {user.username}
                    <Menu.Target>
                      <UnstyledButton>
                        <Group gap={6}>
                          <Avatar radius="xl" size={34} />
                          <IconChevronDown size={18} />
                        </Group>
                      </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item leftSection={<IconUser size={16} />}>
                        Profile
                      </Menu.Item>
                      <Menu.Item leftSection={<IconSettings size={16} />}>
                        Settings
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        onClick={() => logOut()}
                        color="red"
                        leftSection={<IconLogout size={16} />}
                      >
                        Log out
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>

                  <Burger
                    opened={opened}
                    onClick={() => setOpened(!opened)}
                    hiddenFrom="sm"
                    size="md"
                  />
                </>
              ) : (
                <Button onClick={() => navigate("/")}>Log in</Button>
              )}
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
    </AppShell>
  );
}
