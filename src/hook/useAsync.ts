import { useState } from "react";
type AsyncFunction<T> = (...args: any[]) => Promise<T>;

interface IUseAsync<T, A> {
  isLoading: boolean;
  error: any;
  data: T | null;
  execute: (args?: A) => Promise<void>;
}

function useAsync<T, A>(asyncFn: AsyncFunction<T>): IUseAsync<T, A> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (args?: A) => {
    setIsLoading(true);
    try {
      const result = await asyncFn(args);
      setData(result);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return { isLoading, error, data, execute };
}

export default useAsync;
