import React from "react";
import { FaEdit, FaTrash, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function TripCard({ trip, onDelete, onEdit }) {


    return (
        <article className="card">
            <div className="card-head">
                <h3 className="card-title">{trip.title}</h3>
                <div className="card-action">
                    <button 
                        className="btn btn-outline btn-sm"
                        title="Editovat" 
                        onClick={() => onEdit(trip)}
                    >
                        <FaEdit aria-hidden="true" />
                        <span className="label">Editovat</span>
                    </button>
                        
                    
                    <button 
                        className="btn btn-danger btn-sm" 
                        title="Smazat"
                        onClick={() => onDelete(trip.id)}
                    >
                        <FaTrash aria-hidden="true" />
                        <span className="label">Smazat</span>
                    </button>
                        
                    
                </div>
            </div>

            <div className="pills">
                <span className="pill city"><FaMapMarkerAlt /> {trip.city}</span>
                <span className="pill"><FaCalendarAlt /> {trip.date}</span>
            </div>

            {trip.note && <p className="card-note">{trip.note}</p>}
        </article>
    );
}