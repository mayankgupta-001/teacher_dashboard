import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const FloatingRobot = () => {
  const location = useLocation();

  // Hide Robot on certain pages (Optional)
  const hiddenRoutes = ["/login", "/register"];
  if (hiddenRoutes.includes(location.pathname)) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.1, rotate: 10, boxShadow: "0px 5px 15px rgba(0, 0, 255, 0.5)" }}
    >
      <FaRobot className="text-3xl" />
    </motion.div>
  );
};

export default FloatingRobot;
