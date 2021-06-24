import { Link } from "react-router-dom";

export default function Header() {
    return <>
        <header>
            <nav className="navbar navbar-light bg-eden-blue">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/home">
                        Financial risk calculator
                    </Link>
                </div>
            </nav>
        </header>
    </>
}