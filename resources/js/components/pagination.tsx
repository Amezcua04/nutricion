import { router } from '@inertiajs/react';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
}

export default function Pagination({ links }: PaginationProps) {
  const currentParams = new URLSearchParams(window.location.search);

  const handleClick = (url: string | null) => {
    if (!url) return;

    // Extraer el número de página desde el enlace
    const urlObj = new URL(url, window.location.origin);
    const page = urlObj.searchParams.get('page') || '1';

    // Construir un nuevo conjunto de parámetros incluyendo el actual + nuevo page
    const newParams = new URLSearchParams(currentParams);
    newParams.set('page', page);

    router.get(`${urlObj.pathname}?${newParams.toString()}`, {}, {
      preserveState: true,
      replace: true,
    });
  };

  return (
    <nav className="flex justify-end mt-4 flex-wrap gap-2" aria-label="Paginación">
      {links.map((link, i) => (
        <button
          key={i}
          onClick={() => handleClick(link.url)}
          disabled={!link.url}
          className={`px-3 py-1 rounded text-sm border cursor-pointer ${
            link.active
              ? 'bg-black text-white'
              : 'hover:bg-gray-100 text-gray-700'
          } ${!link.url && 'pointer-events-none opacity-50'}`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </nav>
  );
}
