export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
        <span className="text-white font-bold text-xl">P</span>
      </div>
      <span className="text-2xl font-bold">
        Prog<span className="text-primary">Blog</span>
      </span>
    </div>
  );
}
