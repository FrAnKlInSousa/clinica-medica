import { z } from 'zod';

function onlyNumbers(value: string) {
  return value.replace(/\D/g, '');
}

function isValidCpf(value: string) {
  const cpf = onlyNumbers(value);

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  function calculateDigit(
    base: string,
    initialWeight: number,
  ) {
    let sum = 0;

    for (
      let index = 0;
      index < base.length;
      index += 1
    ) {
      sum +=
        Number(base[index]) *
        (initialWeight - index);
    }

    const remainder = sum % 11;

    return remainder < 2
      ? 0
      : 11 - remainder;
  }

  const firstDigit =
    calculateDigit(cpf.substring(0, 9), 10);

  const secondDigit =
    calculateDigit(cpf.substring(0, 10), 11);

  return (
    firstDigit === Number(cpf[9]) &&
    secondDigit === Number(cpf[10])
  );
}

export const patientSchema = z.object({
  nomeCompleto: z
    .string()
    .trim()
    .min(1, 'O nome completo é obrigatório.')
    .max(180),

  cpf: z
    .string()
    .trim()
    .min(1, 'O CPF é obrigatório.')
    .refine(
      isValidCpf,
      'O CPF informado é inválido.',
    ),

  dataNascimento: z
    .string()
    .min(
      1,
      'A data de nascimento é obrigatória.',
    ),

  sexo: z.enum([
    'FEMININO',
    'MASCULINO',
    'NAO_INFORMADO',
  ]),

  telefone: z
    .string()
    .trim()
    .min(1, 'O telefone é obrigatório.')
    .max(20),

  telefoneSecundario: z
    .string()
    .max(20)
    .optional(),

  email: z
    .string()
    .trim()
    .email('Informe um e-mail válido.')
    .or(z.literal(''))
    .optional(),

  nomeMae: z
    .string()
    .max(180)
    .optional(),

  cep: z
    .string()
    .refine(
      (value) =>
        value === '' ||
        onlyNumbers(value).length === 8,
      'O CEP deve possuir oito números.',
    )
    .optional(),

  logradouro: z
    .string()
    .max(180)
    .optional(),

  numero: z
    .string()
    .max(20)
    .optional(),

  complemento: z
    .string()
    .max(100)
    .optional(),

  bairro: z
    .string()
    .max(100)
    .optional(),

  cidade: z
    .string()
    .max(100)
    .optional(),

  estado: z
    .string()
    .refine(
      (value) =>
        value === '' ||
        /^[A-Za-z]{2}$/.test(value),
      'Informe a UF com duas letras.',
    )
    .optional(),

  observacoes: z
    .string()
    .max(5000)
    .optional(),
});

export type PatientFormData =
  z.infer<typeof patientSchema>;