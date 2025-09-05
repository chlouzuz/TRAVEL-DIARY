export function formatDateCZ(dateStr) {
    if (!dateStr) return "";
    const onlyDate = dateStr.split("T")[0];         
    const [y, m, d] = onlyDate.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("cs-CZ", { 
        day: "2-digit",
        month: "2-digit", 
        year: "numeric" 
    });
}

export function normalizeDate(dateStr) {
    if (!dateStr) return "";
    return dateStr.split("T")[0];
}
