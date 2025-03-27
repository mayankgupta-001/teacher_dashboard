import { useState } from "react";

// Full university schedule
const classSchedule = [
  { className: "B.Tech CSE 2nd Year", subject: "Math", time: "08:00 AM - 09:00 AM", room: "101", date: "2025-03-26" },
  { className: "B.Tech ECE 3rd Year", subject: "Math", time: "09:30 AM - 10:30 AM", room: "102", date: "2025-03-26" },
  { className: "B.Tech ME 1st Year", subject: "Math", time: "11:00 AM - 12:00 PM", room: "103", date: "2025-03-26" },
  { className: "B.Tech IT 4th Year", subject: "Math", time: "02:00 PM - 03:00 PM", room: "104", date: "2025-03-26" },
  { className: "B.Tech CSE 3rd Year", subject: "Math", time: "03:30 PM - 04:30 PM", room: "105", date: "2025-03-27" },
  { className: "B.Tech AI 2nd Year", subject: "Math", time: "09:00 AM - 10:00 AM", room: "106", date: "2025-03-28" },
];

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => new Date().toISOString().split("T")[0];

// Convert time to minutes
const getTimeInMinutes = (time) => {
  let [hour, min, period] = time.match(/(\d+):(\d+) (AM|PM)/).slice(1);
  hour = parseInt(hour) + (period === "PM" && hour !== "12" ? 12 : 0);
  return hour * 60 + parseInt(min);
};

// Get current time in minutes
const getCurrentTimeInMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

// Get class status correctly
const getClassStatus = (time, classDate, selectedDate) => {
  const currentDate = getCurrentDate();
  const currentTime = getCurrentTimeInMinutes();
  const [start, end] = time.split(" - ");
  const startTime = getTimeInMinutes(start);
  const endTime = getTimeInMinutes(end);

  if (classDate > currentDate) return "Upcoming"; // Future class
  if (classDate < currentDate) return "Completed"; // Past class

  // If the class is on today's date, check time
  if (currentTime < startTime) return "Upcoming"; // Class not started yet
  if (currentTime >= startTime && currentTime <= endTime) return "Ongoing"; // Class is happening now
  return "Completed"; // Class already ended
};

const CheckClass = () => {
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  // Filter schedule for selected date
  const filteredClasses = classSchedule.filter((c) => c.date === selectedDate);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">Class Schedule</h2>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Room</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classItem, index) => {
                const status = getClassStatus(classItem.time, classItem.date, selectedDate);
                return (
                  <tr
                    key={index}
                    className={`text-center border cursor-pointer hover:bg-gray-100 transition-all ${
                      status === "Ongoing" ? "bg-yellow-300 animate-pulse" : ""
                    }`}
                  >
                    <td className="p-2 border">{classItem.className}</td>
                    <td className="p-2 border">{classItem.time}</td>
                    <td className="p-2 border">{classItem.room}</td>
                    <td className={`p-2 border font-semibold ${status === "Ongoing" ? "text-green-700" : ""}`}>
                      {status}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-3 text-gray-500">
                  No classes scheduled for this day.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckClass;
