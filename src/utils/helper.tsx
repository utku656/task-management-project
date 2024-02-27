import { DropResult } from "react-beautiful-dnd";
import { TaskStatuses } from "./types";
import { API_PORT, TASK_STATUS } from "./const";

export const onDragEnd = (
  result: DropResult,
  columns: TaskStatuses,
  setColumns: (value: TaskStatuses) => void
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId as keyof TaskStatuses];
    const destColumn = columns[destination.droppableId as keyof TaskStatuses];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
    const taskTemp =
      columns[source.droppableId as keyof TaskStatuses].items[
        Number(result.draggableId.split("-")[1])
      ];

    taskTemp.status =
      TASK_STATUS[destination.droppableId as keyof TaskStatuses].id;
    taskTemp.statusCode = destination.droppableId;
    taskTemp.statusText =
      TASK_STATUS[destination.droppableId as keyof TaskStatuses].name;
    taskTemp.startDate = formatDate(new Date());
    taskTemp.endDate = null;

    const newHistory = {
      id: taskTemp.history.length + 1,
      oldStatusText: TASK_STATUS[source.droppableId as keyof TaskStatuses].name,
      statusText:
        TASK_STATUS[destination.droppableId as keyof TaskStatuses].name,
      statusCode: destination.droppableId,
      owner: taskTemp.owner,
      status: TASK_STATUS[destination.droppableId as keyof TaskStatuses].id,
      startDate: formatDate(new Date()),
      endDate: null,
    };
    taskTemp.history.push(newHistory);
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(taskTemp),
    };

    fetch(`${API_PORT}/tasks/${taskTemp.id}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw Error("Error fetching users data");
        }
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const column = columns[source.droppableId as keyof TaskStatuses];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

const formatDate = (date: Date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("-");
};
