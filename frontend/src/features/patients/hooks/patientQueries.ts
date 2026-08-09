import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  activatePatient,
  createPatient,
  deactivatePatient,
  getPatient,
  listPatients,
  updatePatient,
} from '../services/patientService';

import type {
  PatientFilters,
  PatientPayload,
} from '../types/patient';

export function usePatients(
  filters: PatientFilters,
) {
  return useQuery({
    queryKey: ['patients', filters],
    queryFn: () => listPatients(filters),
  });
}

export function usePatient(
  id: number,
) {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => getPatient(id),
    enabled: id > 0,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPatient,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['patients'],
      });
    },
  });
}

export function useUpdatePatient(
  id: number,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: PatientPayload,
    ) => updatePatient(id, payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['patients'],
        }),

        queryClient.invalidateQueries({
          queryKey: ['patient', id],
        }),
      ]);
    },
  });
}

export function useActivatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activatePatient,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['patients'],
      });

      await queryClient.invalidateQueries({
        queryKey: ['patient'],
      });
    },
  });
}

export function useDeactivatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivatePatient,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['patients'],
      });

      await queryClient.invalidateQueries({
        queryKey: ['patient'],
      });
    },
  });
}