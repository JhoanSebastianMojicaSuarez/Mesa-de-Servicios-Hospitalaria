import axiosClient from './axiosClient';

export const crearArea = (data) =>
  axiosClient.post("/admin/areas", data).then(r => r.data);

export const crearSubcategoria = (data) =>
  axiosClient.post("/admin/subcategorias", data).then(r => r.data);

export const crearRequerimiento = (data) =>
  axiosClient.post("/admin/requerimientos", data).then(r => r.data);

export const crearUsuario = (data) =>
  axiosClient.post("/admin/usuarios", data).then(r => r.data);