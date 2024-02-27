import { AdminTaskContextProvider } from "../contexts/AdminTaskContext";
import { ReminderContextProvider } from "../contexts/ReminderContext";
import AdminDashboardComponent from "./components/AdminDashboardComponent";

const AdminDashboardPage =()=>{
    return(
        <ReminderContextProvider>
        <AdminTaskContextProvider>
            <AdminDashboardComponent/>
        </AdminTaskContextProvider>
        </ReminderContextProvider>
    )
}
export default AdminDashboardPage;