import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

export interface PageProps {
  children: React.ReactNode;
}
export interface HistoryProps {
  task: Task;
}
export interface History {
  id: number;
  oldStatusText: string | null;
  statusText: string;
  statusCode: string;
  owner: string | null;
  status: number;
  startDate: string;
  endDate: string | null;
}
export interface Task {
  id: number;
  title: string;
  description: string;
  owner: string | null;
  ownerId: number | null;
  ownerUsername: string | null;
  status: number;
  statusCode: string;
  statusText: string;
  taskAmount: string;
  startDate: string;
  endDate: string | null;
  history: History[];
}
export interface User extends UserAuth {
  password: string;
}
export interface Status {
  name: string;
  items: Task[];
}
export interface TaskStatuses {
  toDo: Status;
  inProgress: Status;
  done: Status;
}
export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
export interface UserAuth {
  id: number;
  name: string;
  username: string;
}
