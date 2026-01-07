// api/request.ts
export interface RequestType {
  _id?: string; // MongoDB ID
  title: string;
  status: "Open" | "In Progress" | "Closed";
  createdDate: string;
  priority: "High" | "Medium" | "Low";
}

const BASE_URL = "http://localhost:4000/api/requests";

// GET all requests
export const fetchRequests = async (): Promise<RequestType[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch requests");
  return res.json();
};

// CREATE request
export const createRequest = async (data: RequestType): Promise<RequestType> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create request");
  return res.json();
};

// UPDATE request
export const updateRequest = async (id: string, data: RequestType): Promise<RequestType> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update request");
  return res.json();
};

// DELETE request(s)
export const deleteRequests = async (ids: string[]): Promise<void> => {
  await Promise.all(
    ids.map((id) =>
      fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Failed to delete request");
      })
    )
  );
};
