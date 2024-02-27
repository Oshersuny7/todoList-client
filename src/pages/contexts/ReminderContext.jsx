import React, { createContext } from 'react';
import useReminder from '../hooks/useReminder';

export const ReminderContext = createContext();
export const ReminderContextProvider = ({children})=>{

  const{ 
    selectedTime,
    setSelectedTime,
    reminderDialogOpen,
    setReminderDialogOpen,
    handleSetReminder,
    handleCloseReminderDialog,
    selectedTaskId,
    setSelectedTaskId,
    handleAlarmClick
  }=useReminder();

  
  return(
    <ReminderContext.Provider value={{
        selectedTime,
        setSelectedTime,
        reminderDialogOpen,
        setReminderDialogOpen,
        handleSetReminder,
        handleCloseReminderDialog,
        selectedTaskId,
        setSelectedTaskId,
        handleAlarmClick }}>
      {children}
    </ReminderContext.Provider>
  );
};


