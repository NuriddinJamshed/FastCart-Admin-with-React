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
import EditProduct from "./pages/Products/editProduct";
import SubCategories from "./pages/Other/subCategories";
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
        path:"products/edit",
        element:<EditProduct/>
      },
      {
        path: "other/brands",
        element: <Brands />
      },
      {
        path: "other/banners",
        element: <Banners />
      },
      {
        path: "other/subCategories",
        element: <SubCategories/>
      }
    ],
  },
]);
  return <RouterProvider router={router} />;
}

export default App;
