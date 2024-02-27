import {
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Avatar,
  Stack,
  Chip,
  Divider,
  Box,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { History, HistoryProps } from "../../utils/types";
import React from "react";

export default function Histories({ task }: HistoryProps) {
  return (
    <>
      <DialogTitle id="alert-dialog-title">
        {task.title}
        <Chip
          label={task.statusText}
          sx={{ marginLeft: 2, color: "#45CAA5", borderColor: "#45CAA5" }}
          variant="outlined"
        />
      </DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {task?.history.map((element: History, index: number) => {
            return (
              <React.Fragment key={index}>
                <Stack spacing={2} padding={2}>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: "#45CAA5" }} aria-label="recipe">
                      {element.owner ? element.owner.charAt(0) : ""}
                    </Avatar>
                    <Typography
                      variant="h6"
                      component="div"
                      color="text.secondary"
                      alignSelf="center"
                    >
                      {`${element.owner ?? ""} ${
                        element.oldStatusText ? "changed the status" : "created"
                      } : ${element.statusText}`}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    {element.oldStatusText && (
                      <Chip
                        label={element.oldStatusText}
                        color="info"
                        variant="outlined"
                      />
                    )}
                    {element.oldStatusText && (
                      <ArrowRightAltIcon></ArrowRightAltIcon>
                    )}
                    <Chip
                      label={element.statusText}
                      style={{ color: "#45CAA5", borderColor: "#45CAA5" }}
                      variant="outlined"
                    />
                    <Box component="span" alignSelf="center">
                      {element.startDate}
                    </Box>
                  </Stack>
                </Stack>
                <Divider></Divider>
              </React.Fragment>
            );
          })}
        </DialogContentText>
      </DialogContent>
    </>
  );
}
