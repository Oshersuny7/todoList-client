import React, { useContext } from "react";
import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent, Select, MenuItem, TextField, Typography } from "@mui/material";
import { AdminTaskContext } from "../../contexts/AdminTaskContext";

const AdminFilterButtons = () => {

  const {handleFilter,filter,filteredTasks,users,handleUserSelect,handleAddTaskClick,openDialog,handleDialogClose, setSearchTerm,selectedUser,searchTerm,handleAddTaskForUser,deleteAllCompletedTasks,newTask, setNewTask}=useContext(AdminTaskContext);
  return (
    <Box
    display={"flex"}
    flexDirection={{ xs: "column", sm: "row" }}
    justifyContent={"space-between"}
    alignItems={{ xs: "flex-start", sm: "center" }}
    marginTop={3}
    gap={10}
    marginBottom={5}
  >
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      gap={5}
    >
      <Typography mt={{ lg:"20px", xs: "10px", sm: "5px" }}>
      {filteredTasks.filter((task) => task.status === "active").length}{" "}item 
      left
    </Typography>
    
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        variant={filter === "All" ? "contained" : "outlined"}
        onClick={() => handleFilter("All")}
      >
        All
      </Button>
      <Button
        variant={filter === "Active" ? "contained" : "outlined"}
        onClick={() => handleFilter("Active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "Completed" ? "contained" : "outlined"}
        onClick={() => handleFilter("Completed")}
      >
        Completed
      </Button>
      <Button
        variant="danger"
        sx={{ backgroundColor: "red", color: "white" }}
        onClick={() => deleteAllCompletedTasks("Clear completed")}
      >
        Clear completed
      </Button>
      <Button variant="outlined" onClick={handleAddTaskClick}>
        Add Task for User
      </Button>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Task for User</DialogTitle>
        <DialogContent>
          <Select value={selectedUser || ""} onChange={handleUserSelect}>
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name} {user.lastName} - {user.email}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Task"
            variant="outlined"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddTaskForUser}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </Box>
  </Box>
  );
};
export default AdminFilterButtons;
