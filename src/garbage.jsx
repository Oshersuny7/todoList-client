// import React, { useState, useEffect, useRef } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Checkbox,
//   IconButton,
//   Button,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
// import axios from "axios";
// import { StaticTimePicker } from "@mui/x-date-pickers";

// import WebWorker from "../webWorkers/webWorkers";
// import alertWorker from "../webWorkers/alertWorker";
// import useTasks from "../hooks/useTasks";

// const UserTaskComponent = () => {
//   // const [tasks, setTasks] = useState([]);
//   // const [newTask, setNewTask] = useState("");
//   // const [filter, setFilter] = useState("All");
//   // const [editTaskId, setEditTaskId] = useState(null);
//   // const [editTaskText, setEditTaskText] = useState("");
//   const {
//     // tasks,
//     // setTasks,
//     newTask,
//     setNewTask,
//     filter,
//     // setFilter,
//     editTaskId,
//     // setEditTaskId,
//     editTaskText,
//     setEditTaskText,
//     createTask,
//     deleteTask,
//     deleteAllCompletedTasks,
//     handleFilter,
//     handleTaskEditSave,
//     handleTaskEdit,
//     handleStatusToggle,
//   } = useTasks;

//   const [hoveredRow, setHoveredRow] = useState(null);
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [reminderDialogOpen, setReminderDialogOpen] = useState(false);

//   const workerRef = useRef(null);

//   // useEffect(() => {
//   //   workerRef.current = new WebWorker(alertWorker);
//   //   workerRef.current.addEventListener("message", (event) => {
//   //     alert(`Reminder: ${event.data.text}`);
//   //   });

//   //   return () => {
//   //     workerRef.current.terminate();
//   //   };
//   // }, []);

//   useEffect(() => {
//     workerRef.current = new WebWorker(alertWorker);
//     workerRef.current.addEventListener("message", (event) => {
//       alert(`Reminder: ${event.data.text}`);
//     });

//     // Check for pending notifications in localStorage
//     const storedNotification = localStorage.getItem("notification");
//     if (storedNotification) {
//       const { notificationTime, text, taskId } = JSON.parse(storedNotification);
//       const currentTime = Date.now();
//       const timeDifference = notificationTime - currentTime;

//       // If notification time is in the future, schedule it
//       if (timeDifference > 0) {
//         setTimeout(() => {
//           workerRef.current.postMessage({ text, taskId });
//           localStorage.removeItem("notification"); // Remove the stored notification after displaying
//         }, timeDifference);
//       } else {
//         localStorage.removeItem("notification");
//       }
//     }

//     return () => {
//       workerRef.current.terminate();
//     };
//   }, []);

//   // useEffect(() => {
//   //   fetchTasks();
//   // }, []);

//   // const fetchTasks = async () => {
//   //   try {
//   //     const response = await axios.get("http://localhost:8000/tasks", {
//   //       withCredentials: true,
//   //     });
//   //     setTasks(response.data.tasks);
//   //   } catch (error) {
//   //     console.error("Error fetching tasks:", error);
//   //   }
//   // };

//   // const createTask = async () => {
//   //   try {
//   //     await axios.post(
//   //       "http://localhost:8000/tasks",
//   //       { text: newTask },
//   //       {
//   //         withCredentials: true,
//   //       }
//   //     );
//   //     fetchTasks();
//   //     setNewTask("");
//   //   } catch (error) {
//   //     console.error("Error creating task:", error);
//   //   }
//   // };

//   // const updateTask = async (task_id, updatedText, updatedStatus) => {
//   //   try {
//   //     await axios.patch(
//   //       `http://localhost:8000/tasks/${task_id}`,
//   //       { text: updatedText, status: updatedStatus },
//   //       {
//   //         withCredentials: true,
//   //       }
//   //     );
//   //     fetchTasks();
//   //     setEditTaskId(null);
//   //     setEditTaskText("");
//   //   } catch (error) {
//   //     console.error("Error updating task:", error);
//   //   }
//   // };

//   // const deleteAllCompletedTasks = async () => {
//   //   try {
//   //     const completedTasksIds = filteredTasks
//   //       .filter((task) => task.status === "completed")
//   //       .map((task) => task._id);

//   //     await Promise.all(completedTasksIds.map((taskId) => deleteTask(taskId)));

