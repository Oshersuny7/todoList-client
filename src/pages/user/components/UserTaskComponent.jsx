import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import TaskInput from "./TaskInput";
import FilterButtons from "./FilterButtons";
import TaskList from "./TaskList";

const UserTaskComponent = () => {
  return (
    <Card variant="primary" sx={{ margin: "auto", display: "flex", justifyContent: "center" }}>
      <CardContent sx={{ width: "65%" }}>
        <Typography variant="h5" component="div" gutterBottom>
          To-Do List
        </Typography>
        <TaskInput />
        <FilterButtons />
        <TaskList />
      </CardContent>
    </Card>
  );
};

export default UserTaskComponent;
