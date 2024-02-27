import "./App.css";
import LoginPage from "./pages/login/login-page";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/main/main-page";
import Amounts from "./components/amounts/amounts";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./route/protectedRoute";
import Tasks from "./components/tasks/task";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate replace to="/homepage" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <MainPage>
                <Tasks></Tasks>
              </MainPage>
            </ProtectedRoute>
          }
        />
        <Route
          path="/amounts"
          element={
            <ProtectedRoute>
              <MainPage>
                <Amounts></Amounts>
              </MainPage>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
