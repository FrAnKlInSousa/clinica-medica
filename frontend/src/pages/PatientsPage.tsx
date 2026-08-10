import {
  useState,
} from 'react';

import {
  Link,
} from 'react-router';

import {
  usePatients,
} from '../features/patients/hooks/patientQueries';

import {
  PatientStatusBadge,
} from '../features/patients/components/PatientStatusBadge';

export function PatientsPage() {
  const [nameFilter, setNameFilter] =
    useState('');

  const [activeFilter, setActiveFilter] =
    useState('');

  const [page, setPage] =
    useState(0);

  const patientsQuery =
    usePatients({
      nome:
        nameFilter || undefined,

      ativo:
        activeFilter === ''
          ? undefined
          : activeFilter === 'true',

      page,
      size: 10,
      sort: 'nomeCompleto',
      direction: 'asc',
    });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <span className="eyebrow">
            Cadastros
          </span>

          <h1>Pacientes</h1>

          <p>
            Consulte e gerencie os pacientes
            cadastrados na clínica.
          </p>
        </div>

        <Link
          className="primary-link"
          data-testid="new-patient"
          to="/pacientes/novo"
        >
          Novo paciente
        </Link>
      </div>

      <section className="filter-card">
        <div className="filter-grid">
          <label>
            Nome

            <input
              value={nameFilter}
              data-testid="patient-filter-name"
              onChange={(event) => {
                setNameFilter(
                  event.target.value,
                );

                setPage(0);
              }}
              placeholder="Pesquisar por nome"
            />
          </label>

          <label>
            Situação

            <select
              value={activeFilter}
              data-testid="patient-filter-situation"
              onChange={(event) => {
                setActiveFilter(
                  event.target.value,
                );

                setPage(0);
              }}
            >
              <option value="" data-testid="all">
                Todos
              </option>

              <option value="true" data-testid="actives">
                Ativos
              </option>

              <option value="false" data-testid="inactives">
                Inativos
              </option>
            </select>
          </label>
        </div>
      </section>

      {patientsQuery.isPending && (
        <p>Carregando pacientes...</p>
      )}

      {patientsQuery.isError && (
        <div className="form-error">
          Não foi possível carregar
          os pacientes.
        </div>
      )}

      {patientsQuery.data && (
        <>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {patientsQuery
                  .data
                  .content
                  .map((patient) => (
                    <tr key={patient.id}>
                      <td>
                        {patient.nomeCompleto}
                      </td>

                      <td>
                        {patient.cpf}
                      </td>

                      <td>
                        {patient.telefone}
                      </td>

                      <td>
                        <PatientStatusBadge
                          active={
                            patient.ativo
                          }
                        />
                      </td>

                      <td>
                        <Link
                          to={`/pacientes/${patient.id}`}
                        >
                          Visualizar
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {patientsQuery
            .data
            .content
            .length === 0 && (
            <p>
              Nenhum paciente encontrado.
            </p>
          )}

          <div className="pagination">
            <button
              type="button"
              data-testid="patient-previous"
              disabled={
                patientsQuery.data.first
              }
              onClick={() =>
                setPage((current) =>
                  Math.max(
                    current - 1,
                    0,
                  ),
                )
              }
            >
              Anterior
            </button>

            <span>
              Página{' '}
              {patientsQuery.data.page + 1}
              {' de '}
              {Math.max(
                patientsQuery.data
                  .totalPages,
                1,
              )}
            </span>

            <button
              type="button"
              data-testid="patient-next"
              disabled={
                patientsQuery.data.last
              }
              onClick={() =>
                setPage(
                  (current) =>
                    current + 1,
                )
              }
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
}