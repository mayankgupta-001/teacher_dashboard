import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import MarkAttendance from "./components/MarkAttendence";
import CheckClass from "./components/CheckClass";
import StudentAttendance from "./components/StudentAttendence";
import UploadMarks from "./components/UploadMarks";

function App() {
  return (
    <div className="flex">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100 transition-all duration-300 ml-16 mt-16">
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mark-attendance" element={<MarkAttendance />} />
            <Route path="/check-class" element={<CheckClass />} />
            <Route path="/student-attendance" element={<StudentAttendance />} />
            <Route path="/upload-marks" element={<UploadMarks />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
