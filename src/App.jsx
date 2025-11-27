import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import LogInPage from "./pages/LogInPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/" element={<LogInPage />} />
      </Route>
    </Routes>
  );
};

export default App;
