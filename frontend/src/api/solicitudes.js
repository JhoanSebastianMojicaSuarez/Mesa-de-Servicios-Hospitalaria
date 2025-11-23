import axiosClient from './axiosClient';

export const getSolicitudes = () => axiosClient.get("/solicitudes").then(r => r.data);
export const crearSolicitud = (data) => axiosClient.post("/solicitudes", data).then(r => r.data);

export const getAreas = () => axiosClient.get("/areas").then(r => r.data);

export const getSubcategorias = (areaId) => {
  if (areaId === undefined || areaId === null || areaId === "") {
    return axiosClient.get("/subcategorias").then(r => r.data);
  }
  return axiosClient.get("/subcategorias", { params: { areaId } }).then(r => r.data);
};

export const getRequerimientos = (subcategoriaId) =>
  axiosClient.get("/requerimientos", { params: { subcategoriaId } }).then(r => r.data);

export const getRequerimientosAll = () => axiosClient.get("/requerimientos").then(r => r.data);

export const getUsuarios = () => axiosClient.get("/usuarios").then(r => r.data);