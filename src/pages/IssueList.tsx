import { useEffect, useState } from "react";
import { getIssues } from "../components/IssueService";
import { Link } from "react-router-dom";

interface Issue {
  _id: string;
  issueType: string;
  location: string;
  status: string;
}

function IssueList() {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const data = await getIssues();
      setIssues(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="section">
      <div className="header text-center">
        <h1>City Issues</h1>
      </div>

      <div className="container mt-4">
        <div className="row">
          {issues.map((issue) => (
            <div className="col-md-4 mb-4" key={issue._id}>
              <div className="project-card">
                <h5>{issue.issueType}</h5>
                <p><strong>Location:</strong> {issue.location}</p>
                <p><strong>Status:</strong> {issue.status}</p>

                <Link to={`/issues/${issue._id}`} className="btn mt-2 w-100">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IssueList;