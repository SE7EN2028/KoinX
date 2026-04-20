import { useState, useEffect, useCallback } from 'react';

interface ToastData {
  id: number;
  message: string;
  type: 'success' | 'info';
}

let addToastFn: ((message: string, type?: 'success' | 'info') => void) | null = null;

export function showToast(message: string, type: 'success' | 'info' = 'success') {
  addToastFn?.(message, type);
}

let nextId = 0;

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    addToastFn = addToast;
    return () => { addToastFn = null; };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-5 py-3 rounded-xl shadow-lg text-sm font-medium text-white animate-slide-up flex items-center gap-2 max-w-sm ${
            toast.type === 'success'
              ? 'bg-koinx-green'
              : 'bg-koinx-blue'
          }`}
        >
          <span>{toast.type === 'success' ? '🎉' : 'ℹ️'}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