//   //     await axios.delete("http://localhost:8000/tasks/allcompletedtasks", {
//   //       withCredentials: true,
//   //     });

//   //     fetchTasks();
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   // const deleteTask = async (task_id) => {
//   //   try {
//   //     await axios.delete(`http://localhost:8000/tasks/${task_id}`, {
//   //       withCredentials: true,
//   //     });
//   //     fetchTasks();
//   //   } catch (error) {
//   //     console.error("Error deleting task:", error);
//   //   }
//   // };

//   // const handleStatusToggle = async (task_id) => {
//   //   const updatedTasks = [...tasks];
//   //   const taskToUpdate = updatedTasks.find((task) => task._id === task_id);

//   //   if (taskToUpdate) {
//   //     const newStatus =
//   //       taskToUpdate.status === "active" ? "completed" : "active";
//   //     updateTask(task_id, taskToUpdate.text, newStatus);
//   //   }
//   // };

//   // const handleTaskEdit = (task_id, newText) => {
//   //   setEditTaskId(task_id);
//   //   setEditTaskText(newText);
//   // };

//   // const handleTaskEditSave = async () => {
//   //   if (editTaskId && editTaskText.trim() !== "") {
//   //     await updateTask(
//   //       editTaskId,
//   //       editTaskText,
//   //       tasks.find((task) => task._id === editTaskId).status
//   //     );
//   //   }
//   // };

//   // const handleFilter = (filter) => {
//   //   setFilter(filter);
//   // };

//   // const filteredTasks = tasks.filter((task) => {
//   //   if (filter === "All") return true;
//   //   return task.status === filter.toLowerCase();
//   // });

//   const handleAlarmClick = (task_id) => {
//     setSelectedTaskId(task_id);
//     setReminderDialogOpen(true);
//   };

//   // const handleSetReminder = () => {
//   //   if (selectedTime && selectedTaskId) {
//   //     const selectedTimeMillis = selectedTime.valueOf();
//   //     const currentTime = Date.now();

//   //     // Check if the selected time is in the past
//   //     if (selectedTimeMillis <= currentTime) {
//   //       alert("Please select a future time for the reminder.");
//   //       return;
//   //     }

//   //     const timeDifference = selectedTimeMillis - currentTime;

//   //     workerRef.current.postMessage({
//   //       notificationTime: timeDifference,
//   //       text: "Reminder for your task!",
//   //       taskId: selectedTaskId,
//   //     });

//   //     setReminderDialogOpen(false);
//   //   }
//   // };

//   const handleSetReminder = () => {
//     if (selectedTime && selectedTaskId) {
//       const selectedTimeMillis = selectedTime.valueOf();
//       const currentTime = Date.now();
//       const timeDifference = selectedTimeMillis - currentTime;

//       if (timeDifference > 0) {
//         // Store notification data in localStorage
//         localStorage.setItem(
//           "notification",
//           JSON.stringify({
//             notificationTime: selectedTimeMillis,
//             text: "Reminder for your task!",
//             taskId: selectedTaskId,
//           })
//         );

//         // Start the worker
//         workerRef.current.postMessage({
//           notificationTime: timeDifference,
//           text: "Reminder for your task!",
//           taskId: selectedTaskId,
//         });

//         setReminderDialogOpen(false);
//       } else {
//         alert("Please select a future time for the reminder.");
//       }
//     }
//   };
//   const handleCloseReminderDialog = () => {
//     setReminderDialogOpen(false);
//   };

//   return (
//     <Card
//       variant="outlined"
//       sx={{ backgroundColor: "#F8F9FA", width: "85%", margin: "auto" }}
//     >
//       <CardContent>
//         <Typography variant="h5" component="div" gutterBottom>
//           To-Do List
//         </Typography>

