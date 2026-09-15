function StatCard({ title, value, caption, icon, tone }) {

    return (
        <div className={`stat-card ${tone}`}>

            <div className="stat-top">

                <div className="stat-icon">
                    {icon}
                </div>

                <span className="stat-label">
                    {title}
                </span>

            </div>


            <div className="stat-value">
                {value}
            </div>


            <div className="stat-caption">
                {caption}
            </div>

        </div>
    );
}

export default StatCard;