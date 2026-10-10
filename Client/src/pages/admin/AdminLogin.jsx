import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest, getAdminToken, setAdminSession } from "../../api.js";
import "../../admin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (getAdminToken()) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const payload = await apiRequest("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      setAdminSession(payload.data.token, payload.data.admin);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Brand Header */}
        <div className="text-center mb-4">
          <Link
            to="/"
            className="d-inline-flex align-items-center gap-2 text-decoration-none"
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1.25rem",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.35)",
              }}
            >
              V
            </div>
            <span
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.5px",
              }}
            >
              Vjeera HR
            </span>
          </Link>
          <div className="mt-2 text-uppercase fw-bold text-muted" style={{ fontSize: "0.72rem", letterSpacing: "0.08em" }}>
            Administration Portal
          </div>
        </div>

        {/* Card */}
        <div
          className="bg-white p-4 p-sm-5 rounded-4 shadow-sm border"
          style={{ borderColor: "#e2e8f0" }}
        >
          <h1 className="h4 fw-bold text-dark mb-1">Welcome back</h1>
          <p className="text-muted small mb-4">
            Enter your admin credentials to access platform records.
          </p>

          {error && (
            <div className="alert alert-danger py-2 px-3 small mb-3 border-0" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="adm-label" htmlFor="admin-email">
                Admin Email <span className="adm-label-req">*</span>
              </label>
              <input
                id="admin-email"
                type="email"
                className="adm-input"
                placeholder="admin@vjeera.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="adm-label mb-0" htmlFor="admin-password">
                  Password <span className="adm-label-req">*</span>
                </label>
              </div>
              <div className="input-group">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  className="adm-input"
                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  className="btn btn-outline-secondary px-3"
                  type="button"
                  style={{
                    borderColor: "#e2e8f0",
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                    fontSize: "0.82rem",
                  }}
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="adm-btn adm-btn-primary w-100 py-2"
              style={{ fontSize: "0.95rem" }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-4">
          <Link
            className="text-decoration-none text-muted small fw-medium"
            to="/"
          >
            &larr; Back to Vjeera HR public website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
