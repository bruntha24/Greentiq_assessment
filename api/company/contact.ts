import axios from "axios";

const API_URL = "http://localhost:4000/api/contacts";

export interface ContactType {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: "New" | "In Progress" | "Resolved";
}

export const fetchContacts = async (): Promise<ContactType[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createContact = async (data: ContactType) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateContact = async (id: string, data: ContactType) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteContacts = async (ids: string[]) => {
  await axios.delete(API_URL, { data: { ids } });
};
