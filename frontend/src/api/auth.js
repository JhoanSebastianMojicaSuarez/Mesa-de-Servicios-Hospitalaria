import axiosClient from "./axiosClient";

export const loginRequest = (email, password) =>
  axiosClient.post("/auth/login", { email, password });

export const registerRequest = (nombre, email, password, rol) =>
  axiosClient.post("/auth/register", { nombre, email, password, rol });
