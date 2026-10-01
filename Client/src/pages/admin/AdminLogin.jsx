import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest, getAdminToken, setAdminSession } from "../../api.js";

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
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container" style={{ maxWidth: "420px" }}>
        <div className="admin-login-panel">
          <Link className="admin-login-brand" to="/">
            <span className="brand-mark" aria-hidden="true">
              V
            </span>
            <span className="brand-name">Vjeera HR</span>
          </Link>
          <p className="eyebrow mt-4 mb-2">Administration</p>
          <h1 className="h3 fw-bold mb-3">Admin Login</h1>
          <p className="text-muted mb-4">
            Sign in to manage enquiries, courses and opportunities.
          </p>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="admin-password">
                Password
              </label>
              <div className="input-group">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-cta w-100"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in to dashboard"}
            </button>
          </form>
          <Link className="d-inline-block mt-4" to="/">
            ← Back to Vjeera HR
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
