interface PlaceholderNoticeProps {
  source: string;
}

export function PlaceholderNotice({ source }: PlaceholderNoticeProps) {
  return (
    <p className="text-muted-foreground mx-auto max-w-6xl px-4 pb-8 text-xs sm:px-6">
      Structural placeholder — content and design pending. Data source: {source}.
    </p>
  );
}
