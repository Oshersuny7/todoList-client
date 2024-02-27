// react-router-dom
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// styling
import './App.css'

// pages
import HomePage from './pages/general/HomePage'
import SignInPage from './pages/general/SignInPage'
import SignUpPage from './pages/general/SignUpPage'

// pages//components
import HeaderComponent from './pages/general/components/HeaderComponent'

// admin pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage'

// users pages
import UserTaskPage from './pages/user/UserTaskPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <HeaderComponent/>
        <img src='home.png' alt="Background" className="background-image" />
        <Routes>

          {/*General pages  */}
          <Route path="*" element="Page not exist 404" />
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/*User pages  */} 
          <Route path="/user" element={<UserTaskPage />} />

          {/*Admin pages  */}
          <Route path="/admin" element={<AdminDashboardPage />} />

        </Routes>
      </div>
  
    </BrowserRouter>
  );
}

export default App;
