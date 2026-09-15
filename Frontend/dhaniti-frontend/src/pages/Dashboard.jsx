import {
    useEffect,
    useMemo,
    useState
} from "react";

import StatCard from "../components/StatCard";
import StatusChart from "../components/StatusChart";
import LoanChart from "../components/LoanChart";
import RecentApplications from "../components/RecentApplications";

import {
    getAllApplications
} from "../services/applicationService";

function money(value) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(value);
}

function Dashboard() {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



    async function loadData() {

        try {

            setLoading(true);
            setError("");

            const data =
                await getAllApplications();

            setApplications(data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to reach the Spring Boot API."
            );

        } finally {

            setLoading(false);
        }
    }



    useEffect(() => {

        loadData();

    }, []);



    const metrics = useMemo(() => {

        const status = {};



        applications.forEach(
            (application) => {

                const currentStatus =
                    application.applicationStatus ||
                    "Unknown";

                status[currentStatus] =
                    (status[currentStatus] || 0) + 1;
            }
        );



        const approved =
            status["Approved"] || 0;



        const review =
            status["Under Review"] || 0;



        const rejected =
            status["Rejected"] || 0;



        const totalLoan =
            applications.reduce(
                (sum, application) => {

                    return (
                        sum +
                        Number(
                            application.loanAmountRequestedInr ??
                            application.loanAmount ??
                            0
                        )
                    );
                },
                0
            );



        return {

            status,
            approved,
            review,
            rejected,
            totalLoan
        };

    }, [applications]);



    if (loading) {

        return (
            <div className="page">
                <h2>Loading Dashboard...</h2>
            </div>
        );
    }



    return (

        <div className="page">

            {/* Header */}

            <header className="page-header">

                <div>

                    <div className="eyebrow">
                        OVERVIEW · EDUCATION LENDING
                    </div>

                    <h1>
                        Good Morning, Admin
                        <span className="wave">
                            ✦
                        </span>
                    </h1>

                    <p>
                        Here's what's happening across
                        your education-loan portfolio.
                    </p>

                </div>



                <button
                    className="refresh-btn"
                    onClick={loadData}
                    disabled={loading}
                >

                    ↻ {loading
                        ? "Refreshing..."
                        : "Refresh Data"}

                </button>

            </header>



            {/* Error Message */}

            {error && (

                <div className="api-alert">

                    <div>

                        <strong>
                            Backend connection needed
                        </strong>

                        <span>
                            {error}
                            {" "}
                            Make sure Spring Boot is
                            running on port 8080.
                        </span>

                    </div>

                    <button
                        onClick={loadData}
                    >
                        Retry
                    </button>

                </div>
            )}



            {/* Summary Cards */}

            <section className="stats-grid">

                <StatCard
                    title="Total Applications"
                    value={applications.length}
                    caption="All submitted records"
                    icon="▦"
                    tone="blue"
                />

                <StatCard
                    title="Approved"
                    value={metrics.approved}
                    caption="Ready for disbursement"
                    icon="✓"
                    tone="green"
                />

                <StatCard
                    title="Under Review"
                    value={metrics.review}
                    caption="Needs assessment"
                    icon="◷"
                    tone="amber"
                />

                <StatCard
                    title="Rejected"
                    value={metrics.rejected}
                    caption="Not approved"
                    icon="×"
                    tone="red"
                />



                <div className="loan-summary">

                    <span>
                        Total Loan Requested
                    </span>

                    <strong>
                        {money(
                            metrics.totalLoan
                        )}
                    </strong>

                    <small>
                        Across all applications
                    </small>

                </div>

            </section>



            {/* Charts */}

            <section className="dashboard-grid">

                <StatusChart
                    data={metrics.status}
                />

                <LoanChart
                    applications={applications}
                />

            </section>



            {/* Recent Applications */}

            <RecentApplications
                applications={applications}
            />

        </div>
    );
}

export default Dashboard;