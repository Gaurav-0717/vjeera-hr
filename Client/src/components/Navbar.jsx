import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearAdminSession, getAdminToken } from "../api.js";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = Boolean(getAdminToken());
  const navigate = useNavigate();

  function closeMenu() {
    setMenuOpen(false);
  }

  function logout() {
    clearAdminSession();
    closeMenu();
    navigate("/", { replace: true });
  }

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark nav-strip">
        <div className="container">
          <Link className="navbar-brand site-brand" to="/" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">
              V
            </span>
            <span>
              <span className="brand-name d-block">Vjeera HR</span>
              <span className="brand-tagline d-block">
                People. Potential. Progress.
              </span>
            </span>
          </Link>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-controls="mainNav"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="mainNav"
          >
            <ul className="navbar-nav ms-lg-auto align-items-lg-center gap-lg-1">
              <li className="nav-item">
                <NavLink to="/" end className="nav-link" onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about-us"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/services"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/courses" className="nav-link" onClick={closeMenu}>
                  Courses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/career" className="nav-link" onClick={closeMenu}>
                  Career
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/corporate"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Corporate
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/our-client"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Our Client
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className="nav-admin-actions ms-lg-3">
              {isAdmin ? (
                <>
                  <Link
                    className="btn btn-sm btn-outline-light"
                    to="/admin/dashboard"
                    onClick={closeMenu}
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    className="btn btn-sm btn-link nav-logout"
                    type="button"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  className="btn btn-sm btn-admin-login"
                  to="/admin/login"
                  onClick={closeMenu}
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
