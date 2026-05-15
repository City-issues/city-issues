import { useEffect, useState } from "react";

type Contact = {
    _id: string;
    issueType: string,
    location: string,
    description: string;
    status?: string;
};

const Admin = () => {
    const [data, setData] = useState<Contact[]>([]);


    useEffect(() => {
    fetch("http://localhost:5000/issues")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);


  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);


  const handleLogin = () => {
    if (password === "admin123") {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };


  if (!authenticated) {
    return (
      <div className="container mt-5 text-center">
        <h2>Admin Login</h2>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-dark" onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  }

  const deleteIssue = async (id: string) => {
  try {
    await fetch(`http://localhost:5000/issues/${id}`, {
      method: "DELETE",
     
    });

    setData(data.filter((item) => item._id !== id));
  } catch (error) {
    console.error(error);
  }
};

const updateIssue = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:5000/issues/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), // no need to send fields
    });

    const updated = await res.json();

    setData(
      data.map((item) =>
        item._id === id ? updated : item
      )
    );
  } catch (error) {
    console.error(error);
  }
};

return (
     <div className="container mt-5">
      <h2>Admin Dashboard</h2>


      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Issue Type</th>
            <th>Location</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>


        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.issueType}</td>
              <td>{item.location}</td>
              <td>{item.description}</td>
              <td>{item.status || "pending"}</td>

        <td>
          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => updateIssue(item._id)}
          >
            Resolved
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteIssue(item._id)}
          >
            Delete
          </button>
        </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Admin;