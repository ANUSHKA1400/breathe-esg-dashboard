// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchRecords();
  }, []);

  const fetchRecords = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/records/"
      );

      setRecords(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {

    try {

      await axios.patch(
        `http://127.0.0.1:8000/api/update/${id}/`,
        {
          status: status,
        }
      );

      fetchRecords();

    } catch (error) {
      console.log(error);
    }
  };
  const handleUpload = async () => {

  if (!file) {
    alert("Please select a file");
    return;
  }

  const formData = new FormData();

  formData.append("file", file);

  try {

    await axios.post(
      "http://127.0.0.1:8000/api/upload/",
      formData
    );

    alert("File uploaded successfully");

    fetchRecords();

  } catch (error) {

    console.log(error);

    alert("Upload failed");
  }
};
return (
  <div
    style={{
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #020617, #0f172a, #111827)",
      padding: "50px",
      fontFamily: "Inter, Arial, sans-serif"
    }}
  >

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "40px"
      }}
    >

      <div>

        <h1
          style={{
            color: "white",
            fontSize: "44px",
            margin: "0",
            fontWeight: "800",
            letterSpacing: "-1px"
          }}
        >
          ESG Governance Dashboard
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "12px",
            fontSize: "15px"
          }}
        >
          Sustainability Reporting & Compliance Management
        </p>

      </div>

      <div
        style={{
          background:
            "linear-gradient(to right, #2563eb, #0ea5e9)",
          padding: "12px 20px",
          borderRadius: "14px",
          boxShadow: "0 4px 15px rgba(37,99,235,0.3)"
        }}
      >

        <span
          style={{
            color: "white",
            fontWeight: "800",
            fontSize: "14px",
            letterSpacing: "1px"
          }}
        >
          BREATHE ESG
        </span>

      </div>

    </div>

    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px"
      }}
    >

      <div
        style={{
          flex: 1,
          backgroundColor: "#111827",
          padding: "22px",
          borderRadius: "18px",
          border: "1px solid #1e293b"
        }}
      >

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "10px",
            fontSize: "14px"
          }}
        >
          Total Records
        </p>

        <h2
          style={{
            color: "white",
            margin: "0",
            fontSize: "32px"
          }}
        >
          {records.length}
        </h2>

      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#111827",
          padding: "22px",
          borderRadius: "18px",
          border: "1px solid #1e293b"
        }}
      >

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "10px",
            fontSize: "14px"
          }}
        >
          Approved
        </p>

        <h2
          style={{
            color: "#22c55e",
            margin: "0",
            fontSize: "32px"
          }}
        >
          {
            records.filter(
              (record) => record.status === "approved"
            ).length
          }
        </h2>

      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#111827",
          padding: "22px",
          borderRadius: "18px",
          border: "1px solid #1e293b"
        }}
      >

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "10px",
            fontSize: "14px"
          }}
        >
          Rejected
        </p>

        <h2
          style={{
            color: "#ef4444",
            margin: "0",
            fontSize: "32px"
          }}
        >
          {
            records.filter(
              (record) => record.status === "rejected"
            ).length
          }
        </h2>

      </div>

    </div>

    <div
      style={{
        backgroundColor: "#111827",
        borderRadius: "22px",
        padding: "32px",
        border: "1px solid #1e293b",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >

        <div>

          <h2
            style={{
              color: "white",
              margin: "0",
              fontSize: "26px",
              fontWeight: "700"
            }}
          >
            ESG Records
          </h2>

          <p
            style={{
              color: "#64748b",
              marginTop: "10px",
              fontSize: "14px"
            }}
          >
            Upload, review and manage sustainability metrics
          </p>

        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center"
          }}
        >

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              backgroundColor: "#1e293b",
              color: "#cbd5e1",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #334155"
            }}
          />

          <button
            onClick={handleUpload}
            style={{
              background:
                "linear-gradient(to right, #2563eb, #0ea5e9)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "10px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "0.2s"
            }}
          >
            Upload File
          </button>

        </div>

      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr
            style={{
              borderBottom: "1px solid #1e293b"
            }}
          >

            <th
              style={{
                color: "#64748b",
                textAlign: "left",
                padding: "18px"
              }}
            >
              Company
            </th>

            <th
              style={{
                color: "#64748b",
                textAlign: "left",
                padding: "18px"
              }}
            >
              Metric
            </th>

            <th
              style={{
                color: "#64748b",
                textAlign: "left",
                padding: "18px"
              }}
            >
              Value
            </th>

            <th
              style={{
                color: "#64748b",
                textAlign: "left",
                padding: "18px"
              }}
            >
              Status
            </th>

            <th
              style={{
                color: "#64748b",
                textAlign: "left",
                padding: "18px"
              }}
            >
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {records.map((record) => (

            <tr
              key={record.id}
              style={{
                borderBottom: "1px solid #1e293b"
              }}
            >

              <td
                style={{
                  padding: "26px",
                  color: "white",
                  fontWeight: "800",
                  fontSize: "16px"
                }}
              >
                {record.company_name}
              </td>

              <td
                style={{
                  padding: "26px"
                }}
              >

                <span
                  style={{
                    backgroundColor: "#172554",
                    color: "#93c5fd",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    fontWeight: "700",
                    fontSize: "13px"
                  }}
                >
                  {record.metric}
                </span>

              </td>

              <td
                style={{
                  padding: "26px"
                }}
              >

                <span
                  style={{
                    backgroundColor: "#0f766e",
                    color: "white",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    fontWeight: "800"
                  }}
                >
                  {record.value}
                </span>

              </td>

              <td
                style={{
                  padding: "26px"
                }}
              >

                <span
                  style={{
                    backgroundColor:
                      record.status === "approved"
                        ? "#052e16"
                        : record.status === "rejected"
                        ? "#450a0a"
                        : "#422006",

                    color:
                      record.status === "approved"
                        ? "#4ade80"
                        : record.status === "rejected"
                        ? "#f87171"
                        : "#facc15",

                    padding: "10px 16px",
                    borderRadius: "999px",
                    fontWeight: "800",
                    fontSize: "12px",
                    letterSpacing: "1px"
                  }}
                >
                  {record.status.toUpperCase()}
                </span>

              </td>

              <td
                style={{
                  padding: "26px"
                }}
              >

                <button
                  onClick={() =>
                    updateStatus(record.id, "approved")
                  }
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "700",
                    transition: "0.2s"
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(record.id, "rejected")
                  }
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    marginLeft: "10px",
                    cursor: "pointer",
                    fontWeight: "700",
                    transition: "0.2s"
                  }}
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

export default App;