import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Task } from "../../utils/types";
import { useAuth } from "../../hooks/useAuth";
import { API_PORT } from "../../utils/const";

export default function Amounts() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${API_PORT}/tasks?ownerUsername=${user?.username}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Error fetching users data");
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {task.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {task.taskAmount}
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary" variant="body2">
                    {task.description}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    Start - End Date
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label={task.startDate} size="small" />
                    {task.endDate && <Chip label={task.endDate} size="small" />}
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Box>Not found </Box>
        )}
      </Grid>
    </Box>
  );
}
