import { useState,useEffect } from "react";
import axios from "axios";

const useTasks = (userId) => {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  
  
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/tasks", {
        withCredentials: true,
        headers: {
          "Client-Type": "web" 
        }
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async () => {
    try {
      await axios.post(
        "http://localhost:8000/tasks",
        { text: newTask,userId: userId },
        {
          withCredentials: true,
          headers: {
            "Client-Type": "web" 
          }
        }
      );
      fetchTasks();
      setNewTask("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (task_id, updatedText, updatedStatus) => {
    try {
      await axios.patch(
        `http://localhost:8000/tasks/${task_id}`,
        { text: updatedText, status: updatedStatus },
        {
          withCredentials: true,
          headers: {
            "Client-Type": "web" 
          }
        }
      );
      fetchTasks();
      setEditTaskId(null);
      setEditTaskText("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteAllCompletedTasks = async () => {
    try {
      const completedTasksIds = filteredTasks
        .filter((task) => task.status === "completed")
        .map((task) => task._id);

      await Promise.all(completedTasksIds.map((taskId) => deleteTask(taskId)));

      await axios.delete("http://localhost:8000/tasks/allcompletedtasks", {
        withCredentials: true,
        headers: {
          "Client-Type": "web" 
        }
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (task_id) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${task_id}`, {
        withCredentials: true,
        headers: {
          "Client-Type": "web" 
        }
        
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusToggle = async (task_id) => {
    const updatedTasks = [...tasks];
    const taskToUpdate = updatedTasks.find((task) => task._id === task_id);

    if (taskToUpdate) {
      const newStatus =
        taskToUpdate.status === "active" ? "completed" : "active";
      updateTask(task_id, taskToUpdate.text, newStatus);
    }
  };

  const handleTaskEdit = (task_id, newText) => {
    setEditTaskId(task_id);
    setEditTaskText(newText);
  };

  const handleTaskEditSave = async () => {
    if (editTaskId && editTaskText.trim() !== "") {
      await updateTask(
        editTaskId,
        editTaskText,
        tasks.find((task) => task._id === editTaskId).status
      );
    }
  };

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter.toLowerCase();
  });

  return {
    tasks,
    setTasks,
    newTask,
    setNewTask,
    filter,
    setFilter,
    editTaskId,
    setEditTaskId,
    editTaskText,
    filteredTasks,
    setEditTaskText,
    createTask,
    updateTask,
    deleteTask,
    deleteAllCompletedTasks,
    handleFilter,
    handleTaskEditSave,
    handleTaskEdit,
    handleStatusToggle,
    fetchTasks,
    userId
  };
};

export default useTasks;
