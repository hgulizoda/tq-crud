import { useQuery } from "@tanstack/react-query";
import API from "../api/API";
import FAQCard from "../components/FaqCard";
import { Container, Grid, Loader, Center, Text } from "@mantine/core";
import { useSelector } from "react-redux";

const Posts = () => {
  const auth = useSelector((state) => state.auth.auth);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await API.get("/faqs");
      return res.data;
    },
  });

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
      <Grid mih="70vh">
        {data?.data.map((faq) => (
          <Grid.Col key={faq.id} span={4}>
            <FAQCard {...faq} auth={auth} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;
