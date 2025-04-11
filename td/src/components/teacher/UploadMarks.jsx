import { useState } from "react";

// Sample student records for different classes
const studentRecords = {
  "B.Tech CSE 2nd Year - Math": ["Alice", "Bob", "Charlie"],
  "B.Tech ECE 3rd Year - Math": ["David", "Eve"],
  "B.Tech ME 1st Year - Math": ["Frank", "Grace"],
};

const UploadMarks = () => {
  const [selectedClass, setSelectedClass] = useState(Object.keys(studentRecords)[0]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [marks, setMarks] = useState({ subject: "", score: "" });

  // Handle class selection change
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedStudent(""); // Reset student selection
  };

  // Handle student selection change
  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  // Handle input changes
  const handleChange = (e) => {
    setMarks({ ...marks, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent || !marks.subject || !marks.score) {
      alert("Please fill all fields");
      return;
    }
    alert(`Marks submitted for ${selectedStudent} in ${marks.subject}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Upload Student Marks</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        
        {/* Class Selection Dropdown */}
        <label className="font-semibold">Select Class:</label>
        <select
          className="p-2 border rounded w-full"
          value={selectedClass}
          onChange={handleClassChange}
        >
          {Object.keys(studentRecords).map((className, index) => (
            <option key={index} value={className}>
              {className}
            </option>
          ))}
        </select>

        {/* Student Selection Dropdown */}
        <label className="font-semibold">Select Student:</label>
        <select
          className="p-2 border rounded w-full"
          value={selectedStudent}
          onChange={handleStudentChange}
        >
          <option value="">-- Select Student --</option>
          {studentRecords[selectedClass]?.map((student, index) => (
            <option key={index} value={student}>
              {student}
            </option>
          ))}
        </select>

        {/* Subject Input */}
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="p-2 border rounded w-full"
          onChange={handleChange}
        />

        {/* Marks Input */}
        <input
          type="number"
          name="score"
          placeholder="Marks"
          className="p-2 border rounded w-full"
          onChange={handleChange}
        />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadMarks;
