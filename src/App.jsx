import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashbord from "./components/layouts/Dashboard/dashboard";
import Dashboard from "/src/pages/Dashboard/dashboard";
import Orders from "/src/pages/Orders/orders";
import Products from "/src/pages/Products/products";
import Other from "./pages/Other/categories";
import AddProduct from "./pages/Products/addProduct";
import Brands from "./pages/Other/brands";
import Banners from "./pages/Other/banners";
import Login from "./pages/login/login";
function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/home",
    element: <Dashbord />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "other",
        element: <Other />,
      },
      {
        path: "products/add",
        element: <AddProduct />
      },
      {
        path: "other/brands",
        element: <Brands />
      },
      {
        path: "other/banners",
        element: <Banners />
      }
    ],
  },
]);
  return <RouterProvider router={router} />;
}

export default App;
