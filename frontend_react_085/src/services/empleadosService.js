import axios from "axios";

const API = "http://localhost:3000/api/empleados";

export const getEmpleados = () => axios.get(API);
export const createEmpleado = (data) => axios.post(API, data);
export const updateEmpleado = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteEmpleado = (id) => axios.delete(`${API}/${id}`);