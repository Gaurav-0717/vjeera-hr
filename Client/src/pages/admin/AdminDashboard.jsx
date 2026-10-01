import { useEffect, useState } from "react";
import { adminRequest } from "../../api.js";

function StatCard({ label, value, color }) {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className={`card border-0 shadow-sm border-top border-4 border-${color}`}>
        <div className="card-body">
          <p className="text-muted small mb-1">{label}</p>
          <p className="h3 fw-bold mb-0">{value}</p>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminRequest("/api/admin/dashboard")
      .then((payload) => {
        setStats(payload.data);
        setError("");
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!stats) {
    return <p>Loading dashboard...</p>;
  }

  const statusEntries = Object.entries(stats.applicationsByStatus || {});

  return (
    <div>
      <h1 className="h3 fw-bold mb-4">Overview</h1>
      <div className="row g-3 mb-4">
        <StatCard label="Total contacts" value={stats.totalContacts} color="info" />
        <StatCard label="New contacts" value={stats.newContacts} color="warning" />
        <StatCard
          label="Enrollments"
          value={stats.totalEnrollments}
          color="primary"
        />
        <StatCard
          label="Applications"
          value={stats.totalApplications}
          color="success"
        />
        <StatCard
          label="Corporate enquiries"
          value={stats.corporateEnquiries}
          color="danger"
        />
        <StatCard label="Jobs" value={stats.jobs} color="secondary" />
        <StatCard label="Courses" value={stats.courses} color="info" />
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h2 className="h5 fw-bold mb-3">Applications by status</h2>
          {statusEntries.length === 0 ? (
            <p className="mb-0 text-muted">No applications yet.</p>
          ) : (
            <ul className="list-group">
              {statusEntries.map(([status, count]) => (
                <li
                  key={status}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span className="text-capitalize">{status}</span>
                  <strong>{count}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
