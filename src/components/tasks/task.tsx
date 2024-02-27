import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import HistoryIcon from "@mui/icons-material/History";
import Histories from "../histories/history";
import { Task, TaskStatuses } from "../../utils/types";
import { onDragEnd } from "../../utils/helper";
import { useAuth } from "../../hooks/useAuth";

export default function Tasks() {
  const taskStatus: TaskStatuses = {
    toDo: {
      name: "To Do",
      items: [],
    },
    inProgress: {
      name: "In Progress",
      items: [],
    },
    done: {
      name: "Done",
      items: [],
    },
  };
  const [columns, setColumns] = useState<TaskStatuses>(taskStatus);
  const [task, setTask] = useState<Task | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetch("http://localhost:3030/tasks")
      .then((res) => {
        if (!res.ok) {
          throw Error("Error fetching users data");
        }
        return res.json();
      })
      .then((data) => {
        data.forEach((element: Task) => {
          taskStatus[element.statusCode as keyof TaskStatuses].items.push(
            element
          );
          setColumns({ ...taskStatus });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleAvatarClick = (item: Task, index: number) => {
    item.ownerId = user?.id ?? null;
    item.ownerUsername = user?.username ?? null;
    item.owner = user?.name ?? null;

    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(item),
    };
    fetch(`http://localhost:3030/tasks/${item.id}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw Error("Error fetching users data");
        }
        return res.json();
      })
      .then((data) => {
        const columnsTemp = columns;
        columnsTemp[item.statusCode as keyof TaskStatuses].items[index] = data;
        setColumns({ ...columnsTemp });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <Typography variant="h2" sx={{ textAlign: "center", padding: 2 }}>
        Spotzer Freelancer Board
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <Typography variant="h5">{column.name}</Typography>
                <Paper sx={{ margin: 2 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <Box
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#DDEBFF"
                              : "#F4F5F7",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item: Task, index: number) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Card
                                      sx={{
                                        margin: "20px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#FAF9F6"
                                          : "white",
                                      }}
                                      key={item.id}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <CardHeader
                                        avatar={
                                          <IconButton
                                            onClick={() =>
                                              handleAvatarClick(item, index)
                                            }
                                          >
                                            <Avatar
                                              sx={{ bgcolor: "#45CAA5" }}
                                              aria-label="recipe"
                                            >
                                              {item.owner
                                                ? item.owner.charAt(0)
                                                : ""}
                                            </Avatar>
                                          </IconButton>
                                        }
                                        title={item.title}
                                        subheader={item.startDate}
                                      />

                                      <CardContent>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          {item.description}
                                        </Typography>
                                      </CardContent>
                                      <CardActions disableSpacing>
                                        <IconButton
                                          aria-label="Go to Histories"
                                          onClick={() => setTask(item)}
                                        >
                                          <HistoryIcon></HistoryIcon>
                                        </IconButton>
                                      </CardActions>
                                    </Card>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </Box>
                      );
                    }}
                  </Droppable>
                </Paper>
              </Box>
            );
          })}
        </DragDropContext>
      </Box>
      {task && (
        <Dialog
          open={!!task}
          onClose={() => setTask(null)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Histories task={task}></Histories>
        </Dialog>
      )}
    </Box>
  );
}
