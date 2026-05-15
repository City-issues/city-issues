import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getIssueById } from "../components/IssueService";

interface Issue {
  _id: string;
  issueType: string;
  location: string;
  description: string;
  status: string;
}

function IssueDetails() {
  const { id } = useParams();
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    if (id) fetchIssue(id);
  }, [id]);

  const fetchIssue = async (id: string) => {
    try {
      const data = await getIssueById(id);
      setIssue(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!issue) return <div className="section">Loading...</div>;

  return (
    <div className="section">
      <div className="header text-center">
        <h1>Issue Details</h1>
      </div>

      <div className="about-card">
        <div className="about-text">
          <p><strong>Type:</strong> {issue.issueType}</p>
          <p><strong>Location:</strong> {issue.location}</p>
          <p><strong>Description:</strong> {issue.description}</p>
          <p><strong>Status:</strong> {issue.status}</p>

          <Link to="/" className="btn mt-3">
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IssueDetails;