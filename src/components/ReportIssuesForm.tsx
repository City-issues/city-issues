import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";

const ReportIssueForm = () => {
  // State: dito natin tinatago yung input values ng user
  const [issueType, setIssueType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  //vite meta


  // Validation function
  const validateForm = () => {
    if (!issueType || !location || !description) {
      alert("Please fill out all fields!");
      return false;
    }
    return true;
  };

  // Handle submit (POST request)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // para di mag refresh

    if (!validateForm()) return;

    // Object na ipapadala sa API
    const newReport = {
      issueType,
      location,
      description,
      status: "pending", // default status
    };

    try {
      // POST request papunta sa backend
      await axios.post("http://localhost:5000/issues", newReport);
      
      const result = await emailjs.send(
        "service_c99ssu4",
        "template_8s8hw0y",
        {
          issueType:issueType,
          location: location,
          description: description,
          status:"pending",
        },
        "eAKYrW2MRjRj5bAbm"
      
      );

      console.log(result);

      alert("Report submitted successfully!");

      // 🧹 Clear form after submit
      setIssueType("");
      setLocation("");
      setDescription("");

    } catch (error) {
      console.error(error);
      alert("Error submitting report");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Report an Issue</h2>

      <form onSubmit={handleSubmit}>
        
        {/* Issue Type */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Issue Type (e.g. Pothole, Garbage)"
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
        />

        {/* Location */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportIssueForm;

