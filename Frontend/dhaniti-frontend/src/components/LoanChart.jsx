import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function LoanChart({ applications }) {

    const grouped = applications.reduce(
        (result, app) => {

            const course =
                app.courseName ||
                app.course ||
                "Unknown";


            const amount =
                Number(
                    app.loanAmountRequestedInr ??
                    app.loanAmount ??
                    0
                );


            if (!result[course]) {
                result[course] = 0;
            }


            result[course] += amount;

            return result;

        },
        {}
    );


    const data = Object.entries(grouped)
        .map(([course, amount]) => ({
            course,
            amount:
                Math.round(
                    amount / 100000
                ) / 10
        }))
        .sort(
            (a, b) =>
                b.amount - a.amount
        )
        .slice(0, 7);


    return (
        <div className="panel">

            <div className="panel-heading">

                <div>

                    <h3>
                        Loan Demand by Course
                    </h3>

                    <p>
                        Requested amount in ₹ lakh
                    </p>

                </div>


                <span className="panel-badge neutral">
                    DEMAND
                </span>

            </div>


            {data.length === 0 ? (

                <div className="empty-chart">
                    No application data available yet.
                </div>

            ) : (

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 40
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#e8edf4"
                        />


                        <XAxis
                            dataKey="course"
                            angle={-25}
                            textAnchor="end"
                            interval={0}
                            tick={{
                                fontSize: 11,
                                fill: "#64748b"
                            }}
                        />


                        <YAxis
                            tick={{
                                fontSize: 11,
                                fill: "#64748b"
                            }}
                        />


                        <Tooltip
                            formatter={(value) => [
                                `₹${value} L`,
                                "Requested"
                            ]}
                        />


                        <Bar
                            dataKey="amount"
                            radius={[
                                7,
                                7,
                                0,
                                0
                            ]}
                            fill="#4f46e5"
                        />

                    </BarChart>

                </ResponsiveContainer>

            )}

        </div>
    );
}

export default LoanChart;