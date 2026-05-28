import  { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://breathe-esg-backend-241q.onrender.com";

function App() {
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchRecords();
  }, []);

  // FETCH RECORDS
  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/records/`);
      setRecords(response.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${BASE_URL}/api/update/${id}/`, {
        status: status,
      });

      fetchRecords();
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  // UPLOAD FILE
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${BASE_URL}/api/upload/`, formData);

      alert("File uploaded successfully");
      fetchRecords();
    } catch (error) {
      console.log("Upload error:", error);
      alert("Upload failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #0f172a, #111827)",
        padding: "50px",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div>
          <h1 style={{ color: "white", fontSize: "44px", margin: 0 }}>
            ESG Governance Dashboard
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "10px" }}>
            Sustainability Reporting & Compliance Management
          </p>
        </div>

        <div
          style={{
            background: "linear-gradient(to right, #2563eb, #0ea5e9)",
            padding: "12px 20px",
            borderRadius: "14px",
          }}
        >
          <span style={{ color: "white", fontWeight: "800" }}>
            BREATHE ESG
          </span>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle}>
          <p style={labelStyle}>Total Records</p>
          <h2 style={valueStyle}>{records.length}</h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Approved</p>
          <h2 style={{ ...valueStyle, color: "#22c55e" }}>
            {records.filter((r) => r.status === "approved").length}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Rejected</p>
          <h2 style={{ ...valueStyle, color: "#ef4444" }}>
            {records.filter((r) => r.status === "rejected").length}
          </h2>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div style={tableContainer}>
        <div style={tableHeader}>
          <h2 style={{ color: "white" }}>ESG Records</h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={fileInput}
            />

            <button onClick={handleUpload} style={uploadBtn}>
              Upload
            </button>
          </div>
        </div>

        <table style={{ width: "100%", color: "white" }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#94a3b8" }}>
              <th>Company</th>
              <th>Metric</th>
              <th>Value</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.company_name}</td>

                <td>
                  <span style={badgeStyle}>
                    {record.metric}
                  </span>
                </td>

                <td>{record.value}</td>

                <td>{record.status}</td>

                <td>
                  <button
                    onClick={() => updateStatus(record.id, "approved")}
                    style={approveBtn}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(record.id, "rejected")}
                    style={rejectBtn}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* styles */
const cardStyle = {
  flex: 1,
  background: "#111827",
  padding: "20px",
  borderRadius: "15px",
};

const labelStyle = { color: "#94a3b8" };
const valueStyle = { color: "white", fontSize: "28px" };

const tableContainer = {
  background: "#111827",
  padding: "25px",
  borderRadius: "15px",
};

const tableHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const fileInput = {
  color: "white",
};

const uploadBtn = {
  background: "#2563eb",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
};

const badgeStyle = {
  background: "#1e3a8a",
  padding: "5px 10px",
  borderRadius: "8px",
};

const approveBtn = {
  background: "green",
  color: "white",
  marginRight: "10px",
  border: "none",
  padding: "5px 10px",
};

const rejectBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
};

export default App;