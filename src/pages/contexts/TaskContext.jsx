import React, { createContext, useContext, useState } from 'react';
import useTasks from '../hooks/useTasks';

export const TaskContext = createContext();

export const TaskContextProvider = ({children})=>{

  const{ 
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
    userId,
    users,
    setUsers,
    fetchUsers,
    handleAddTaskClick,
    handleDialogClose,
    handleUserSelect,
    handleAddTaskForUser,
    openDialog,
    setOpenDialog,
    setSearchTerm,
    searchTerm,
    setSelectedUser,
    selectedUser,
  }=useTasks()

  
  return(
    <TaskContext.Provider value={{
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
      userId,
      users,
      setUsers,
      fetchUsers,
      handleAddTaskClick,
      handleDialogClose,
      handleUserSelect,
      handleAddTaskForUser,
      openDialog,
      setOpenDialog,
      setSearchTerm,
      searchTerm,
      setSelectedUser,
      selectedUser}}>
      {children}
    </TaskContext.Provider>
  );
};


