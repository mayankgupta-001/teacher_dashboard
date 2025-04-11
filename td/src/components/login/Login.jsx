import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const credentialsList = {
  teacher: { id: "teacher123", password: "teachpass" },
  student: { id: "student123", password: "studypass" },
};

const Login = () => {
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [userType, setUserType] = useState("teacher");
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captchaText = "";
    for (let i = 0; i < 5; i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captchaText);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userCaptcha !== captcha) {
      setCaptchaError("Incorrect CAPTCHA. Try again.");
      generateCaptcha();
      return;
    }

    const validUser = credentialsList[userType];
    if (credentials.id === validUser.id && credentials.password === validUser.password) {
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("userType", userType);
      navigate(userType === "teacher" ? "/teacher" : "/student");
    } else {
      setError("Invalid ID or Password!");
    }
  };

  const closePopup = () => {
    setTimeout(() => {
      setShowForm(false);
      setError("");
      setUserCaptcha("");
      setCaptchaError("");
      generateCaptcha();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-500 flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 bg-blue-900 text-white flex justify-between items-center shadow-md">
        <div className="text-3xl font-bold">Skytalk</div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-white text-blue-900 font-semibold px-5 py-2 rounded-full hover:bg-sky-100 transition duration-200"
        >
          Login
        </button>
      </nav>

      {/* Main Landing Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-6"
        >
          Welcome to Skytalk
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-900 font-bold px-8 py-3 rounded-full shadow-lg"
          onClick={() => setShowForm(true)}
        >
          Click here to login
        </motion.button>
      </main>

      {/* Login Popup Box */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white shadow-xl rounded-xl overflow-hidden w-[90%] max-w-3xl flex"
            >
              {/* Left Side */}
              <div className="w-1/2 bg-blue-900 text-white flex flex-col items-center justify-center p-6 space-y-6">
                <div className="text-xl font-semibold">Select User</div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setUserType("teacher")}
                    className={`px-4 py-2 rounded-full font-medium ${
                      userType === "teacher" ? "bg-white text-blue-900" : "border border-white"
                    }`}
                  >
                    Teacher
                  </button>
                  <button
                    onClick={() => setUserType("student")}
                    className={`px-4 py-2 rounded-full font-medium ${
                      userType === "student" ? "bg-white text-blue-900" : "border border-white"
                    }`}
                  >
                    Student
                  </button>
                </div>
                <div className="mt-4 space-x-4 flex text-white text-xl">
                  <FaFacebook className="hover:text-sky-300 cursor-pointer" />
                  <FaTwitter className="hover:text-sky-300 cursor-pointer" />
                  <FaInstagram className="hover:text-sky-300 cursor-pointer" />
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-1/2 bg-white p-8 relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 text-2xl"
                  onClick={closePopup}
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Login to Skytalk</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="id"
                    placeholder="Enter ID"
                    value={credentials.id}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      value={credentials.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <span
                      className="absolute top-2.5 right-3 text-xl text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                  </div>

                  {/* CAPTCHA Box */}
                  <div className="flex items-center justify-between">
                    <div className="bg-gray-100 px-4 py-2 font-mono text-lg tracking-widest rounded border border-gray-300">
                      {captcha}
                    </div>
                    <span
                      className="text-blue-700 text-sm cursor-pointer ml-4"
                      onClick={generateCaptcha}
                    >
                      Refresh
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter CAPTCHA"
                    value={userCaptcha}
                    onChange={(e) => setUserCaptcha(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {captchaError && (
                    <p className="text-red-500 text-sm">{captchaError}</p>
                  )}
                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    className="w-full bg-blue-700 text-white font-semibold py-2 rounded-md hover:bg-blue-800 transition duration-200"
                  >
                    Login
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
