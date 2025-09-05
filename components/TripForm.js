import React, { useState } from "react";
import { normalizeDate } from "../utils/date";

export default function TripForm({ initialValues, onSubmit, onCancel, isEditing }) {
  const [form, setForm] = useState(initialValues);
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim() || !form.city.trim() || !normalizeDate(form.date)) {
      setMsg("Vyplň Název, Město a Datum.");
      return;
    }

    onSubmit({
      title: form.title.trim(),
      city: form.city.trim(),
      date: normalizeDate(form.date),
      note: form.note?.trim() || "",
    });

    setMsg("");

    if (!isEditing) {
      setForm({ title: "", city: "", date: "", note: "" });
    }
  }

  return (
    <form className="trip-form" onSubmit={handleSubmit}>
      <label className="label">
        Název výletu
        <input
          className="input"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Památky"
          required
        />
      </label>

      <div className="row">
        <label className="label">
          Město
          <input
            className="input"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Berlín"
            required
          />
        </label>

        <label className="label">
          Datum
          <input
            className="input"
            type="date"
            name="date"
            value={normalizeDate(form.date)}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <label className="label">
        Poznámka
        <textarea
          className="textarea"
          rows="3"
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Krátký popis…"
        />
      </label>

      {msg && <p className="error">{msg}</p>}

      <div className="actions">
        {isEditing && (
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Zrušit
          </button>
        )}
        <button className="btn btn-primary" type="submit">
          {isEditing ? "Uložit změny" : "Přidat výlet"}
        </button>
      </div>
    </form>
  );
}
