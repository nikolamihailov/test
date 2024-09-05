import axios from "axios";
import { PaginatedService, Service, ServiceAddUpdate } from "../../types/Service";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

const serviceEndpoints = {
  getAll: BASE_URL + "/service",
  getOne: BASE_URL + "/service/",
  create: BASE_URL + "/service",
  update: BASE_URL + "/service/",
  delete: BASE_URL + "/service/",
};

export const getServices = async (
  token: string | undefined,
  page: number = 0,
  size: number = 20
) => {
  const response = await axios.get<PaginatedService>(
    `${serviceEndpoints.getAll}?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getOneService = async (token: string | undefined, id: number | undefined) => {
  const repsonse = await axios.get<Service>(`${serviceEndpoints.getOne}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return repsonse.data;
};

export const createService = async (token: string | undefined, serviceData: ServiceAddUpdate) => {
  return (
    await axios.post<Service>(serviceEndpoints.create, serviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const updateService = async (
  token: string | undefined,
  id: number,
  serviceData: ServiceAddUpdate
) => {
  return (
    await axios.patch<Service>(`${serviceEndpoints.update}${id}`, serviceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const deleteService = async (token: string | undefined, id: number) => {
  return (
    await axios.delete(`${serviceEndpoints.delete}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
