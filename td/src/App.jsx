import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/teacher/Sidebar";
import Navbar from "./components/teacher/Navbar";
import Dashboard from "./components/teacher/Dashboard";
import MarkAttendance from "./components/teacher/MarkAttendence";
import CheckClass from "./components/teacher/CheckClass";
import StudentAttendance from "./components/teacher/StudentAttendence";
import UploadMarks from "./components/teacher/UploadMarks";

import StudentSidebar from "./components/student/StudentSidebar";
import StudentNavbar from "./components/student/StudentNavbar";
import StudentDashboard from "./components/student/StudentDashboard";
import FloatingRobot from "./components/student/FloatingRobot"; // ✅ Added Floating Robot
import StudentProfile from "./components/student/StudentProfile";
import TeacherProfile from './components/teacher/teacherprofile'

import Login from "./components/login/Login"; // ✅ Import Login Page

// ✅ Protected Route Component
const ProtectedRoute = ({ userType }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const storedUserType = localStorage.getItem("userType");

  if (!isAuthenticated || storedUserType !== userType) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

// ✅ Teacher Layout (With Navbar & Sidebar)
function TeacherLayout() {
  return (
    <div className="flex">
      <Navbar />
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 transition-all duration-300 ml-16 mt-16 p-6">
        <Outlet /> {/* 🔹 Ensures correct rendering of child routes */}
      </div>
    </div>
  );
}

// ✅ Student Layout (With Navbar, Sidebar, and Floating Robot)
function StudentLayout() {
  return (
    <div className="flex relative">
      <StudentNavbar />
      <StudentSidebar />
      <div className="flex-1 min-h-screen bg-gray-100 transition-all duration-300 ml-16 mt-16 p-6">
        <Outlet /> {/* 🔹 Ensures correct rendering of child routes */}
      </div>
      <FloatingRobot /> {/* ✅ Always Visible on Student Pages */}
    </div>
  );
}

// ✅ Main App Component
function App() {
  return (
    <Routes>
      {/* 🔹 Login Route */}
      <Route path="/" element={<Login />} />

      {/* 🔹 Protected Teacher Routes */}
      <Route path="/teacher" element={<ProtectedRoute userType="teacher" />}>
        <Route element={<TeacherLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="check-class" element={<CheckClass />} />
          <Route path="student-attendance" element={<StudentAttendance />} />
          <Route path="upload-marks" element={<UploadMarks />} />
          <Route path="profile" element={<TeacherProfile />} />
        </Route>
      </Route>

      {/* 🔹 Protected Student Routes */}
      <Route path="/student" element={<ProtectedRoute userType="student" />}>
        <Route element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
