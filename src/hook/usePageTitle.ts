import { useEffect } from "react";
import { useRouter } from "next/router";

const usePageTitle = (title: string) => {
  const router = useRouter();

  useEffect(() => {
    document.title = title;
  }, [title, router.pathname]);
};

export default usePageTitle;
