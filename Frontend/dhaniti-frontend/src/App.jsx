import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";


function App() {

    return (

        <div className="app-shell">

            <Navbar />

            <main className="main-content">

                <Routes>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/applications"
                        element={<Applications />}
                    />

                </Routes>

            </main>

        </div>
    );
}


export default App;