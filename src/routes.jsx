import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Variants from "./component/variants/Variants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/variants",
    element: <Variants />,
  },
]);
