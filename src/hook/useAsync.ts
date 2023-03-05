import { useState } from "react";
type AsyncFunction<T> = (...args: any[]) => Promise<T>;

interface IUseAsync<T> {
  isLoading: boolean;
  error: any;
  data: T | null;
  execute: () => Promise<void>;
}

function useAsync<T>(asyncFn: AsyncFunction<T>): IUseAsync<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (...args: any[]) => {
    setIsLoading(true);
    try {
      const result = await asyncFn(...args);
      setData(result);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return { isLoading, error, data, execute };
}

export default useAsync;
