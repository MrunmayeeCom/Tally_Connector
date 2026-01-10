export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl -top-48 -left-48" />
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl top-1/4 right-0" />
      <div className="absolute w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl bottom-0 left-1/4" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  );
}
