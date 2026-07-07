interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="text-muted-foreground mt-4 max-w-2xl">{description}</p>}
    </div>
  );
}
