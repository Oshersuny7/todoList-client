import React, { useContext } from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Checkbox,IconButton,Button,Dialog, DialogTitle,DialogContent,DialogActions,TextField} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, StaticTimePicker } from "@mui/x-date-pickers";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskContext } from "../../contexts/TaskContext";
import { ReminderContext } from "../../contexts/ReminderContext";

const TaskList = () => {
  const { filteredTasks, handleStatusToggle, deleteTask, editTaskId, editTaskText, handleTaskEdit, handleTaskEditSave, setEditTaskText } = useContext(TaskContext);
  const [hoveredRow, setHoveredRow] = React.useState(null);
  const {selectedTime,setSelectedTime, reminderDialogOpen,handleSetReminder,handleCloseReminderDialog,handleAlarmClick }=useContext(ReminderContext);
  return (
    <>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
            <TableCell>Reminder</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow
              key={task._id}
              style={{
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
              }}
              onMouseEnter={() => setHoveredRow(task._id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <TableCell
                key={`text-${task._id}`}
                onDoubleClick={() => handleTaskEdit(task._id, task.text)}
              >
                {editTaskId === task._id ? (
                  <div>
                    <TextField
                      fullWidth
                      value={editTaskText}
                      onChange={(e) => setEditTaskText(e.target.value)}
                    />
                    <Button onClick={handleTaskEditSave}>Save</Button>
                  </div>
                ) : (
                  <div>{task.text}</div>
                )}
              </TableCell>
              <TableCell key={`checkbox-${task._id}`}>
                <Checkbox
                  checked={task.status === "completed"}
                  onChange={() => handleStatusToggle(task._id)}
                />
              </TableCell>
              <TableCell key={`iconButton-${task._id}`}>
                {hoveredRow === task._id && (
                  <IconButton onClick={() => deleteTask(task._id)}>
                    <DeleteIcon />
                  </IconButton>
                )}
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
};
export default TaskList;


