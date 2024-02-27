import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { AdminTaskContext } from "../../contexts/AdminTaskContext";

const AdminTaskInput = () => {
  const {newTask, setNewTask, createTask} = useContext(AdminTaskContext);
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

export default AdminTaskInput;
