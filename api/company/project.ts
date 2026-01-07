import axios from "axios";

const API = "http://localhost:4000/api/company/projects";

export interface Project {
  _id?: string;
  name: string;
  client: string;
  status: "Planned" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  startDate: string;
  endDate: string;
}

export const fetchProjects = async (): Promise<Project[]> => {
  const res = await axios.get(API);
  return res.data;
};

export const createProject = async (data: Project) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateProject = async (id: string, data: Project) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

// Delete uses POST to avoid DELETE body issues
export const deleteProjects = async (ids: string[]) => {
  if (!ids.length) throw new Error("No IDs provided");
  const res = await axios.post(`${API}/delete`, { ids });
  return res.data;
};
