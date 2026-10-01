import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="bg-info text-center py-3">
        <h4 className="mb-1 fw-bold">Vjeera HR</h4>
        <small className="text-dark-50">Professional HR Academy</small>
      </div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="mainNav"
          >
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <NavLink to="/" end className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about-us" className="nav-link">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/services" className="nav-link">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/courses" className="nav-link">
                  Courses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/career" className="nav-link">
                  Career
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/corporate" className="nav-link">
                  Corporate
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/our-client" className="nav-link">
                  Our Client
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
