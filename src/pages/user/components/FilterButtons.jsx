import React, { useContext } from "react";
import { Button, Box, Typography } from "@mui/material";
import { TaskContext } from "../../contexts/TaskContext";

const FilterButtons = () => {
  const {deleteAllCompletedTasks, handleFilter, filter, filteredTasks} = useContext(TaskContext);
  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={{ xs: "flex-start", sm: "center" }}
      marginTop={3}
      gap={ 10}
      marginBottom={5}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={10}
      >
        <Typography variant="body1" mt={{ xs: "10px", sm: "5px" }}>
          {filteredTasks.filter((task) => task.status === "active").length} item
          left
        </Typography>

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
      </Box>
    </Box>
  );
};

export default FilterButtons;
