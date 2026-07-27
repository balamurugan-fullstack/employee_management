export default function Loader() {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
      <div className="space-y-2">
        <div className="h-3 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-100" />
        <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-100" />
      </div>
    </div>
  );
}
