import { Link } from '@inertiajs/react';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
}

export default function Pagination({ links }: PaginationProps) {
  return (
    <nav className="flex justify-end mt-4 flex-wrap gap-2" aria-label="Paginación">
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.url ?? '#'}
          className={`px-3 py-1 rounded text-sm border ${
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