//         <TextField
//           label="Add Task"
//           variant="outlined"
//           fullWidth
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && createTask()}
//           sx={{ marginBottom: 2 }}
//         />
//         <Box
//           display="flex"
//           flexDirection={{ xs: "column", sm: "row" }}
//           justifyContent="space-between"
//           alignItems="center"
//           marginBottom={3}
//         >
//           <Typography variant="body1" mt={{ xs: "10px", sm: "5px" }}>
//             {filteredTasks.filter((task) => task.status === "active").length}{" "}
//             item left
//           </Typography>
//           <Box
//             display="flex"
//             flexDirection={{ xs: "column", sm: "row" }}
//             gap={2}
//           >
//             <Button
//               variant={filter === "All" ? "contained" : "outlined"}
//               onClick={() => handleFilter("All")}
//             >
//               All
//             </Button>
//             <Button
//               variant={filter === "Active" ? "contained" : "outlined"}
//               onClick={() => handleFilter("Active")}
//             >
//               Active
//             </Button>
//             <Button
//               variant={filter === "Completed" ? "contained" : "outlined"}
//               onClick={() => handleFilter("Completed")}
//             >
//               Completed
//             </Button>
//           </Box>
//           <Button
//             variant="outlined"
//             onClick={() => deleteAllCompletedTasks("Clear completed")}
//           >
//             Clear completed
//           </Button>
//         </Box>

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Task</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Actions</TableCell>
//                 <TableCell>Reminder</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredTasks.map((task) => (
//                 <TableRow
//                   key={task._id}
//                   style={{
//                     textDecoration:
//                       task.status === "completed" ? "line-through" : "none",
//                   }}
//                   onMouseEnter={() => setHoveredRow(task._id)}
//                   onMouseLeave={() => setHoveredRow(null)}
//                 >
//                   <TableCell
//                     key={`text-${task._id}`}
//                     onDoubleClick={() => handleTaskEdit(task._id, task.text)}
//                   >
//                     {editTaskId === task._id ? (
//                       <div>
//                         <TextField
//                           fullWidth
//                           value={editTaskText}
//                           onChange={(e) => setEditTaskText(e.target.value)}
//                         />
//                         <Button onClick={handleTaskEditSave}>Save</Button>
//                       </div>
//                     ) : (
//                       <div>{task.text}</div>
//                     )}
//                   </TableCell>
//                   <TableCell key={`checkbox-${task._id}`}>
//                     <Checkbox
//                       checked={task.status === "completed"}
//                       onChange={() => handleStatusToggle(task._id)}
//                     />
//                   </TableCell>
//                   <TableCell key={`iconButton-${task._id}`}>
//                     {hoveredRow === task._id && (
//                       <IconButton onClick={() => deleteTask(task._id)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleAlarmClick(task._id)}>
//                       <AccessAlarmsIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>

//       <Dialog open={reminderDialogOpen} onClose={handleCloseReminderDialog}>
//         <DialogTitle>Set Reminder</DialogTitle>
//         <DialogContent>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <StaticTimePicker
//               orientation="landscape"
//               value={selectedTime}
//               onChange={setSelectedTime}
//             />
//           </LocalizationProvider>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseReminderDialog}>Exit</Button>
//           <Button onClick={handleSetReminder} color="primary">
//             Set Reminder
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// };

// export default UserTaskComponent;










  // const handleSetReminder = async () => {
  //   if (!selectedTime || !selectedTaskId || !tasks || tasks.length === 0) {
  //     console.error("Invalid selected time, task ID, or tasks array.");
  //     return;
  //   }
  
  //   try {
  //     const selectedTask = tasks.find((task) => task._id === selectedTaskId);
  //     if (!selectedTask) {
  //       console.error("Selected task not found.");
  //       return;
  //     }
  
  //     const response = await axios.get(
  //       `http://localhost:8000/tasks/check-reminder/${selectedTaskId}`,
  //       {
  //         withCredentials: true,
  //         params: { userId: selectedTask.userId },
  //       }
  //     );
  
  //     if (response.data.reminderApplicable === true) {
  //       const currentTime = Date.now();
  //       const selectedTimeMillis = selectedTime.valueOf();
  //       const timeDifference = selectedTimeMillis - currentTime;
  
  //       if (timeDifference > 0) {
  //         localStorage.setItem(
  //           "notification",
  //           JSON.stringify({
  //             notificationTime: selectedTimeMillis,
  //             text: selectedTask.text,
  //             taskId: selectedTaskId,
  //             userId: selectedTask.userId,
  //             status: selectedTask.status 
  //           })
  //         );
  
  //         workerRef.current.postMessage({
  //           notificationTime: timeDifference,
  //           text: selectedTask.text,
  //           taskId: selectedTaskId,
  //           userId: selectedTask.userId,
  //           status: selectedTask.status 
  //         });
  
  //         handleCloseReminderDialog();
  
  //         // Update the task status to 'completed'
  //         const updatedStatus = 'completed';
  //         await updateTask(selectedTaskId, selectedTask.text, updatedStatus);
  
         
  //       } else {
  //         alert("Please select a future time for the reminder.");
  //       }
  //     } else {
  //       alert("Reminder not applicable for this task because it's completed.");
  //     }
  //   } catch (error) {
  //     console.error("Error setting reminder:", error);
  //   }
  // };
 



  //sign in
  // import React, { useState } from "react";
