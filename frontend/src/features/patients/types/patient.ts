export type PatientSex =
  | 'FEMININO'
  | 'MASCULINO'
  | 'NAO_INFORMADO';

export type PatientAddress = {
  cep: string | null;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
};

export type Patient = {
  id: number;
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  sexo: PatientSex | null;
  telefone: string;
  telefoneSecundario: string | null;
  email: string | null;
  nomeMae: string | null;
  endereco: PatientAddress;
  observacoes: string | null;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string | null;
};

export type PatientSummary = {
  id: number;
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  sexo: PatientSex | null;
  telefone: string;
  email: string | null;
  ativo: boolean;
};

export type PatientPayload = {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  sexo?: PatientSex;
  telefone: string;
  telefoneSecundario?: string | null;
  email?: string | null;
  nomeMae?: string | null;

  endereco?: {
    cep?: string | null;
    logradouro?: string | null;
    numero?: string | null;
    complemento?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
  };

  observacoes?: string | null;
};

export type PatientPage = {
  content: PatientSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type PatientFilters = {
  nome?: string;
  cpf?: string;
  telefone?: string;
  ativo?: boolean;
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
};