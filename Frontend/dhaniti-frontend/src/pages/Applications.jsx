import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    getAllApplications
} from "../services/applicationService";

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


function get(
    object,
    ...keys
) {

    for (const key of keys) {

        if (
            object?.[key] !== undefined &&
            object?.[key] !== null
        ) {

            return object[key];

        }
    }

    return "";
}


function statusClass(
    status = ""
) {

    return `status-pill ${
        status
            .toLowerCase()
            .replace(/\s+/g, "-")
    }`;
}


function Applications() {

    const [
        applications,
        setApplications
    ] = useState([]);


    const [
        search,
        setSearch
    ] = useState("");


    const [
        status,
        setStatus
    ] = useState("All");


    const [
        course,
        setCourse
    ] = useState("All");


    const [
        institution,
        setInstitution
    ] = useState("All");


    const [
        sort,
        setSort
    ] = useState("newest");


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


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
                "Could not load applications from Spring Boot."
            );

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {

        loadData();

    }, []);


    const options =
        useMemo(() => {

            return {

                statuses: [
                    ...new Set(
                        applications
                            .map(
                                a =>
                                    get(
                                        a,
                                        "applicationStatus",
                                        "status"
                                    )
                            )
                            .filter(Boolean)
                    )
                ],

                courses: [
                    ...new Set(
                        applications
                            .map(
                                a =>
                                    get(
                                        a,
                                        "courseName",
                                        "course"
                                    )
                            )
                            .filter(Boolean)
                    )
                ].sort(),

                institutions: [
                    ...new Set(
                        applications
                            .map(
                                a =>
                                    get(
                                        a,
                                        "institutionName",
                                        "institution"
                                    )
                            )
                            .filter(Boolean)
                    )
                ].sort()

            };

        }, [applications]);


    const filtered =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();


            const result =
                applications.filter(
                    (application) => {

                        const id =
                            String(
                                get(
                                    application,
                                    "applicationId",
                                    "id"
                                )
                            ).toLowerCase();


                        const name =
                            String(
                                get(
                                    application,
                                    "studentName",
                                    "name"
                                )
                            ).toLowerCase();


                        const appStatus =
                            get(
                                application,
                                "applicationStatus",
                                "status"
                            );


                        const appCourse =
                            get(
                                application,
                                "courseName",
                                "course"
                            );


                        const appInstitution =
                            get(
                                application,
                                "institutionName",
                                "institution"
                            );


                        return (

                            (!query ||
                                id.includes(query) ||
                                name.includes(query))

                            &&

                            (
                                status === "All" ||
                                appStatus === status
                            )

                            &&

                            (
                                course === "All" ||
                                appCourse === course
                            )

                            &&

                            (
                                institution === "All" ||
                                appInstitution === institution
                            )

                        );

                    }
                );


            return result.sort(
                (a, b) => {

                    if (
                        sort === "loanHigh"
                    ) {

                        return (
                            Number(
                                get(
                                    b,
                                    "loanAmountRequestedInr",
                                    "loanAmount"
                                )
                            )
                            -
                            Number(
                                get(
                                    a,
                                    "loanAmountRequestedInr",
                                    "loanAmount"
                                )
                            )
                        );

                    }


                    if (
                        sort === "loanLow"
                    ) {

                        return (
                            Number(
                                get(
                                    a,
                                    "loanAmountRequestedInr",
                                    "loanAmount"
                                )
                            )
                            -
                            Number(
                                get(
                                    b,
                                    "loanAmountRequestedInr",
                                    "loanAmount"
                                )
                            )
                        );

                    }


                    if (
                        sort === "creditHigh"
                    ) {

                        return (
                            Number(
                                get(
                                    b,
                                    "creditScore"
                                )
                            )
                            -
                            Number(
                                get(
                                    a,
                                    "creditScore"
                                )
                            )
                        );

                    }


                    if (
                        sort === "creditLow"
                    ) {

                        return (
                            Number(
                                get(
                                    a,
                                    "creditScore"
                                )
                            )
                            -
                            Number(
                                get(
                                    b,
                                    "creditScore"
                                )
                            )
                        );

                    }


                    return String(
                        get(
                            b,
                            "applicationDate"
                        )
                    ).localeCompare(
                        String(
                            get(
                                a,
                                "applicationDate"
                            )
                        )
                    );

                }
            );

        }, [
            applications,
            search,
            status,
            course,
            institution,
            sort
        ]);


    return (

        <div className="page">

            <header className="page-header">

                <div>

                    <div className="eyebrow">
                        WORKSPACE · APPLICATION PIPELINE
                    </div>

                    <h1>
                        Applications
                    </h1>

                    <p>
                        Search, filter and review
                        education-loan applications.
                    </p>

                </div>


                <button
                    className="refresh-btn"
                    onClick={loadData}
                    disabled={loading}
                >
                    ↻ Refresh
                </button>

            </header>


            {/* Error */}

            {error && (

                <div className="api-alert">

                    <div>

                        <strong>
                            API unavailable
                        </strong>

                        <span>
                            {error}
                        </span>

                    </div>


                    <button
                        onClick={loadData}
                    >
                        Retry
                    </button>

                </div>

            )}


            {/* Filters */}

            <div className="toolbar">

                <div className="search-box">

                    <span>
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search application ID or student name..."
                        value={search}
                        onChange={
                            e =>
                                setSearch(
                                    e.target.value
                                )
                        }
                    />


                    {search && (

                        <button
                            onClick={() =>
                                setSearch("")
                            }
                        >
                            ×
                        </button>

                    )}

                </div>


                <select
                    value={status}
                    onChange={
                        e =>
                            setStatus(
                                e.target.value
                            )
                    }
                >

                    <option value="All">
                        All statuses
                    </option>

                    {options.statuses.map(
                        item => (

                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>

                        )
                    )}

                </select>


                <select
                    value={course}
                    onChange={
                        e =>
                            setCourse(
                                e.target.value
                            )
                    }
                >

                    <option value="All">
                        All courses
                    </option>

                    {options.courses.map(
                        item => (

                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>

                        )
                    )}

                </select>


                <select
                    value={institution}
                    onChange={
                        e =>
                            setInstitution(
                                e.target.value
                            )
                    }
                >

                    <option value="All">
                        All institutions
                    </option>

                    {options.institutions.map(
                        item => (

                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>

                        )
                    )}

                </select>


                <select
                    value={sort}
                    onChange={
                        e =>
                            setSort(
                                e.target.value
                            )
                    }
                >

                    <option value="newest">
                        Newest first
                    </option>

                    <option value="loanHigh">
                        Loan: high → low
                    </option>

                    <option value="loanLow">
                        Loan: low → high
                    </option>

                    <option value="creditHigh">
                        Credit: high → low
                    </option>

                    <option value="creditLow">
                        Credit: low → high
                    </option>

                </select>

            </div>


            {/* Results */}

            <div className="results-bar">

                <span>

                    <strong>
                        {filtered.length}
                    </strong>

                    {" "}of{" "}

                    {applications.length}

                    {" "}applications

                </span>


                {(search ||
                    status !== "All" ||
                    course !== "All" ||
                    institution !== "All") && (

                    <button
                        className="clear-btn"
                        onClick={() => {

                            setSearch("");

                            setStatus("All");

                            setCourse("All");

                            setInstitution("All");

                        }}
                    >
                        Clear filters
                    </button>

                )}

            </div>


            {/* Table */}

            <div className="table-panel">

                {loading ? (

                    <div className="loading-state">

                        <div className="spinner"></div>

                        <h3>
                            Loading applications...
                        </h3>

                        <p>
                            Fetching data from
                            Spring Boot.
                        </p>

                    </div>

                ) : filtered.length === 0 ? (

                    <div className="empty-state large">

                        <div className="empty-icon">
                            ⌁
                        </div>

                        <h3>
                            {
                                applications.length === 0
                                    ? "No data received from backend"
                                    : "No matching applications"
                            }
                        </h3>

                        <p>
                            {
                                applications.length === 0
                                    ? "Your API currently returned an empty list. Once the CSV records are loaded into MySQL, they will appear here automatically."
                                    : "Try changing your search or filters."
                            }
                        </p>

                    </div>

                ) : (

                    <div className="table-scroll">

                        <table className="applications-table">

                            <thead>

                                <tr>

                                    <th>
                                        APPLICATION
                                    </th>

                                    <th>
                                        STUDENT
                                    </th>

                                    <th>
                                        COURSE
                                    </th>

                                    <th>
                                        INSTITUTION
                                    </th>

                                    <th>
                                        LOAN REQUESTED
                                    </th>

                                    <th>
                                        CREDIT SCORE
                                    </th>

                                    <th>
                                        STATUS
                                    </th>

                                    <th>
                                        DATE
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filtered.map(
                                    (application) => {

                                        const id =
                                            get(
                                                application,
                                                "applicationId",
                                                "id"
                                            );


                                        const studentName =
                                            get(
                                                application,
                                                "studentName",
                                                "name"
                                            );


											const rawCredit =
											    get(
											        application,
											        "creditScore"
											    );

											const credit =
											    rawCredit === null ||
											    rawCredit === undefined ||
											    rawCredit === ""
											        ? null
											        : Number(rawCredit);


                                        return (

                                            <tr
                                                key={id}
                                            >

                                                <td>

                                                    <strong className="application-id">
                                                        {id || "—"}
                                                    </strong>

                                                </td>


                                                <td>

                                                    <div className="table-person">

                                                        <div className="student-avatar small">
                                                            {String(
                                                                studentName ||
                                                                "?"
                                                            ).charAt(0)}
                                                        </div>

                                                        <span>
                                                            {studentName ||
                                                                "—"}
                                                        </span>

                                                    </div>

                                                </td>


                                                <td>
                                                    {get(
                                                        application,
                                                        "courseName",
                                                        "course"
                                                    ) || "—"}
                                                </td>


                                                <td>

                                                    <span className="institution-cell">
                                                        {get(
                                                            application,
                                                            "institutionName",
                                                            "institution"
                                                        ) || "—"}
                                                    </span>

                                                </td>


                                                <td>

                                                    <strong>
                                                        {money(
                                                            get(
                                                                application,
                                                                "loanAmountRequestedInr",
                                                                "loanAmount"
                                                            )
                                                        )}
                                                    </strong>

                                                </td>


												<td>

												    <span
												        className={`credit-score ${
												            credit === null
												                ? "na"
												                : credit >= 700
												                    ? "good"
												                    : credit >= 650
												                        ? "medium"
												                        : "low"
												        }`}
												    >

												        {
												            displayValue(
												                get(
												                    application,
												                    "creditScore"
												                )
												            )
												        }

												    </span>

												</td>
                                                <td>

                                                    <span
                                                        className={
                                                            statusClass(
                                                                get(
                                                                    application,
                                                                    "applicationStatus",
                                                                    "status"
                                                                )
                                                            )
                                                        }
                                                    >
                                                        {
                                                            get(
                                                                application,
                                                                "applicationStatus",
                                                                "status"
                                                            ) || "Unknown"
                                                        }
                                                    </span>

                                                </td>


                                                <td>
                                                    {
                                                        get(
                                                            application,
                                                            "applicationDate"
                                                        ) || "—"
                                                    }
                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}


export default Applications;