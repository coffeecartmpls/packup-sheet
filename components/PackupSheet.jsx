import { useState, useEffect, useRef, useCallback } from "react";

const LOGO_SRC = "data:image/png;base64,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";

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTnRPvq0DEYLm-_WFFO9iXFbXOT0hgT1AEOJRngdbA27J8IUisyRTB2PaDvVHrs_UNsFQ-jtix7-QUT/pub?gid=0&single=true&output=csv";
const REFRESH_INTERVAL = 3 * 60 * 1000; // Refresh every 3 minutes

const COLUMNS = [
  { key: "espresso", label: "ESPRESSO", width: "100px", icon: "\u2615" },
  { key: "milkAddOns", label: "MILK / ADD-ONS", width: "100px", icon: "\uD83E\uDD5B" },
  { key: "ice", label: "ICE", width: "80px", icon: "\uD83E\uDDCA" },
  { key: "syrup", label: "SYRUP", width: "70px", icon: "\uD83C\uDF6F" },
  { key: "extras", label: "EXTRAS", width: "110px", icon: "\uD83D\uDCE6" },
  { key: "cart", label: "CART", width: "100px", icon: "\uD83D\uDED2" },
  { key: "van", label: "VAN", width: "80px", icon: "\uD83D\uDE90" },
  { key: "repack", label: "REPACK", width: "70px", icon: "\u267B\uFE0F" }
];

const DAY_COLORS = {
  monday:    { bg: "#FFF3EE", accent: "#F24E1E" },
  tuesday:   { bg: "#E8FFF5", accent: "#0E9F6E" },
  wednesday: { bg: "#F5EEFF", accent: "#A259FF" },
  thursday:  { bg: "#F0FAFF", accent: "#1ABCFE" },
  friday:    { bg: "#EEFBF5", accent: "#0ACF83" },
  saturday:  { bg: "#FFF8ED", accent: "#E8850C" },
  sunday:    { bg: "#EEF0FF", accent: "#5E6AD2" }
};

const DROPDOWN_OPTIONS = {
  van: ["", "Mercedes", "Ford", "Ram", "Personal Car"]
};

// ── CSV Parser ──
function parseCSV(csv) {
  const lines = csv.split("\n").map((l) => l.trim()).filter((l) => l);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = (values[idx] || "").trim();
    });
    rows.push(row);
  }
  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        result.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

// ── Transform CSV rows into day structure ──
function csvToDays(rows) {
  const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const dayMap = {};
  let idCounter = 1;

  rows.forEach((row) => {
    const dayName = (row["Day"] || "").trim();
    const date = (row["Date"] || "").trim();
    if (!dayName) return;

    const dayKey = dayName.toLowerCase();
    // Handle duplicate day names (e.g. two Mondays) by appending a suffix
    let mapKey = dayKey;
    if (dayMap[mapKey] && dayMap[mapKey].date !== date && date) {
      mapKey = dayKey + "_2";
    }

    if (!dayMap[mapKey]) {
      dayMap[mapKey] = {
        id: mapKey,
        day: dayName,
        date: date,
        events: []
      };
    }

    // Only add an event row if there's an event name
    const eventName = (row["Event"] || "").trim();
    if (eventName) {
      dayMap[mapKey].events.push({
        id: "e" + idCounter++,
        name: eventName,
        time: row["Time"] || "",
        staff: row["Staff"] || "",
        espresso: (row["Espresso"] || "").replace(/,\s*/g, "\n"),
        milkAddOns: (row["Milk/Add-Ons"] || "").replace(/,\s*/g, "\n"),
        ice: (row["Ice"] || "").replace(/,\s*/g, "\n"),
        syrup: (row["Syrup"] || "").replace(/,\s*/g, "\n"),
        extras: (row["Extras"] || "").replace(/,\s*/g, "\n"),
        cart: row["Cart"] || "",
        van: row["Van"] || "",
        repack: row["Repack"] || "",
        notes: row["Notes"] || ""
      });
    }
  });

  // Build ordered list — keep original sheet order, but ensure all days exist
  const result = [];
  const seen = new Set();

  // First pass: add days in the order they appear in the sheet
  rows.forEach((row) => {
    const dayName = (row["Day"] || "").trim();
    const date = (row["Date"] || "").trim();
    if (!dayName) return;
    const dayKey = dayName.toLowerCase();
    let mapKey = dayKey;
    if (dayMap[dayKey + "_2"] && dayMap[dayKey]?.date !== date && date) {
      mapKey = dayKey + "_2";
    }
    if (!seen.has(mapKey) && dayMap[mapKey]) {
      result.push(dayMap[mapKey]);
      seen.add(mapKey);
    }
  });

  return result;
}

