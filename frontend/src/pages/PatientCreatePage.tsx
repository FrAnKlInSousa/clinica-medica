import {
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router';

import {
  PatientForm,
} from '../features/patients/components/PatientForm';

import {
  useCreatePatient,
} from '../features/patients/hooks/patientQueries';

import type {
  PatientPayload,
} from '../features/patients/types/patient';

export function PatientCreatePage() {
  const navigate = useNavigate();

  const mutation =
    useCreatePatient();

  const [error, setError] =
    useState<string | null>(null);

  async function handleSubmit(
    payload: PatientPayload,
  ) {
    try {
      setError(null);

      const patient =
        await mutation.mutateAsync(
          payload,
        );

      navigate(
        `/pacientes/${patient.id}`,
      );
    } catch {
      setError(
        'Não foi possível cadastrar o paciente.',
      );
    }
  }

  return (
    <div className="page-container">
      <Link to="/pacientes">
        ← Voltar para pacientes
      </Link>

      <div className="page-header">
        <div>
          <span className="eyebrow">
            Pacientes
          </span>

          <h1>Novo paciente</h1>
        </div>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <PatientForm
        onSubmit={handleSubmit}
        submitLabel="Cadastrar paciente"
        isSubmitting={
          mutation.isPending
        }
      />
    </div>
  );
}