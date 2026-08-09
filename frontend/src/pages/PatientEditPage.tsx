import {
  useState,
} from 'react';

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router';

import {
  PatientForm,
} from '../features/patients/components/PatientForm';

import {
  usePatient,
  useUpdatePatient,
} from '../features/patients/hooks/patientQueries';

import type {
  PatientPayload,
} from '../features/patients/types/patient';

export function PatientEditPage() {
  const params = useParams();

  const navigate =
    useNavigate();

  const patientId =
    Number(params.id);

  const patientQuery =
    usePatient(patientId);

  const mutation =
    useUpdatePatient(patientId);

  const [error, setError] =
    useState<string | null>(null);

  if (patientQuery.isPending) {
    return (
      <div className="page-container">
        Carregando paciente...
      </div>
    );
  }

  if (
    patientQuery.isError ||
    !patientQuery.data
  ) {
    return (
      <div className="page-container">
        Paciente não encontrado.
      </div>
    );
  }

  const patient =
    patientQuery.data;

  async function handleSubmit(
    payload: PatientPayload,
  ) {
    try {
      setError(null);

      await mutation.mutateAsync(
        payload,
      );

      navigate(
        `/pacientes/${patientId}`,
      );
    } catch {
      setError(
        'Não foi possível atualizar o paciente.',
      );
    }
  }

  return (
    <div className="page-container">
      <Link
        to={`/pacientes/${patientId}`}
      >
        ← Voltar para o paciente
      </Link>

      <div className="page-header">
        <div>
          <span className="eyebrow">
            Pacientes
          </span>

          <h1>Editar paciente</h1>
        </div>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <PatientForm
        defaultValues={{
          nomeCompleto:
            patient.nomeCompleto,

          cpf:
            patient.cpf,

          dataNascimento:
            patient.dataNascimento,

          sexo:
            patient.sexo ??
            'NAO_INFORMADO',

          telefone:
            patient.telefone,

          telefoneSecundario:
            patient.telefoneSecundario ??
            '',

          email:
            patient.email ?? '',

          nomeMae:
            patient.nomeMae ?? '',

          cep:
            patient.endereco.cep ??
            '',

          logradouro:
            patient.endereco.logradouro ??
            '',

          numero:
            patient.endereco.numero ??
            '',

          complemento:
            patient.endereco
              .complemento ?? '',

          bairro:
            patient.endereco.bairro ??
            '',

          cidade:
            patient.endereco.cidade ??
            '',

          estado:
            patient.endereco.estado ??
            '',

          observacoes:
            patient.observacoes ?? '',
        }}
        onSubmit={handleSubmit}
        submitLabel="Salvar alterações"
        isSubmitting={
          mutation.isPending
        }
      />
    </div>
  );
}