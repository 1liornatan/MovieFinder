import { Home } from "./components/Home";
import {About} from "./components/About";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  }
];

export default AppRoutes;
