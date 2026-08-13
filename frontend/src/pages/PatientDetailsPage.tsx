import {
  Link,
  useParams,
} from 'react-router';

import {
  PatientStatusBadge,
} from '../features/patients/components/PatientStatusBadge';

import {
  useActivatePatient,
  useDeactivatePatient,
  usePatient,
} from '../features/patients/hooks/patientQueries';

export function PatientDetailsPage() {
  const params = useParams();

  const patientId =
    Number(params.id);

  const patientQuery =
    usePatient(patientId);

  const activateMutation =
    useActivatePatient();

  const deactivateMutation =
    useDeactivatePatient();

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
        <div className="form-error">
          Paciente não encontrado.
        </div>
      </div>
    );
  }

  const patient =
    patientQuery.data;

  async function changeStatus() {
    if (patient.ativo) {
      const confirmed =
        window.confirm(
          'Deseja realmente desativar este paciente?',
        );

      if (!confirmed) {
        return;
      }

      await deactivateMutation
        .mutateAsync(patient.id);
    } else {
      await activateMutation
        .mutateAsync(patient.id);
    }

    await patientQuery.refetch();
  }

  return (
    <div className="page-container">
      <Link data-testid="voltar-paciente" to="/pacientes">
        ← Voltar para pacientes
      </Link>

      <div className="page-header">
        <div>
          <span className="eyebrow">
            Paciente #{patient.id}
          </span>

          <h1 data-testid="nome-completo">
            {patient.nomeCompleto}
          </h1>

          <PatientStatusBadge
            active={patient.ativo}
          />
        </div>

        <div className="header-actions">
          <Link
            data-testid="editar"
            className="secondary-link"
            to={`/pacientes/${patient.id}/editar`}
          >
            Editar
          </Link>

          <button
            type="button"
            data-testid="desativar"
            className={
              patient.ativo
                ? 'danger-button'
                : 'primary-button'
            }
            onClick={() =>
              void changeStatus()
            }
          >
            {patient.ativo
              ? 'Desativar'
              : 'Ativar'}
          </button>
        </div>
      </div>

      <div className="details-grid">
        <section className="details-card">
          <h2>Dados pessoais</h2>

          <dl>
            <dt>CPF</dt>
            <dd data-testid="cpf">{patient.cpf}</dd>

            <dt>Data de nascimento</dt>
            <dd data-testid="data-nascimento">
              {patient.dataNascimento}
            </dd>

            <dt>Sexo</dt>
            <dd data-testid="sexo">
              {patient.sexo ??
                'Não informado'}
            </dd>

            <dt>Nome da mãe</dt>
            <dd data-testid="nome-mae">
              {patient.nomeMae ??
                'Não informado'}
            </dd>
          </dl>
        </section>

        <section className="details-card">
          <h2>Contato</h2>

          <dl>
            <dt>Telefone</dt>
            <dd  data-testid="telefone">
              {patient.telefone}
            </dd>

            <dt>
              Telefone secundário
            </dt>
            <dd  data-testid="telefone-secundario">
              {patient.telefoneSecundario ??
                'Não informado'}
            </dd>

            <dt>E-mail</dt>
            <dd data-testid="email-paciente">
              {patient.email ??
                'Não informado'}
            </dd>
          </dl>
        </section>

        <section className="details-card">
          <h2>Endereço</h2>

          <dl>
            <dt>CEP</dt>
            <dd data-testid="cep">
              {patient.endereco.cep ??
                'Não informado'}
            </dd>

            <dt>Logradouro</dt>
            <dd data-testid="logradouro">
              {patient.endereco
                .logradouro ??
                'Não informado'}
            </dd>

            <dt>Número</dt>
            <dd data-testid="numero-endereco">
              {patient.endereco.numero ??
                'Não informado'}
            </dd>

            <dt>Bairro</dt>
            <dd data-testid="bairro-endereco">
              {patient.endereco.bairro ??
                'Não informado'}
            </dd>

            <dt>Cidade / UF</dt>
            <dd data-testid="cidade-uf">
              {patient.endereco.cidade ??
                '-'}
              {' / '}
              {patient.endereco.estado ??
                '-'}
            </dd>
          </dl>
        </section>

        <section className="details-card">
          <h2>Observações</h2>

          <p data-testid="observacao">
            {patient.observacoes ??
              'Nenhuma observação cadastrada.'}
          </p>
        </section>
      </div>
    </div>
  );
}