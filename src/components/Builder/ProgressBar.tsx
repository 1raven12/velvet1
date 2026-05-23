type Props = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: Props) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="w-full">
      <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-stone-200 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-stone-500 mt-2">
        Step {current} of {total}
      </p>
    </div>
  );
}
