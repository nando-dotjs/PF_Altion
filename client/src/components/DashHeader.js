import React from 'react'
import { Link } from 'react-router-dom'

const DashHeader = () => {
    const content = (
        <header className="dashHeader">
            <div className="dashHeaderContainer">
                <Link to="/dash">
                    <h1 className="dashHeaderTitle">Unidos por la Recolección</h1>
                </Link>
                <nav className="dashHeaderNav">
                    {/* add nav buttons later */}
                </nav>
            </div>
        </header>
    )

    return content
}

export default DashHeader
