import { useState, useEffect } from "react";

const dailySchedule = [
  { time: "08:00 AM - 09:00 AM", className: "B.Tech CSE 2nd Year", room: "101" },
  { time: "09:15 AM - 10:15 AM", className: "B.Tech ECE 3rd Year", room: "102" },
  { time: "10:30 AM - 11:30 AM", className: "B.Tech ME 1st Year", room: "103" },
  { time: "11:45 AM - 12:45 PM", className: "B.Tech IT 4th Year", room: "104" },
  { time: "01:00 PM - 02:00 PM", className: "Lunch Break", room: "-" },
  { time: "02:15 PM - 03:15 PM", className: "B.Tech CSE 3rd Year", room: "105" },
  { time: "03:30 PM - 04:30 PM", className: "B.Tech AI 2nd Year", room: "106" },
  { time: "04:30 PM - 05:00 PM", className: "B.Tech Civil 1st Year", room: "107" },
];

const students = ["Alice", "Bob", "Charlie", "David", "Emma"];

const getCurrentClass = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  return dailySchedule.find((slot) => {
    const [start, end] = slot.time.split(" - ");
    const [startHour, startMin, startPeriod] = start.match(/(\d+):(\d+) (AM|PM)/).slice(1);
    const [endHour, endMin, endPeriod] = end.match(/(\d+):(\d+) (AM|PM)/).slice(1);

    const startTime = parseInt(startHour) + (startPeriod === "PM" && startHour !== "12" ? 12 : 0);
    const endTime = parseInt(endHour) + (endPeriod === "PM" && endHour !== "12" ? 12 : 0);

    return (
      (currentHour > startTime || (currentHour === startTime && currentMinutes >= parseInt(startMin))) &&
      (currentHour < endTime || (currentHour === endTime && currentMinutes <= parseInt(endMin)))
    );
  });
};

const MarkAttendance = () => {
  const [currentClass, setCurrentClass] = useState(getCurrentClass());
  const [attendance, setAttendance] = useState({});
  const [submittedClasses, setSubmittedClasses] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClass(getCurrentClass());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAttendance = (name, status) => {
    if (!currentClass || selectedClass?.time !== currentClass.time || submittedClasses[selectedClass.time]) return;
    setAttendance({ ...attendance, [name]: status });
  };

  const submitAttendance = () => {
    if (!selectedClass || selectedClass.time !== currentClass?.time || submittedClasses[selectedClass.time]) return;
    setSubmittedClasses({ ...submittedClasses, [selectedClass.time]: true });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Mark Attendance</h2>

      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-4">Today's Timetable</h3>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Time Slot</th>
              <th className="p-3 border">Class</th>
              <th className="p-3 border">Room</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {dailySchedule.map((slot, index) => (
              <tr
                key={index}
                onClick={() => setSelectedClass(slot === currentClass ? slot : null)} // Only set selected class if it's the running class
                className={`cursor-pointer transition-all ${
                  slot === currentClass
                    ? "bg-yellow-300 font-bold"
                    : "bg-gray-100 hover:bg-blue-200 transition duration-300"
                }`}
              >
                <td className="p-3 border text-center">{slot.time}</td>
                <td className="p-3 border text-center">{slot.className}</td>
                <td className="p-3 border text-center">{slot.room}</td>
                <td className="p-3 border text-center">
                  {submittedClasses[slot.time] ? (
                    <span className="text-green-600 font-semibold">Submitted</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Not Submitted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedClass && selectedClass.time === currentClass?.time && (
        <div className="bg-white p-6 rounded shadow-md mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Mark Attendance for {selectedClass.className} - Room {selectedClass.room}
          </h3>

          {students.map((student) => (
            <div key={student} className="flex justify-between items-center mb-3 p-3 border rounded">
              <span>{student}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleAttendance(student, "Present")}
                  disabled={submittedClasses[selectedClass.time]}
                  className={`px-4 py-2 rounded ${
                    attendance[student] === "Present" ? "bg-green-500 text-white" : "bg-gray-300"
                  }`}
                >
                  Present
                </button>
                <button
                  onClick={() => handleAttendance(student, "Absent")}
                  disabled={submittedClasses[selectedClass.time]}
                  className={`px-4 py-2 rounded ${
                    attendance[student] === "Absent" ? "bg-red-500 text-white" : "bg-gray-300"
                  }`}
                >
                  Absent
                </button>
                <button
                  onClick={() => handleAttendance(student, "Leave")}
                  disabled={submittedClasses[selectedClass.time]}
                  className={`px-4 py-2 rounded ${
                    attendance[student] === "Leave" ? "bg-yellow-500 text-white" : "bg-gray-300"
                  }`}
                >
                  Leave
                </button>
              </div>
            </div>
          ))}

          {!submittedClasses[selectedClass.time] ? (
            <button
              onClick={submitAttendance}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit Attendance
            </button>
          ) : (
            <p className="mt-4 text-green-600 font-semibold">Attendance Submitted ✅</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
