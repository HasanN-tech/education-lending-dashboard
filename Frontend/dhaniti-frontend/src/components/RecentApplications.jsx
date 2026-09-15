import { Link } from "react-router-dom";
import { displayValue } from "../utils/dataQuality";

function money(value) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(
        Number(value || 0)
    );
}

function statusClass(status = "") {

    return `status-pill ${
        status
            .toLowerCase()
            .replace(/\s+/g, "-")
    }`;
}

function RecentApplications({
    applications
}) {

    const recent =
        [...applications]
            .sort(
                (a, b) =>
                    String(
                        b.applicationDate || ""
                    ).localeCompare(
                        String(
                            a.applicationDate || ""
                        )
                    )
            )
            .slice(0, 6);

    return (

        <div className="panel recent-panel">

            <div className="panel-heading">

                <div>

                    <h3>
                        Recent Applications
                    </h3>

                    <p>
                        Latest applications entering the pipeline
                    </p>

                </div>

                <Link
                    className="text-link"
                    to="/applications"
                >
                    View all →
                </Link>

            </div>

            {recent.length === 0 ? (

                <div className="empty-state">

                    <div className="empty-icon">
                        ⌁
                    </div>

                    <h4>
                        No applications loaded
                    </h4>

                    <p>
                        Connect the Spring Boot API
                        and load the CSV data to
                        populate this view.
                    </p>

                </div>

            ) : (

                <div className="recent-list">

                    {recent.map((app) => (

                        <div
                            className="recent-row"
                            key={
                                app.id ||
                                app.applicationId
                            }
                        >

                            <div className="student-avatar">
                                {
                                    String(
                                        app.studentName || "?"
                                    ).charAt(0)
                                }
                            </div>

                            <div className="recent-main">

                                <strong>
                                    {
                                        displayValue(
                                            app.studentName
                                        )
                                    }
                                </strong>

                                <span>

                                    {
                                        displayValue(
                                            app.applicationId
                                        )
                                    }

                                    {" · "}

                                    {
                                        displayValue(
                                            app.courseName
                                        )
                                    }

                                </span>

                            </div>

                            <div className="recent-amount">

                                {
                                    money(
                                        app.loanAmountRequestedInr
                                    )
                                }

                            </div>

                            <span
                                className={
                                    statusClass(
                                        app.applicationStatus
                                    )
                                }
                            >

                                {
                                    displayValue(
                                        app.applicationStatus
                                    )
                                }

                            </span>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default RecentApplications;