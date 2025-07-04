import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Layout from "../components/layout";
import App from "../pages/App";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import Register from "../pages/Register";
import { isAuthenticated } from "../services/auth";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const Rotas = () => {
  const auth = isAuthenticated();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
                {/* rotas protegidas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Rotas;
