import axios from "axios";
import { Activity, Todolist } from "./interfaces";

const API_URL = "https://todo.api.devcode.gethired.id/activity-groups";
const API_URL_TODO = "https://todo.api.devcode.gethired.id/todo-items";

export const getAllActivity = async (email: string): Promise<Activity[]> => {
  const response = await axios.get(`${API_URL}?email=${email}`);
  return response.data.data;
};

export const getActivityById = async (id: string): Promise<Activity> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addActivity = async (data: Activity): Promise<Activity> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateActivity = async (
  id: number,
  data: Activity
): Promise<Activity> => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  console.log("dataedit", data);
  return response.data;
};

export const deleteActivity = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getAllTodolist = async (
  activity_group_id: number
): Promise<Todolist[]> => {
  const response = await axios.get(
    `${API_URL_TODO}?activity_group_id=${activity_group_id}`
  );
  return response.data.data;
};

export const addTodolist = async (data: Todolist): Promise<Todolist> => {
  const response = await axios.post(API_URL_TODO, data);
  return response.data;
};

export const deleteTodolist = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL_TODO}/${id}`);
};

export const updateTodolist = async (
  id: number,
  data: Todolist
): Promise<Todolist> => {
  const response = await axios.patch(`${API_URL_TODO}/${id}`, data);
  console.log("dataedit", data);
  return response.data;
};
