interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-koinx-red text-4xl mb-4">!</div>
      <p className="text-gray-600 text-center mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-koinx-blue text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
