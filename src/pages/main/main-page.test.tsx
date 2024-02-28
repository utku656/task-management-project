import { fireEvent, render, screen } from "@testing-library/react";
import { AuthProvider } from "../../hooks/useAuth";
import MainPage from "./main-page";
import Tasks from "../../components/tasks/task";
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
const mockResponse = {
  tasks: [
    {
      id: "1",
      title: "UI Design",
      description: "UI Design Implementation of Spotzer Framework",
      owner: "Utku",
      ownerId: "1",
      ownerUsername: "utku656",
      status: 3,
      statusCode: "done",
      statusText: "Done",
      taskAmount: "10 Euro",
      startDate: "04-01-2024",
      endDate: "07-01-2024",
      history: [
        {
          id: 1,
          oldStatusText: null,
          statusText: "To Do",
          statusCode: "toDo",
          owner: "Utku",
          status: 1,
          startDate: "04-01-2024",
          endDate: "05-01-2024",
        },
      ],
    },
  ],
};
test("renders without crashing", () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
  render(
    <AuthProvider>
      <MainPage>
        <Tasks></Tasks>
      </MainPage>
    </AuthProvider>
  );
  const drawer = screen.getByRole("button", { name: "open drawer" });
  fireEvent.click(drawer);

  const homepage = screen.getByText("Home Page");
  const field = screen.getByText("Done");
  expect(field).toBeInTheDocument();
  expect(homepage).toBeInTheDocument();
});
