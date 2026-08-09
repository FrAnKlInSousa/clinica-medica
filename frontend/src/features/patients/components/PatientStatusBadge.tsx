export function PatientStatusBadge({
  active,
}: {
  active: boolean;
}) {
  return (
    <span
      className={
        active
          ? 'status-badge status-active'
          : 'status-badge status-inactive'
      }
    >
      {active ? 'Ativo' : 'Inativo'}
    </span>
  );
}