import { TaskStatuses } from "./types";

export const API_PORT = "http://localhost:3030";
export const TASK_STATUS: TaskStatuses = {
  toDo: {
    name: "To Do",
    id: 1,
    items: [],
  },
  inProgress: {
    name: "In Progress",
    id: 2,
    items: [],
  },
  done: {
    name: "Done",
    id: 3,
    items: [],
  },
};
