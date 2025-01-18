import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import {Toaster} from 'sonner';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import TaskDetails from './Pages/TaskDetails';
import Tasks from './Pages/Tasks';
import Trash from './Pages/Trash';
import Users from './Pages/Users';
import { useSelector } from 'react-redux';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';

function Layout() {
  const {user} = useSelector((state) => state.auth);
  const location = useLocation();

  return user ?(
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
      <Sidebar />
      </div> 
      {/* <MobileSidebar /> */}
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div className='p-4 2xl:px-10'>
        <Outlet />
        </div>
      </div>
    </div>
  ):(
    <Navigate to="/log-in" state={{from: location}} replace/>
  );
}

function App() {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6]'>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>
        <Route path="/log-in" element={<Login />} />
      </Routes>
      <Toaster richColors />

    </main>
  );
}

export default App;
















// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MainPage from './Pages/Home/MainPage';
// // import MainPage from './Pages/MainPage';
// // import LoginPage from './Pages/LoginPage';
// // import OtherPage from './Pages/OtherPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainPage />} />
//         {/* <Route path="/login" element={<LoginPage />} />
//         <Route path="/other" element={<OtherPage />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
