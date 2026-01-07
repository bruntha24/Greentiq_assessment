const API_URL = "http://localhost:4000/api/company/rts";

/* ================= TYPES ================= */
export interface RTSDetails {
  company: string;
  contact: string;
  saleDate: string;
  owner: string;
  saleType: string;
  status: string;
}

export interface RTSActivity {
  date: string;
  text: string;
}

export interface RTSData {
  _id: string;
  details: RTSDetails;
  activities: RTSActivity[];
  stakeholders: string[];
}

/* ================= GET ALL RTS ================= */
export const getAllRTS = async (): Promise<RTSData[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch RTS");
  return res.json();
};

/* ================= UPDATE RTS ================= */
export const updateRTS = async (
  id: string,
  payload: {
    details: RTSDetails;
    activities: RTSActivity[];
    stakeholders: string[];
  }
) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update RTS");
  return res.json();
};
