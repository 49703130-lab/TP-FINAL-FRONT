type Props = {
  pegadas: number;
  total: number;
};

export default function Contador({ pegadas, total }: Props) {
  const porcentaje = total === 0 ? 0 : Math.round((pegadas / total) * 100);

  return (
    <div className="mb-4">
      <p className="mb-1 text-lg font-semibold">
        {pegadas}/{total} pegadas ({porcentaje}%)
      </p>
      <div className="h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-green-500 transition-all"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}
