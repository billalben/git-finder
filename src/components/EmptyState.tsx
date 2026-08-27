interface EmptyStateProps {
  title?: string;
  text: string;
}

export function EmptyState({ title = "Oops! :(", text }: EmptyStateProps) {
  return (
    <div className="error-content">
      <p className="title-1">{title}</p>
      <p className="text">{text}</p>
    </div>
  );
}
