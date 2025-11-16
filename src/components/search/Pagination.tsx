"use client";

interface Props {
  page: number;
  pageCount: number;
  onChange: (p: number) => void;
}

export default function Pagination({ page, pageCount, onChange }: Props) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex gap-3 mt-6">
      {page > 1 && (
        <button
          onClick={() => onChange(page - 1)}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 border rounded ${
            page === p ? "bg-[var(--color-brown)] text-white" : ""
          }`}
        >
          {p}
        </button>
      ))}

      {page < pageCount && (
        <button
          onClick={() => onChange(page + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      )}
    </div>
  );
}
