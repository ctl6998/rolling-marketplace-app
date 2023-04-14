import logo from './logo.svg';
import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import Admin from './pages/Admin';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/marketplace",
          element: <Product />,
        },
        {
          path: "/admin",
          element: <Admin/>,
        },
        {
          path: "/products/:id",
          element: <ProductDetail/>,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
