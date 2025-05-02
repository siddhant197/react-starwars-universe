import { ErrorMessageProps } from '../types/errors';

function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className="text-red-500 text-center py-4">{message}</div>;
}

export default ErrorMessage;
