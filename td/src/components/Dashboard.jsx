import { useState, useEffect } from "react";

const dailySchedule = [
  { time: "08:00 AM - 09:00 AM", classroom: "Room 201", class: "B.Tech CSE 2nd Year" },
  { time: "09:15 AM - 10:15 AM", classroom: "Room 202", class: "B.Tech ECE 3rd Year" },
  { time: "10:30 AM - 11:30 AM", classroom: "Room 203", class: "B.Tech ME 1st Year" },
  { time: "11:45 AM - 12:45 PM", classroom: "Room 204", class: "B.Tech IT 4th Year" },
  { time: "01:00 PM - 02:00 PM", classroom: "-", class: "Lunch Break" },
  { time: "02:15 PM - 03:15 PM", classroom: "Room 205", class: "B.Tech CSE 3rd Year" },
  { time: "03:30 PM - 04:30 PM", classroom: "Lab 1", class: "B.Tech AI 2nd Year" },
  { time: "04:30 PM - 05:00 PM", classroom: "Room 206", class: "B.Tech Civil 1st Year" },
];

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

const Dashboard = () => {
  const [currentClass, setCurrentClass] = useState(getCurrentClass());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClass(getCurrentClass());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-1">
      <h2 className="text-2xl font-bold mb-5">Today's Timetable</h2>
      <div className="bg-white p-6 rounded shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Time Slot</th>
              <th className="p-3 border">Classroom</th>
              <th className="p-3 border">Class</th>
            </tr>
          </thead>
          <tbody>
            {dailySchedule.map((slot, index) => {
              const isActive = currentClass && slot.time === currentClass.time;
              return (
                <tr
                  key={index}
                  className={`border transition-all duration-500 ${
                    isActive
                      ? "bg-yellow-200 font-bold animate-pulse"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <td className="p-3 border">{slot.time}</td>
                  <td className="p-3 border">{slot.classroom}</td>
                  <td className="p-3 border">{slot.class}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
