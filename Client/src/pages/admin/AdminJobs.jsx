import { useCallback, useEffect, useState } from "react";
import { adminRequest } from "../../api.js";

const emptyJob = {
  title: "",
  description: "",
  experience: "",
  skills: "",
  displayColor: "info",
  isActive: true,
};

function AdminJobs() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyJob);
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    adminRequest("/api/admin/jobs")
      .then((payload) => {
        setItems(payload.data || []);
        setError("");
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(job) {
    setEditingId(job._id);
    setForm({
      title: job.title || "",
      description: job.description || "",
      experience: job.experience || "",
      skills: job.skills || "",
      displayColor: job.displayColor || "info",
      isActive: job.isActive !== false,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await adminRequest(`/api/admin/jobs/${editingId}`, {
          method: "PUT",
          body: form,
        });
      } else {
        await adminRequest("/api/admin/jobs", {
          method: "POST",
          body: form,
        });
      }
      setForm(emptyJob);
      setEditingId("");
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete this job?")) return;
    try {
      await adminRequest(`/api/admin/jobs/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1 className="h3 fw-bold mb-4">Jobs</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="card border-0 shadow-sm p-3 mb-4" onSubmit={handleSubmit}>
        <h2 className="h6 fw-bold">{editingId ? "Edit job" : "Add job"}</h2>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Experience"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={form.displayColor}
              onChange={(e) =>
                setForm({ ...form, displayColor: e.target.value })
              }
            >
              {["info", "success", "warning", "danger", "primary", "secondary"].map(
                (color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ),
              )}
            </select>
          </div>
          <div className="col-12">
            <input
              className="form-control"
              placeholder="Skills"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              placeholder="Description"
              rows="3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            ></textarea>
          </div>
        </div>
        <div className="form-check mt-3">
          <input
            id="job-active"
            type="checkbox"
            className="form-check-input"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="job-active">
            Active
          </label>
        </div>
        <button className="btn btn-dark mt-3" disabled={saving}>
          {saving ? "Saving..." : editingId ? "Update job" : "Create job"}
        </button>
      </form>

      <div className="table-responsive">
        <table className="table table-sm bg-white">
          <thead>
            <tr>
              <th>Title</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.isActive ? "Yes" : "No"}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => startEdit(job)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => remove(job._id)}
                  >
                    Delete
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

export default AdminJobs;
