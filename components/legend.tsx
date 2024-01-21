export function Legend() {
  return (
    <legend className="flex items-start flex-col justify-center gap-1 p-4">
      <div className="flex items-center justify-center">
        <div className="w-4 h-4 bg-emerald-400"></div>
        <p className="ml-1">Saisonal</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-4 h-4 bg-sky-400"></div>
        <p className="ml-1">Eingelagert</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-4 h-4 bg-slate-300"></div>
        <p className="ml-1">Importiert</p>
      </div>
    </legend>
  );
}
