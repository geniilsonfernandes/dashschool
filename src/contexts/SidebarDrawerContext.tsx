import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps {
  children: React.ReactNode;
}
type SidebarDrawerContextData = UseDisclosureReturn;

export const SidebarDrawerContext = createContext(
  {} as SidebarDrawerContextData
);

export const SidebarDrawerProvider = ({
  children
}: SidebarDrawerProviderProps) => {
  const disclosure = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
