import { Outlet } from "react-router-dom";

export default function Navbar() {
    return( 
        <>
            <header>
                <h1>Navbar</h1>
                <nav>
                    <ul>
                        <li><a href="/">Login</a></li>
                        <li><a href="/dashboard">Dashboard</a></li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    )
}