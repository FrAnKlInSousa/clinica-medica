import {
  useForm,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  patientSchema,
  type PatientFormData,
} from '../schemas/patientSchema';

import type {
  PatientPayload,
} from '../types/patient';

type Props = {
  defaultValues?: Partial<PatientFormData>;

  onSubmit: (
    payload: PatientPayload,
  ) => Promise<void>;

  submitLabel: string;

  isSubmitting?: boolean;
};

function onlyNumbers(value?: string) {
  if (!value) {
    return '';
  }

  return value.replace(/\D/g, '');
}

export function PatientForm({
  defaultValues,
  onSubmit,
  submitLabel,
  isSubmitting = false,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),

    defaultValues: {
      sexo: 'NAO_INFORMADO',
      ...defaultValues,
    },
  });

  async function submit(
    data: PatientFormData,
  ) {
    const payload: PatientPayload = {
      nomeCompleto: data.nomeCompleto.trim(),

      cpf: onlyNumbers(data.cpf),

      dataNascimento:
        data.dataNascimento,

      sexo: data.sexo,

      telefone:
        onlyNumbers(data.telefone),

      telefoneSecundario:
        data.telefoneSecundario
          ? onlyNumbers(
              data.telefoneSecundario,
            )
          : null,

      email:
        data.email?.trim() || null,

      nomeMae:
        data.nomeMae?.trim() || null,

      endereco: {
        cep:
          data.cep
            ? onlyNumbers(data.cep)
            : null,

        logradouro:
          data.logradouro?.trim() || null,

        numero:
          data.numero?.trim() || null,

        complemento:
          data.complemento?.trim() || null,

        bairro:
          data.bairro?.trim() || null,

        cidade:
          data.cidade?.trim() || null,

        estado:
          data.estado
            ?.trim()
            .toUpperCase() || null,
      },

      observacoes:
        data.observacoes?.trim() || null,
    };

    await onSubmit(payload);
  }

  return (
    <form
      className="patient-form"
      onSubmit={handleSubmit(submit)}
    >
      <section className="form-section">
        <h2>Dados pessoais</h2>

        <div className="form-grid">
          <label className="field-full">
            Nome completo *

            <input
              {...register('nomeCompleto')}
            />

            {errors.nomeCompleto && (
              <span className="field-error">
                {errors.nomeCompleto.message}
              </span>
            )}
          </label>

          <label>
            CPF *

            <input
              {...register('cpf')}
            />

            {errors.cpf && (
              <span className="field-error">
                {errors.cpf.message}
              </span>
            )}
          </label>

          <label>
            Data de nascimento *

            <input
              type="date"
              {...register(
                'dataNascimento',
              )}
            />

            {errors.dataNascimento && (
              <span className="field-error">
                {
                  errors
                    .dataNascimento
                    .message
                }
              </span>
            )}
          </label>

          <label>
            Sexo

            <select
              {...register('sexo')}
            >
              <option value="NAO_INFORMADO">
                Não informado
              </option>

              <option value="FEMININO">
                Feminino
              </option>

              <option value="MASCULINO">
                Masculino
              </option>
            </select>
          </label>

          <label>
            Nome da mãe

            <input
              {...register('nomeMae')}
            />
          </label>
        </div>
      </section>

      <section className="form-section">
        <h2>Contato</h2>

        <div className="form-grid">
          <label>
            Telefone *

            <input
              {...register('telefone')}
            />

            {errors.telefone && (
              <span className="field-error">
                {errors.telefone.message}
              </span>
            )}
          </label>

          <label>
            Telefone secundário

            <input
              {...register(
                'telefoneSecundario',
              )}
            />
          </label>

          <label className="field-full">
            E-mail

            <input
              type="email"
              {...register('email')}
            />

            {errors.email && (
              <span className="field-error">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>
      </section>

      <section className="form-section">
        <h2>Endereço</h2>

        <div className="form-grid">
          <label>
            CEP

            <input
              {...register('cep')}
            />

            {errors.cep && (
              <span className="field-error">
                {errors.cep.message}
              </span>
            )}
          </label>

          <label>
            UF

            <input
              maxLength={2}
              {...register('estado')}
            />
          </label>

          <label className="field-full">
            Logradouro

            <input
              {...register('logradouro')}
            />
          </label>

          <label>
            Número

            <input
              {...register('numero')}
            />
          </label>

          <label>
            Complemento

            <input
              {...register('complemento')}
            />
          </label>

          <label>
            Bairro

            <input
              {...register('bairro')}
            />
          </label>

          <label>
            Cidade

            <input
              {...register('cidade')}
            />
          </label>
        </div>
      </section>

      <section className="form-section">
        <h2>Observações</h2>

        <textarea
          rows={5}
          {...register('observacoes')}
        />
      </section>

      <div className="form-actions">
        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Salvando...'
            : submitLabel}
        </button>
      </div>
    </form>
  );
}