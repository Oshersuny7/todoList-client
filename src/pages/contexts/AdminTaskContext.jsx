import React, { createContext } from 'react';
import useTasksAdmin from '../admin/hooks/useTasksAdmin';

export const AdminTaskContext = createContext();
export const AdminTaskContextProvider = ({children})=>{

  const{ 
    newTask,
    setNewTask,
    editTaskId,
    setEditTaskId,
    editTaskText,
    setEditTaskText,
    tasks,
    setTasks,
    users,
    setUsers,
    fetchTasks,
    fetchUsers,
    createTask,
    deleteTask,
    updateTask,
    deleteAllCompletedTasks,
    handleStatusToggle,
    handleTaskEdit,
    handleTaskEditSave,
    handleFilter,
    handleAddTaskClick,
    handleDialogClose,
    handleUserSelect,
    handleAddTaskForUser,
    filteredTasks,
    openDialog,
    setOpenDialog,
    setSearchTerm,
    searchTerm,
    filter,
    setFilter,
    setSelectedUser,
    selectedUser,
    userId,
  }=useTasksAdmin()

  
  return(
    <AdminTaskContext.Provider value={{
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
    </AdminTaskContext.Provider>
  );
};


