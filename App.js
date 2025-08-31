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
        <main className="container app">
            <h1>Cestovatelský deník</h1>

            <TripForm
                key={editing?.id || "create"}
                initialValues={editing || { title: "", city: "", date: "", note: "" }}
                isEditing={!!editing}
                onSubmit={(vals) =>
                    editing ? handleUpdate(editing.id, vals) : handleCreate(vals)
                }
                onCancel={() => setEditing(null)}
            />

            <TripList
                trips={trips}
                onEdit={(trip) => setEditing(trip)}
                onDelete={handleDelete}
            />
        </main>
    )
}