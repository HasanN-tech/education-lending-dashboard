import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <aside className="sidebar">

            {/* Brand */}
            <div className="brand">
                <div className="brand-mark">
                    D
                </div>

                <div>
                    <div className="brand-name">
                        DHANITI
                    </div>

                    <div className="brand-subtitle">
                        Fintech Intelligence
                    </div>
                </div>
            </div>


            {/* Navigation heading */}
            <div className="sidebar-section-label">
                WORKSPACE
            </div>


            {/* Navigation */}
            <nav className="nav-list">

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <span className="nav-icon">
                        ⌂
                    </span>

                    Dashboard
                </NavLink>


                <NavLink
                    to="/applications"
                    className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                    }
                >
                    <span className="nav-icon">
                        ▦
                    </span>

                    Applications
                </NavLink>

            </nav>


            {/* Bottom section */}
            <div className="sidebar-bottom">

                <div className="mini-card">

                    <div className="mini-icon">
                        ✦
                    </div>

                    <div>
                        <strong>
                            Loan Intelligence
                        </strong>

                        <span>
                            Make better lending decisions.
                        </span>
                    </div>

                </div>


                <div className="user-chip">

                    <div className="avatar">
                        A
                    </div>

                    <div>
                        <strong>
                            Admin
                        </strong>

                        <span>
                            Analyst workspace
                        </span>
                    </div>

                    <span className="status-dot"></span>

                </div>

            </div>

        </aside>
    );
}

export default Navbar;