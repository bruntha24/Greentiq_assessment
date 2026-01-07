import axios from "axios";

const API = "http://localhost:4000/api/company/activities";

export interface Activity {
  _id?: string;
  title: string;
  type: "Call" | "Meeting" | "Email" | "Task";
  status: "Pending" | "Completed";
  assignedTo: string;
  dueDate: string;
  createdDate: string;
}

export const fetchActivities = async (): Promise<Activity[]> => {
  const res = await axios.get(API);
  return res.data;
};

export const createActivity = async (data: Activity) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateActivity = async (id: string, data: Activity) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

// ✅ Bulk delete using POST instead of DELETE
export const deleteActivities = async (ids: string[]) => {
  if (!ids.length) throw new Error("No IDs provided");
  const res = await axios.post(`${API}/delete`, { ids });
  return res.data;
};
