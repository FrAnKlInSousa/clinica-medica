import { api } from '../../../services/api';

import type {
  Patient,
  PatientFilters,
  PatientPage,
  PatientPayload,
} from '../types/patient';

export async function listPatients(
  filters: PatientFilters,
): Promise<PatientPage> {
  const response = await api.get<PatientPage>(
    '/pacientes',
    {
      params: filters,
    },
  );

  return response.data;
}

export async function getPatient(
  id: number,
): Promise<Patient> {
  const response =
    await api.get<Patient>(
      `/pacientes/${id}`,
    );

  return response.data;
}

export async function createPatient(
  payload: PatientPayload,
): Promise<Patient> {
  const response =
    await api.post<Patient>(
      '/pacientes',
      payload,
    );

  return response.data;
}

export async function updatePatient(
  id: number,
  payload: PatientPayload,
): Promise<Patient> {
  const response =
    await api.put<Patient>(
      `/pacientes/${id}`,
      payload,
    );

  return response.data;
}

export async function activatePatient(
  id: number,
): Promise<void> {
  await api.patch(
    `/pacientes/${id}/ativar`,
  );
}

export async function deactivatePatient(
  id: number,
): Promise<void> {
  await api.patch(
    `/pacientes/${id}/desativar`,
  );
}