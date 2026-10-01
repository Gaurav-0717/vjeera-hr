import { useCallback, useEffect, useState } from "react";
import { adminRequest } from "../../api.js";

const emptyCourse = {
  title: "",
  description: "",
  batchStart: "",
  batchTime: "",
  isActive: true,
};

function AdminCourses() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyCourse);
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    return adminRequest("/api/admin/courses")
      .then((payload) => {
        setItems(payload.data || []);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(course) {
    setEditingId(course._id);
    setForm({
      title: course.title || "",
      description: course.description || "",
      batchStart: course.batchStart || "",
      batchTime: course.batchTime || "",
      isActive: course.isActive !== false,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      if (editingId) {
        await adminRequest(`/api/admin/courses/${editingId}`, {
          method: "PUT",
          body: form,
        });
      } else {
        await adminRequest("/api/admin/courses", {
          method: "POST",
          body: form,
        });
      }
      setForm(emptyCourse);
      setEditingId("");
      await load();
      setNotice(editingId ? "Course updated." : "Course created.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete this course?")) return;
    setDeletingId(id);
    setError("");
    setNotice("");
    try {
      await adminRequest(`/api/admin/courses/${id}`, { method: "DELETE" });
      await load();
      setNotice("Course deleted.");
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId("");
    }
  }

  return (
    <div>
      <h1 className="h3 fw-bold mb-4">Courses</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {notice && (
        <div className="alert alert-success" role="status">
          {notice}
        </div>
      )}
      <form className="admin-form mb-4" onSubmit={handleSubmit}>
        <h2 className="h6 fw-bold">
          {editingId ? "Edit course" : "Add course"}
        </h2>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              aria-label="Course title"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              aria-label="Batch start"
              placeholder="Batch start"
              value={form.batchStart}
              onChange={(e) => setForm({ ...form, batchStart: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              aria-label="Batch time"
              placeholder="Batch time"
              value={form.batchTime}
              onChange={(e) => setForm({ ...form, batchTime: e.target.value })}
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              aria-label="Course description"
              placeholder="Description"
              rows="2"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>
        <div className="form-check mt-3">
          <input
            id="course-active"
            type="checkbox"
            className="form-check-input"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="course-active">
            Active
          </label>
        </div>
        <button className="btn btn-dark mt-3" disabled={saving}>
          {saving ? "Saving..." : editingId ? "Update course" : "Create course"}
        </button>
      </form>

      {loading ? (
        <p role="status">Loading courses...</p>
      ) : (
        <div className="table-responsive admin-table-wrap">
          <table className="table table-sm bg-white">
            <thead>
              <tr>
                <th>Title</th>
                <th>Batch</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-muted">
                    No courses yet. Add a course above to publish one.
                  </td>
                </tr>
              )}
              {items.map((course) => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.batchStart}</td>
                  <td>{course.isActive ? "Yes" : "No"}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => startEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => remove(course._id)}
                      disabled={deletingId === course._id}
                    >
                      {deletingId === course._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminCourses;
