import { ReactNode } from "react";

interface ArxonCardProps {
  title?: string;
  children: ReactNode;
}

export default function ArxonCard({ title, children }: ArxonCardProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-lg shadow-black/20">
      {title && (
        <h2 className="text-xl font-semibold text-neutral-100 mb-4">
          {title}
        </h2>
      )}
      <div className="text-neutral-300 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
