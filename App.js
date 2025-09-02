import React, { useState } from "react";
import TripForm from "./components/TripForm";
import TripList from "./components/TripList";

export default function App() {
    const [trips, setTrips] = useState([]);
    const [editing, setEditing] = useState(null);

    function handleCreate(data) {
        const newTrip = { id: Date.now().toString(), ...data};
        setTrips([newTrip, ...trips]);
    }

    function handleUpdate(id, data) {
        setTrips(trips.map((t) => (t.id === id ? { ...t, ...data } : t)));
        setEditing(null);
    }

    function handleDelete(id) {
        setTrips(trips.filter((t) => t.id !== id));
    }

    return (
        <div className="app">
            <header className="header">
                <div className="container">
                    <h1 className="logo">Cestovatelský deník</h1>
                    <nav className="nav">
                        <a href="#">Domů</a>
                        <a href="#">O aplikaci</a>
                    </nav>
                </div>
            </header>
            
            
            <main className="main">
                <div className="container">
                    <div className="panel">
                        <TripForm
                            key={editing?.id || "create"}
                            initialValues={editing || { title: "", city: "", date: "", note: "" }}
                            isEditing={!!editing}
                            onSubmit={(vals) =>
                                editing ? handleUpdate(editing.id, vals) : handleCreate(vals)
                            }
                            onCancel={() => setEditing(null)}
                        />
                    </div>

                    <section className="section">
                        <h2 className="section-title">Moje výlety</h2>
                        <TripList
                            trips={trips}
                            onEdit={(trip) => setEditing(trip)}
                            onDelete={handleDelete}
                        />
                    </section>                  
                </div>    
            </main>

            <footer className="footer">
                <div className="container">© 2025 Cestovatelský deník</div>
            </footer>
        </div>
    );
}