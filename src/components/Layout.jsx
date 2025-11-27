import { Outlet } from "react-router-dom";
import AppFooter from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default Layout;
