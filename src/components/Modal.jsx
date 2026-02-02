import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, wide = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-8 px-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative bg-white rounded-xl shadow-2xl w-full ${wide ? 'max-w-4xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto`}>
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-border rounded-t-xl">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
