import { ReminderContextProvider } from "../contexts/ReminderContext";
import { TaskContextProvider } from "../contexts/TaskContext";
import UserTaskComponent from "./components/UserTaskComponent";

const UserTaskPage = () => {
  return (
    <TaskContextProvider>
      <ReminderContextProvider>
      <UserTaskComponent />
    </ReminderContextProvider>
    </TaskContextProvider>
  );
};
export default UserTaskPage;
