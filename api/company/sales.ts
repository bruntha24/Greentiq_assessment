import axios from "axios";

// Base URL
const API = axios.create({
  baseURL: "http://localhost:4000/api/sales",
});

// Sale type
export interface Sale {
  _id?: string;
  saleName: string;
  status: "Open" | "Lost" | "Sold" | "Stalled";
  saleDate: string;
  amount: number;
  stage: string;
  nextActivity: string;
}

// Create Sale
export const createSale = async (data: Sale): Promise<Sale> => {
  try {
    const res = await API.post("/", data);
    return res.data;
  } catch (error: any) {
    // FIXED: safe check for axios error
    const msg = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : (error as Error).message;

    console.error("Failed to create sale:", msg);
    throw new Error(msg);
  }
};

// Fetch Sales
export const fetchSales = async (): Promise<Sale[]> => {
  try {
    const res = await API.get("/");
    return res.data;
  } catch (error: any) {
    const msg = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : (error as Error).message;

    console.error("Failed to fetch sales:", msg);
    throw new Error(msg);
  }
};

// Update Sale
export const updateSale = async (id: string, data: Sale): Promise<Sale> => {
  try {
    const res = await API.put(`/${id}`, data);
    return res.data;
  } catch (error: any) {
    const msg = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : (error as Error).message;

    console.error("Failed to update sale:", msg);
    throw new Error(msg);
  }
};

// Delete multiple sales
export const deleteSales = async (ids: string[]): Promise<{ message: string }> => {
  try {
    const res = await API.delete("/", { data: { ids } });
    return res.data;
  } catch (error: any) {
    const msg = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : (error as Error).message;

    console.error("Failed to delete sales:", msg);
    throw new Error(msg);
  }
};
