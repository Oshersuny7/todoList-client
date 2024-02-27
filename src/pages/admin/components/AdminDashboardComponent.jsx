import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import AdminFilterButtons from "./AdminFilterButtons";
import AdminTaskList from "./AdminTaskList";
import AdminTaskInput from "./AdminTaskInput";

const AdminDashboardComponent = () => {
  return (
        <Card
          variant="primary"
          sx={{ margin: "auto", display: "flex", justifyContent: "center" }}
        >
          <CardContent sx={{ width: "70%" }}>
            <Typography variant="h5" component="div" gutterBottom>
              To-Do List
            </Typography>
           <AdminTaskInput/>
            <AdminFilterButtons/>
            <AdminTaskList />
          </CardContent>
        </Card>
      );
}

export default AdminDashboardComponent;