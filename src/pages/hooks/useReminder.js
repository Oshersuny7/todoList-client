import { useState, useEffect, useRef } from "react";
import axios from "axios";
import alertWorker from "../webWorkers/alertWorker"
import WebWorker from "../webWorkers/webWorker";
import useTasks from "./useTasks";

const useReminder = () => {
  const { tasks ,updateTask,fetchTasks } = useTasks();
  const [selectedTime, setSelectedTime] = useState(null);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new WebWorker(alertWorker);
    workerRef.current.addEventListener("message", (event) => {
    });

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleSetReminder = async () => {
    if (!selectedTime || !selectedTaskId || !tasks || tasks.length === 0) {
      console.error("Invalid selected time, task ID, or tasks array.");
      return;
    }
  
    try {
      const selectedTask = tasks.find((task) => task._id === selectedTaskId);
      if (!selectedTask) {
        console.error("Selected task not found.");
        return;
      }
  
      const response = await axios.get(
        `http://localhost:8000/tasks/check-reminder/${selectedTaskId}`,
        {
          withCredentials: true,
          params: { userId: selectedTask.userId },
          headers: {
            "Client-Type": "web" 
          }
        }
      );
  
      if (response.data.reminderApplicable === true) {
        const currentTime = Date.now();
        const selectedTimeMillis = selectedTime.valueOf();
        console.log(selectedTime);
        const timeDifference = selectedTimeMillis - currentTime;
  
        if (timeDifference > 0) {
          localStorage.setItem(
            "notification",
            JSON.stringify({
              notificationTime: selectedTimeMillis,
              text: selectedTask.text,
              taskId: selectedTaskId,
              userId: selectedTask.userId,
              status: selectedTask.status 
            })
          );
  
          // Schedule the reminder and confirmation dialog
          setTimeout(async () => {
            const confirmation = window.confirm(`Do you want to change the task "${selectedTask.text}" to completed?`);
            if (confirmation) {
              // Update the task status to 'completed'
              const updatedStatus = 'completed';
              await updateTask(selectedTaskId, selectedTask.text, updatedStatus);
              // Fetch updated tasks after status update
              await fetchTasks();
            }
          }, timeDifference);
  
          // Post message to worker
          workerRef.current.postMessage({
            notificationTime: timeDifference,
            text: selectedTask.text,
            taskId: selectedTaskId,
            userId: selectedTask.userId,
            status: selectedTask.status,
          });
          console.log(selectedTask.status);
  
          // Close the reminder dialog
          handleCloseReminderDialog();
        } else {
          alert("Please select a future time for the reminder.");
        }
      } else {
        if(response.data.reason ==="User ID does not match."){
          alert("You are not allowed to set a reminder for this user")
        }
        else{

          alert("Reminder not applicable for this task because it's completed.");
        }
      }
      
    } catch (error) {
      console.error("Error setting reminder:", error);
    }
  };

  const handleCloseReminderDialog = () => {
    setReminderDialogOpen(false);
  };

  const handleAlarmClick = (taskId) => {
    setSelectedTaskId(taskId);
    setReminderDialogOpen(true);
  };
  return {selectedTime,setSelectedTime,reminderDialogOpen,setReminderDialogOpen,handleSetReminder,handleCloseReminderDialog,selectedTaskId,setSelectedTaskId, handleAlarmClick,}
};
export default useReminder;




