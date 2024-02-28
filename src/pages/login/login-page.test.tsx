import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "./login-page";
import { AuthProvider } from "../../hooks/useAuth";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

test("renders without crashing", async () => {
  render(
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
  const username = screen.getByPlaceholderText("username");
  expect(username).toBeInTheDocument();
  fireEvent.input(username, {
    target: {
      value: "utku656",
    },
  });
  const password = screen.getByPlaceholderText("password");
  expect(password).toBeInTheDocument();
  fireEvent.input(password, {
    target: {
      value: "utku656",
    },
  });
  fireEvent.submit(screen.getByRole("button"));

  await expect(fetchMock).toHaveBeenCalledWith("http://localhost:3030/users");
});
