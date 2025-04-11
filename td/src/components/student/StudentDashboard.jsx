import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const subjects = [
  { name: "Mathematics", attendance: 85 },
  { name: "Physics", attendance: 78 },
  { name: "Chemistry", attendance: 90 },
  { name: "English", attendance: 72 },
  { name: "Computer Science", attendance: 88 },
];

const StudentDashboard = () => {
  const finalAttendance = 82;
  const [progress, setProgress] = useState(0);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Personalized Greeting Logic
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good Morning 🌅");
    else if (hours < 18) setGreeting("Good Afternoon ☀️");
    else setGreeting("Good Evening 🌙");

    // Smooth Progress Bar Animation
    const timer = setTimeout(() => setProgress(finalAttendance), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="p-6 text-gray-900 bg-gray-100 min-h-screen"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Greeting Section */}
      <motion.h1
        className="text-3xl font-bold mb-4 text-gray-800"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {greeting}, Student! 🎓
      </motion.h1>

      {/* Top Section: Overall Attendance + Messages */}
      <div className="grid grid-cols-3 gap-6">
        {/* Overall Attendance Box */}
        <motion.div
          className="bg-white rounded-lg p-6 flex flex-col items-center col-span-2 shadow-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold mb-4">Overall Attendance</h2>
          <motion.div
            className="w-40 h-40"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                textColor: "#111",
                pathColor: "#4CAF50",
                trailColor: "#ddd",
                strokeLinecap: "round",
                pathTransitionDuration: 1.2,
              })}
            />
          </motion.div>
        </motion.div>

        {/* Alerts & Messages */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 col-span-1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold mb-4">Messages & Alerts</h2>
          <motion.ul className="space-y-2 text-sm">
            {["📌 Upcoming exam on Monday!", "🔔 Attendance below 75% in English", "✅ Assignment submission due tomorrow"].map((msg, index) => (
              <motion.li
                key={index}
                className="bg-gray-200 p-2 rounded cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
              >
                {msg}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Bottom Section: Subject Attendance (Each subject has its own BG) */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-lg font-semibold mb-4">Subject Attendance</h2>
        <div className="grid grid-cols-5 gap-4">
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
            >
              {/* Left: Percentage Box */}
              <motion.div
                className="bg-green-100 text-green-600 p-4 rounded-lg w-16 h-16 flex items-center justify-center font-bold text-lg shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                {subject.attendance}%
              </motion.div>

              {/* Right: Subject Name */}
              <motion.div
                className="text-gray-800 px-4 py-2 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {subject.name}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StudentDashboard;
