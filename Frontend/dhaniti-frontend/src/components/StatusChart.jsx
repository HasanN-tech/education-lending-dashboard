import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";


const COLORS = {
    Approved: "#10b981",
    Rejected: "#ef4444",
    Submitted: "#f59e0b",
    "Under Review": "#6366f1"
};


function StatusChart({ data }) {

    const chartData = Object.entries(data).map(
        ([name, value]) => ({
            name,
            value
        })
    );


    return (
        <div className="panel chart-panel">

            <div className="panel-heading">

                <div>
                    <h3>
                        Application Status
                    </h3>

                    <p>
                        Portfolio distribution by current stage
                    </p>
                </div>

                <span className="panel-badge">
                    LIVE DATA
                </span>

            </div>


            {chartData.length === 0 ? (

                <div className="empty-chart">
                    No application data available yet.
                </div>

            ) : (

                <div className="chart-wrap">

                    <ResponsiveContainer
                        width="100%"
                        height={280}
                    >

                        <PieChart>

                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={105}
                                paddingAngle={3}
                            >

                                {chartData.map((entry) => (

                                    <Cell
                                        key={entry.name}
                                        fill={
                                            COLORS[entry.name]
                                            || "#64748b"
                                        }
                                    />

                                ))}

                            </Pie>


                            <Tooltip
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #e5e7eb"
                                }}
                            />

                        </PieChart>

                    </ResponsiveContainer>


                    <div className="legend-list">

                        {chartData.map((item) => (

                            <div
                                className="legend-item"
                                key={item.name}
                            >

                                <span
                                    className="legend-dot"
                                    style={{
                                        background:
                                            COLORS[item.name]
                                            || "#64748b"
                                    }}
                                />

                                <span>
                                    {item.name}
                                </span>

                                <strong>
                                    {item.value}
                                </strong>

                            </div>

                        ))}

                    </div>

                </div>

            )}

        </div>
    );
}

export default StatusChart;