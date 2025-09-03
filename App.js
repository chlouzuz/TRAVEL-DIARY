import React, { useEffect, useState } from "react";
import TripForm from "./components/TripForm";
import TripList from "./components/TripList";
import { getTrips, createTrip, updateTrip, deleteTrip } from "./utils/api";

export default function App() {
    const [trips, setTrips] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoading(true);
                const data = await getTrips();

                data.sort((a, b) => (a.date < b.date ? 1 : -1));
                setTrips(data);
                setError("");
            } catch (e) {
                console.error(e);
                setError("Nepodařio se načíst výlety.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);


    async function handleCreate (data) {
        try {
            const created = await createTrip(data);
            setTrips([created, ...trips]);
            setError("");
        } catch (e) {
            console.error(e);
            setError("Nepodařilo se vytvořit výlet.");
        };
    }

    async function handleUpdate(id, data) {
        try {
            const updated = await updateTrip(id, data);
            setTrips(trips.map((t) => (t.id === id ? updated : t)));
            setEditing(null);
            setError("");
        } catch (e) {
            console.error(e);
            setError("Nepodařilo se uložit změny.");
        }
    }

    async function handleDelete(id) {
        const prev = trips;
        setTrips(trips.filter((t) => t.id !== id));
        try {
            await deleteTrip(id);
            setError("");
        } catch (e) {
            console.error(e);
            setError("Smazání se nepovedlo, obnovuji seznam.");
            setTrips(prev);
        }
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
                        {error && <p className="error" style={{ marginTop: 12 }}>{error}</p>}
                    </div>

                    <section className="section">
                        <h2 className="section-title">Moje výlety</h2>
                        
                        {loading ? (
                            <p>Načítám výlety…</p>
                        ) : (    
                            <TripList
                                trips={trips}
                                onEdit={(trip) => setEditing(trip)}
                                onDelete={handleDelete}
                            />
                        )}    
                    </section>                  
                </div>    
            </main>

            <footer className="footer">
                <div className="container">© 2025 Cestovatelský deník</div>
            </footer>
        </div>
    );
}