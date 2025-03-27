import { useState } from "react";

// Sample student records for different classes
const studentRecords = {
  "B.Tech CSE 2nd Year - Math": [
    { name: "Alice", total: 20, present: 18, absent: 2 },
    { name: "Bob", total: 20, present: 15, absent: 5 },
    { name: "Charlie", total: 20, present: 19, absent: 1 },
  ],
  "B.Tech ECE 3rd Year - Math": [
    { name: "David", total: 20, present: 16, absent: 4 },
    { name: "Eve", total: 20, present: 17, absent: 3 },
  ],
  "B.Tech ME 1st Year - Math": [
    { name: "Frank", total: 20, present: 14, absent: 6 },
    { name: "Grace", total: 20, present: 18, absent: 2 },
  ],
};

const StudentAttendance = () => {
  const [selectedClass, setSelectedClass] = useState(Object.keys(studentRecords)[0]);
  const [search, setSearch] = useState("");

  // Get students of the selected class
  const students = studentRecords[selectedClass] || [];

  // Filter students based on search
  const filteredRecords = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Student Attendance</h2>

      {/* Class Selection Dropdown */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Select Class:</label>
        <select
          className="p-2 border rounded"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {Object.keys(studentRecords).map((className, index) => (
            <option key={index} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      {/* Search Student Input */}
      <input
        type="text"
        placeholder="Search student..."
        className="p-2 border rounded mb-4 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white p-6 rounded shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Total Days</th>
              <th className="p-2 border">Present</th>
              <th className="p-2 border">Absent</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((student, index) => (
                <tr key={index} className="text-center border">
                  <td className="p-2 border">{student.name}</td>
                  <td className="p-2 border">{student.total}</td>
                  <td className="p-2 border">{student.present}</td>
                  <td className="p-2 border">{student.absent}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-3 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAttendance;
