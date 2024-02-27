import React, { useContext } from "react";
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Checkbox,IconButton,Button,Dialog,DialogTitle,DialogContent,DialogActions,TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminTaskContext } from "../../contexts/AdminTaskContext";
import { ReminderContext } from "../../contexts/ReminderContext";

const AdminTaskList=()=>{
    const {filteredTasks, handleStatusToggle, deleteTask, editTaskId, editTaskText, handleTaskEdit, handleTaskEditSave, setEditTaskText } = useContext(AdminTaskContext);
    const {selectedTime,setSelectedTime, reminderDialogOpen, handleSetReminder, handleCloseReminderDialog,handleAlarmClick} = useContext(ReminderContext)
    return(
        <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User name</TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>Added At</TableCell>
                <TableCell>Reminder</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((task) => (
                  <TableRow key={task._id}>
                    <TableCell>
                      {task.name} {task.lastName}
                    </TableCell>

                    <TableCell
                      key={`text-${task._id}`}
                      style={{
                        textDecoration:
                          task.status === "completed" ? "line-through" : "none",
                      }}
                      onDoubleClick={() => handleTaskEdit(task._id, task.text)}
                    >
                      {editTaskId === task._id ? (
                        <Box>
                          <TextField
                            fullWidth
                            value={editTaskText}
                            onChange={(e) => setEditTaskText(e.target.value)}
                          />
                          <Button onClick={handleTaskEditSave}>Save</Button>
                        </Box>
                      ) : (
                        <Box>{task.text}</Box>
                      )}
                    </TableCell>
                    <TableCell key={`checkbox-${task._id}`}>
                      <Checkbox
                        checked={task.status === "completed"}
                        onChange={() => handleStatusToggle(task._id)}
                      />
                    </TableCell>
                    <TableCell key={`iconButton-${task._id}`}>
                      <IconButton onClick={() => deleteTask(task._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {new Date(task.created_at).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleAlarmClick(task._id)}>
                        <AccessAlarmsIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      <Dialog open={reminderDialogOpen} onClose={handleCloseReminderDialog}>
        <DialogTitle>Set Reminder</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
              value={selectedTime}
              onChange={setSelectedTime}/>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReminderDialog}>Exit</Button>
          <Button onClick={handleSetReminder} color="primary">
            Set Reminder
          </Button>
        </DialogActions>
      </Dialog>
        </>
    );
}
export default AdminTaskList;