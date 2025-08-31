import React from "react";
import TripCard from "./TripCard";

export default function TripList({ trips, onDelete, onEdit }) {
    if (!trips.length) return <p className="subtitle">Zatím žádné výlety.</p>;
    return (
        <div className="cards">
            {trips.map((t) => (
                <TripCard key={t.id} trip={t} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
}