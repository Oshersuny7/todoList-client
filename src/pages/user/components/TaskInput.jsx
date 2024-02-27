import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { TaskContext } from "../../contexts/TaskContext";

const TaskInput = () => {

  const {newTask, setNewTask, createTask} = useContext(TaskContext);
  return (
    <TextField
    label="Add Task"
    variant="outlined"
    fullWidth
    value={newTask}
    onChange={(e) => setNewTask(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && createTask()}
    sx={{ marginBottom: 2 }}
  />
  );
};

export default TaskInput;
