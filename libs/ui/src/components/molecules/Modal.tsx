export interface IModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

export default function Modal({ children, title, onClose }: IModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
