const BASE_URL = "https://68b2f7f7c28940c9e69dd351.mockapi.io/api/v1";

export async function getTrips() {
  const res = await fetch(`${BASE_URL}/trips`);
  if (!res.ok) throw new Error("GET trips failed");
  return res.json();
}

export async function createTrip(data) {
  const res = await fetch(`${BASE_URL}/trips`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("POST trip failed");
  return res.json();
}

export async function updateTrip(id, data) {
  const res = await fetch(`${BASE_URL}/trips/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("PUT trip failed");
  return res.json();
}

export async function deleteTrip(id) {
  const res = await fetch(`${BASE_URL}/trips/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("DELETE trip failed");
  return res.json().catch(() => ({}));
}