// import {
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Box,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const SignInComponent = ({ handleSignIn }) => {
//   const navigate = useNavigate();
//   const [loginUserResponseState, setLoginUserResponseState] = useState({
//     error: "",
//     loading: false,
//   });

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });

//     setErrors({
//       ...errors,
//       [event.target.name]: "",
//     });
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};

//     Object.keys(formData).forEach((key) => {
//       if (!formData[key].trim()) {
//         newErrors[key] = "This field is required";
//         valid = false;
//       }
//     });

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Enter a valid email address";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setSubmitted(true);

//     if (validateForm()) {
//       setLoginUserResponseState({ loading: true });
//       const { email, password } = formData;

//       try {
//         await handleSignIn(email, password);
//         // Reset errors on successful form submission
//         setErrors({});
//       } catch (error) {
//         setLoginUserResponseState({
//           error: "Invalid email or password",
//           loading: false,
//         });
//       }
//     } else {
//       console.log("Form has errors, please fix them.");
//     }
//   };


//   return (
//     <Grid
//       container
//       component="main"
//       sx={{
//         height: "86vh",
//         justifyContent: "center",
//         alignItems: "center",
//         mt: 3.8,
//       }}
//     >
//       <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//         <Box
//           sx={{
//             my: 8,
//             mx: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 0 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={formData.email}
//               onChange={handleChange}
//               error={Boolean(errors.email)}
//               helperText={errors.email}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               error={Boolean(errors.password)}
//               helperText={errors.password}
//             />
//             <Button
//               variant="contained"
//               type="submit"
//               sx={{ display: "flex", justifyContent: "center" }}
//             >
//               {loginUserResponseState &&
//               loginUserResponseState.loading === true ? (
//                 <CircularProgress size={24} />
//               ) : (
//                 "Sign In"
//               )}
//             </Button>
//             {submitted &&
//               loginUserResponseState.error === "Invalid email or password" && (
//                alert("Invalid email or password")
//               )}
              
//           </Box>
//           <Button
//             variant="sec"
//             type="button"
//             fullWidth
//             sx={{ mt: 3, mb: 2 }}
//             onClick={() => navigate("/signup")}
//           >
//             Don't have an account? Create one
//           </Button>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default SignInComponent;



//Admin:
// import React from "react";
// import {Card,CardContent,Typography,TextField,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Checkbox, IconButton,Button,Box,Dialog,DialogTitle,DialogContent,DialogActions,MenuItem,Select,} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import useTasksAdmin from "../hooks/useTasksAdmin";
// import useReminder from "../../hooks/useReminder";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { StaticTimePicker } from "@mui/x-date-pickers";
// import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";

// const AdminDashboardComponent = () => {
//   const {newTask,setNewTask,editTaskId,editTaskText,setEditTaskText,users,createTask, deleteTask, deleteAllCompletedTasks, handleStatusToggle, handleTaskEdit, handleTaskEditSave, handleFilter,handleAddTaskClick, handleDialogClose, handleUserSelect,handleAddTaskForUser, filteredTasks, openDialog, setSearchTerm, searchTerm, filter, selectedUser,} = useTasksAdmin();
//   const {selectedTime,setSelectedTime,reminderDialogOpen,handleSetReminder,handleCloseReminderDialog,handleAlarmClick,} = useReminder();
//   return (
//     <Card
//       variant="primary"
//       sx={{ margin: "auto", display: "flex", justifyContent: "center" }}
//     >
//       <CardContent sx={{ width: "80%" }}>
//         <Typography variant="h5" component="div" gutterBottom>
//           To-Do List
//         </Typography>
//         <TextField
//           label="Add Task"
//           variant="outlined"
//           fullWidth
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && createTask()}
//           sx={{ marginBottom: 2 }}
//         />
//         <Box
//           display={"flex"}
//           flexDirection={{ xs: "column", sm: "row" }}
//           justifyContent={"space-between"}
//           alignItems={{ xs: "flex-start", sm: "center" }}
//           marginTop={3}
//           gap={10}
//           marginBottom={5}
//         >
//           <Box
//             display={"flex"}
//             flexDirection={{ xs: "column", sm: "row" }}
//             gap={6}
//           >
//             <Typography mt={{ lg:"20px", xs: "10px", sm: "5px" }}>
//             {filteredTasks.filter((task) => task.status === "active").length}{" "}
//             item left
//           </Typography>
          