// ── UI Components ──
function EditableCell({ value, onChange, colKey, placeholder, isNote }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef(null);

  useEffect(() => { setDraft(value); }, [value]);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      if (ref.current.tagName === "TEXTAREA") {
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }
    }
  }, [editing]);

  if (editing && DROPDOWN_OPTIONS[colKey]) {
    return (
      <select
        ref={ref}
        value={draft}
        onChange={(e) => { setDraft(e.target.value); onChange(e.target.value); setEditing(false); }}
        onBlur={() => { onChange(draft); setEditing(false); }}
        style={{
          width: "100%", minHeight: "36px", border: "2px solid #A259FF",
          borderRadius: "6px", padding: "6px 8px", fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px", outline: "none", background: "#FAFAFA", color: "#1E1E1E", cursor: "pointer"
        }}
      >
        {DROPDOWN_OPTIONS[colKey].map((opt) => (
          <option key={opt} value={opt}>{opt || "\u2014 Select \u2014"}</option>
        ))}
      </select>
    );
  }

  if (editing) {
    return (
      <textarea
        ref={ref}
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        onBlur={() => { onChange(draft); setEditing(false); }}
        onKeyDown={(e) => { if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
        style={{
          width: "100%", minHeight: "36px", border: "2px solid #A259FF",
          borderRadius: "6px", padding: "6px 8px", fontFamily: "'DM Sans', sans-serif",
          fontSize: isNote ? "13px" : "15px", lineHeight: "1.4", resize: "vertical",
          outline: "none", background: "#FAFAFA", color: "#1E1E1E"
        }}
      />
    );
  }

  const lines = value ? value.split("\n") : [];
  return (
    <div
      onClick={() => setEditing(true)}
      style={{
        cursor: "text", minHeight: "28px", padding: "4px 6px", borderRadius: "6px",
        transition: "background 0.15s", fontSize: isNote ? "13px" : "15px", lineHeight: "1.4",
        color: value ? "#1E1E1E" : "#bbb", whiteSpace: "pre-wrap"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(162,89,255,0.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {lines.length > 0
        ? lines.map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              {lines.length > 1 && <span style={{ color: "#999", fontSize: "8px", flexShrink: 0 }}>{"\u25CF"}</span>}
              <span>{l}</span>
            </div>
          ))
        : placeholder || "\u2014"}
    </div>
  );
}

function EventRow({ event, dayId, onChange, onDelete }) {
  const colors = DAY_COLORS[dayId] || DAY_COLORS[dayId.replace(/_2$/, "")] || DAY_COLORS.monday;
  return (
    <tr style={{ borderBottom: "1px solid #E0E0E0" }}>
      <td style={{ padding: "8px 10px", position: "sticky", left: 0, zIndex: 2, background: "#fff", borderRight: "2px solid #E0E0E0", minWidth: "180px", maxWidth: "220px" }}>
        <div style={{ fontWeight: 700 }}>
          <EditableCell value={event.name} colKey="name" onChange={(v) => onChange({ ...event, name: v })} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px", flexWrap: "wrap" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "3px", padding: "2px 6px", background: event.time ? colors.bg : "#f5f5f5", borderRadius: "4px", opacity: event.time ? 1 : 0.5 }}>
            <span style={{ fontSize: "10px", opacity: 0.6 }}>{"\u23F0"}</span>
            <EditableCell value={event.time} colKey="time" onChange={(v) => onChange({ ...event, time: v })} placeholder="Add time" isNote />
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "3px", padding: "2px 6px", background: event.staff ? colors.bg : "#f5f5f5", borderRadius: "4px", opacity: event.staff ? 1 : 0.5 }}>
            <span style={{ fontSize: "10px", opacity: 0.6 }}>{"\uD83D\uDC64"}</span>
            <EditableCell value={event.staff} colKey="staff" onChange={(v) => onChange({ ...event, staff: v })} placeholder="Add staff" isNote />
          </div>
        </div>
        {event.notes && (
          <div style={{ marginTop: "4px", padding: "4px 6px", background: colors.bg, borderRadius: "5px", borderLeft: `3px solid ${colors.accent}`, fontSize: "10px", color: colors.accent, fontStyle: "italic", lineHeight: 1.4 }}>
            <EditableCell value={event.notes} colKey="notes" onChange={(v) => onChange({ ...event, notes: v })} isNote />
          </div>
        )}
        <button onClick={onDelete} style={{ marginTop: "4px", background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: "10px", padding: "2px 4px", borderRadius: "4px", transition: "all 0.15s" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#e53935"; e.currentTarget.style.background = "#FFEBEE"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.background = "none"; }}
        >{"\u2715"} remove</button>
      </td>
      {COLUMNS.map((col) => (
        <td key={col.key} style={{ padding: "6px 8px", verticalAlign: "top", minWidth: col.width }}>
          <EditableCell value={event[col.key]} colKey={col.key} onChange={(v) => onChange({ ...event, [col.key]: v })} placeholder={"\u2014"} />
        </td>
      ))}
    </tr>
  );
}

function getColorsForDay(dayId) {
  return DAY_COLORS[dayId] || DAY_COLORS[dayId.replace(/_2$/, "")] || DAY_COLORS.monday;
}

// ── Main Component ──
export default function PackupSheet() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [expandedDays, setExpandedDays] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(SHEET_CSV_URL);
      if (!res.ok) throw new Error("Failed to fetch sheet");
      const csv = await res.text();
      const rows = parseCSV(csv);
      const parsed = csvToDays(rows);
      setDays(parsed);
      setExpandedDays((prev) => {
        const next = { ...prev };
        parsed.forEach((d) => { if (!(d.id in next)) next[d.id] = true; });
        return next;
      });
      setLastUpdated(new Date());
      setError(null);
    } catch (e) {
      setError("Could not load data from Google Sheets. Will retry...");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const toggleDay = (id) => setExpandedDays((prev) => ({ ...prev, [id]: !prev[id] }));

  const updateEvent = useCallback((dayId, eventId, updated) => {
    setDays((prev) => prev.map((d) =>
      d.id === dayId ? { ...d, events: d.events.map((e) => (e.id === eventId ? updated : e)) } : d
    ));
  }, []);

  const deleteEvent = useCallback((dayId, eventId) => {
    setDays((prev) => prev.map((d) =>
      d.id === dayId ? { ...d, events: d.events.filter((e) => e.id !== eventId) } : d
    ));
  }, []);

  const addEvent = useCallback((dayId) => {
    setDays((prev) => prev.map((d) =>
      d.id === dayId
        ? { ...d, events: [...d.events, { id: `e_${Date.now()}`, name: "New Event", time: "", staff: "", espresso: "", milkAddOns: "", ice: "", syrup: "", extras: "", cart: "", van: "", repack: "", notes: "" }] }
        : d
    ));
  }, []);

  // Sort days so today is first
  const sortedDays = (() => {
    if (days.length === 0) return [];
    const today = new Date();
    const todayDate = `${today.getMonth() + 1}/${today.getDate()}`;
    const todayDay = today.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

    let todayIndex = days.findIndex((d) => d.date === todayDate);
    if (todayIndex === -1) {
      todayIndex = days.findIndex((d) => d.day.toLowerCase() === todayDay);
    }
    if (todayIndex <= 0) return days;
    return [...days.slice(todayIndex), ...days.slice(0, todayIndex)];
  })();

  const totalEvents = days.reduce((s, d) => s + d.events.length, 0);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", background: "#F5F5F5", minHeight: "100vh", color: "#1E1E1E" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;1,9..40,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "#1E1E1E", padding: "16px 32px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 4px 20px rgba(0,0,0,0.3)", borderBottom: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "220px" }}>
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "1px", textTransform: "uppercase" }}>Pack-Up Sheet</span>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontFamily: "'Space Mono', monospace" }}>
            {currentTime.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} {"\u00B7"} {currentTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
          <img src={LOGO_SRC} alt="Coffee Cart Minneapolis" style={{ height: "60px", objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: "220px", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", gap: "16px", padding: "8px 16px", background: "rgba(255,255,255,0.08)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#1ABCFE", fontFamily: "'Space Mono', monospace" }}>{totalEvents}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "1px" }}>Events</div>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.12)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#1ABCFE", fontFamily: "'Space Mono', monospace" }}>{days.length}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "1px" }}>Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "24px 32px 60px" }}>
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#999", fontSize: "14px" }}>
            Loading events from Google Sheets...
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", padding: "20px", margin: "0 0 20px", background: "#FFF3EE", border: "1px solid #F24E1E", borderRadius: "10px", color: "#F24E1E", fontSize: "14px" }}>
            {error}
          </div>
        )}

        {sortedDays.map((day) => {
          const colors = getColorsForDay(day.id);
          const isExpanded = expandedDays[day.id] !== false;
          return (
            <div key={day.id} style={{ marginBottom: "20px", borderRadius: "14px", overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)", border: "1px solid #E0E0E0" }}>
              <div onClick={() => toggleDay(day.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: colors.bg, cursor: "pointer", userSelect: "none", borderBottom: isExpanded ? `2px solid ${colors.accent}22` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "8px", background: colors.accent, color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'Space Mono', monospace", boxShadow: `0 2px 8px ${colors.accent}44` }}>{day.day.slice(0, 2)}</span>
                  <div>
                    <span style={{ fontSize: "18px", fontWeight: 700, color: colors.accent, letterSpacing: "-0.3px" }}>{day.day}</span>
                    {day.date && <span style={{ marginLeft: "8px", fontSize: "15px", color: `${colors.accent}99`, fontFamily: "'Space Mono', monospace" }}>{day.date}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ padding: "4px 12px", borderRadius: "20px", background: `${colors.accent}18`, color: colors.accent, fontSize: "13px", fontWeight: 600, fontFamily: "'Space Mono', monospace" }}>{day.events.length} event{day.events.length !== 1 ? "s" : ""}</span>
                  <span style={{ fontSize: "18px", color: colors.accent, transition: "transform 0.25s", transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)", display: "inline-block" }}>{"\u25BE"}</span>
                </div>
              </div>
              {isExpanded && (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#FAFAFA" }}>
                        <th style={{ padding: "8px 10px", textAlign: "left", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#999", position: "sticky", left: 0, zIndex: 2, background: "#FAFAFA", borderRight: "2px solid #E0E0E0", borderBottom: "1px solid #E0E0E0", minWidth: "180px" }}>Event / Time / Staff</th>
                        {COLUMNS.map((col) => (
                          <th key={col.key} style={{ padding: "8px 8px", textAlign: "left", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#999", borderBottom: "1px solid #E0E0E0", minWidth: col.width, whiteSpace: "nowrap" }}>{col.icon} {col.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {day.events.map((event) => (
                        <EventRow key={event.id} event={event} dayId={day.id} onChange={(updated) => updateEvent(day.id, event.id, updated)} onDelete={() => deleteEvent(day.id, event.id)} />
                      ))}
                      <tr>
                        <td colSpan={COLUMNS.length + 1} style={{ padding: "6px 12px" }}>
                          <button onClick={() => addEvent(day.id)} style={{ background: "none", border: "1px dashed #CCC", borderRadius: "8px", padding: "10px 16px", color: "#A259FF", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500, transition: "all 0.2s", width: "100%" }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#A259FF"; e.currentTarget.style.background = "#F5F0FF"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#CCC"; e.currentTarget.style.background = "none"; }}
                          >+ Add Event</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", padding: "16px", color: "#999", fontSize: "12px", fontFamily: "'Space Mono', monospace", borderTop: "1px solid #E0E0E0" }}>
        Data from Google Sheets {"\u00B7"} Auto-refreshes every 3 min
        {lastUpdated && <span> {"\u00B7"} Last updated {lastUpdated.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>}
      </div>
    </div>
  );
}
