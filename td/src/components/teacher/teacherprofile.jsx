import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserEdit } from "react-icons/fa";

const TeacherProfile = () => {
  const [student, setStudent] = useState({
    name: "John Doe",
    rollNo: "GLA123456",
    email: "john.doe@student.gla.ac.in",
    phone: "+91 9876543210",
    branch: "Computer Science",
    semester: "4th Semester",
    enrollmentYear: "2022",
    cgpa: "8.7",
    dob: "10th March 2004",
    address: "Sector 14, Noida, India",
    guardian: "Mr. David Doe",
    guardianPhone: "+91 8765432109",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState(student);

  const handleChange = (e) => {
    setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setStudent(updatedDetails);
    setIsEditing(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🔹 Enlarged Cover Image */}
      <motion.div
        className="relative w-full h-50 bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg flex justify-center "
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-white text-xl font-bold mt-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Student Profile
        </motion.h2>
      </motion.div>

      {/* 🔹 Profile Container (Slight Overlap) */}
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl -mt-14 relative z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center">
          {/* Profile Picture (Floating Higher) */}
          <motion.img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md border-4 border-white -mt-16 bg-gray-200"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Student Name & Roll No */}
          <motion.h2
            className="text-lg font-semibold mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {student.name}
          </motion.h2>
          <p className="text-gray-500 text-sm">{student.rollNo}</p>
        </div>

        {/* Profile Details */}
        <motion.div
          className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {["email", "phone", "dob", "branch", "semester", "enrollmentYear", "cgpa", "address", "guardian", "guardianPhone"].map(
            (field) => (
              <motion.div
                key={field}
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-gray-600 text-xs font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={isEditing ? updatedDetails[field] : student[field]}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-purple-400 transition"
                  readOnly={!isEditing}
                />
              </motion.div>
            )
          )}
        </motion.div>

        {/* Edit & Save Buttons */}
        <div className="mt-4 text-center">
          {isEditing ? (
            <motion.button
              className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition text-sm"
              onClick={handleSave}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              Save Changes
            </motion.button>
          ) : (
            <motion.button
              className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 hover:bg-blue-600 transition text-sm mx-auto"
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <FaUserEdit size={14} /> Edit Profile
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeacherProfile;