//             <TextField
//               label="Search"
//               variant="outlined"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Button
//               variant={filter === "All" ? "contained" : "outlined"}
//               onClick={() => handleFilter("All")}
//             >
//               All
//             </Button>
//             <Button
//               variant={filter === "Active" ? "contained" : "outlined"}
//               onClick={() => handleFilter("Active")}
//             >
//               Active
//             </Button>
//             <Button
//               variant={filter === "Completed" ? "contained" : "outlined"}
//               onClick={() => handleFilter("Completed")}
//             >
//               Completed
//             </Button>
//             <Button
//               variant="danger"
//               sx={{ backgroundColor: "red", color: "white" }}
//               onClick={() => deleteAllCompletedTasks("Clear completed")}
//             >
//               Clear completed
//             </Button>
//             <Button variant="outlined" onClick={handleAddTaskClick}>
//               Add Task for User
//             </Button>
//             <Dialog open={openDialog} onClose={handleDialogClose}>
//               <DialogTitle>Add Task for User</DialogTitle>
//               <DialogContent>
//                 <Select value={selectedUser || ""} onChange={handleUserSelect}>
//                   {users.map((user) => (
//                     <MenuItem key={user._id} value={user._id}>
//                       {user.name} {user.lastName} - {user.email}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 <TextField
//                   label="Task"
//                   variant="outlined"
//                   fullWidth
//                   value={newTask}
//                   onChange={(e) => setNewTask(e.target.value)}
//                 />
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleDialogClose}>Cancel</Button>
//                 <Button onClick={handleAddTaskForUser}>Add Task</Button>
//               </DialogActions>
//             </Dialog>
//           </Box>
//         </Box>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>User name</TableCell>
//                 <TableCell>Task</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Actions</TableCell>
//                 <TableCell>Added At</TableCell>
//                 <TableCell>Reminder</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredTasks
//                 .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//                 .map((task) => (
//                   <TableRow key={task._id}>
//                     <TableCell>
//                       {task.name} {task.lastName}
//                     </TableCell>

//                     <TableCell
//                       key={`text-${task._id}`}
//                       style={{
//                         textDecoration:
//                           task.status === "completed" ? "line-through" : "none",
//                       }}
//                       onDoubleClick={() => handleTaskEdit(task._id, task.text)}
//                     >
//                       {editTaskId === task._id ? (
//                         <Box>
//                           <TextField
//                             fullWidth
//                             value={editTaskText}
//                             onChange={(e) => setEditTaskText(e.target.value)}
//                           />
//                           <Button onClick={handleTaskEditSave}>Save</Button>
//                         </Box>
//                       ) : (
//                         <Box>{task.text}</Box>
//                       )}
//                     </TableCell>
//                     <TableCell key={`checkbox-${task._id}`}>
//                       <Checkbox
//                         checked={task.status === "completed"}
//                         onChange={() => handleStatusToggle(task._id)}
//                       />
//                     </TableCell>
//                     <TableCell key={`iconButton-${task._id}`}>
//                       <IconButton onClick={() => deleteTask(task._id)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       {new Date(task.created_at).toLocaleDateString("en-US", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "numeric",
//                       })}
//                     </TableCell>
//                     <TableCell>
//                       <IconButton onClick={() => handleAlarmClick(task._id)}>
//                         <AccessAlarmsIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//       <Dialog open={reminderDialogOpen} onClose={handleCloseReminderDialog}>
//         <DialogTitle>Set Reminder</DialogTitle>
//         <DialogContent>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <StaticTimePicker
//               orientation="landscape"
//               value={selectedTime}
//               onChange={setSelectedTime}
//             />
//           </LocalizationProvider>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseReminderDialog}>Exit</Button>
//           <Button onClick={handleSetReminder} color="primary">
//             Set Reminder
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// };

// export default AdminDashboardComponent;