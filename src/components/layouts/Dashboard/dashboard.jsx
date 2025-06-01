import { extendTheme } from "@mui/material";
import { AppProvider, DashboardLayout, PageContainer } from "@toolpad/core";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SellIcon from '@mui/icons-material/Sell';
import FolderIcon from '@mui/icons-material/Folder';
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import logo from "../../../shared/imgs/Group 1116606595 (1).png"

const NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "home", title: "Dasboard", icon: <HomeIcon/> },
  { segment: "home/orders", title: "Orders", icon: <FormatListBulletedIcon /> },
  { segment: "home/products", title: "Products", icon: <SellIcon /> },
  { segment: "home/other", title: "Other", icon: <FolderIcon /> },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate,
  };
}

const Dashbord = () => {
  const router = useDemoRouter("/dashboard");

  const demoWindow = typeof window !== "undefined" ? window : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={logo} alt="Logo" style={{ height: "auto" }} />,
        title: ""
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashbord;
