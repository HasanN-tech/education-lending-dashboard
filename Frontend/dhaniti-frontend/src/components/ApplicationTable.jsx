import { displayValue } from "../utils/dataQuality";

function ApplicationTable({ applications }) {

    return (

        <div
            style={{
                background: "white",
                padding: "20px",
                marginTop: "20px",
                borderRadius: "10px"
            }}
        >

            <h3>Applications</h3>

            <table border="1" width="100%">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Status</th>
                        <th>Loan Amount</th>
                    </tr>
                </thead>

                <tbody>

                    {applications.map((app) => (

                        <tr
                            key={
                                app.applicationId ||
                                app.id
                            }
                        >

                            <td>
                                {displayValue(
                                    app.applicationId
                                )}
                            </td>

                            <td>
                                {displayValue(
                                    app.studentName
                                )}
                            </td>

                            <td>
                                {displayValue(
                                    app.courseName
                                )}
                            </td>

                            <td>
                                {displayValue(
                                    app.applicationStatus
                                )}
                            </td>

                            <td>
                                ₹
                                {Number(
                                    app.loanAmountRequestedInr || 0
                                ).toLocaleString("en-IN")}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ApplicationTable;