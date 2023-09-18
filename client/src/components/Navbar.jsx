import React from "react";

// We import Link to utilize the react router:
import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <div className="navbar-custom">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src="/brand-circle.png" alt="brand" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse create-nav-bar-link" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item ms-auto">
                                <Link className="nav-link create-record-button-navbar" aria-current="page" to="/create"><i className="fa-solid fa-circle-plus"></i> Create Record</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}