import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import TasksPage from "./pages/TasksPage";
import { useAuth } from "./context/authContext";
import AuthLayout from "./components/AuthLayout";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import CreateTaskpage from "./pages/CreateTaskpage";

function AuthorizeAccess({ children }) {
  const { loggedInUser } = useAuth();
  if (loggedInUser === undefined) {
    return null;
  }

  if (loggedInUser === null) {
    return <Navigate to={"/auth/login"} />;
  }
  return children;
}

function UnauthorizeAccess({ children }) {
  const { loggedInUser } = useAuth();
  if (loggedInUser) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route
            path="/tasks"
            element={
              <AuthorizeAccess>
                <TasksPage />
              </AuthorizeAccess>
            }
          >
            <Route
              path=":taskId"
              element={
                <AuthorizeAccess>
                  <TaskDetailsPage />
                </AuthorizeAccess>
              }
            />
            <Route
              path="create"
              element={
                <AuthorizeAccess>
                  <CreateTaskpage />
                </AuthorizeAccess>
              }
            />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>

        <Route
          path="/auth"
          element={
            <UnauthorizeAccess>
              <AuthLayout />
            </UnauthorizeAccess>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
