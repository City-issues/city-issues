import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/NavBar";
import About from "./components/About";
import IssueList from "./pages/IssueList";
import IssueDetails from "./pages/IssueDetails";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import ReportIssuesForm from "./components/ReportIssuesForm";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />

      <div className="container mt-4">
        <h1 className="text-center mb-4">City Issue Reporting System</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <About />
                <ReportIssuesForm />
                <IssueList />
              </>
            }
          />

          <Route path="/issues/:id" element={<IssueDetails />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;