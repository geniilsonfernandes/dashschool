import AlertMessage, { AlertMessageProps } from "@/components/AlertMessage";
import { Box, Fade, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

interface NotificationProviderProps {
  children: React.ReactNode;
}

type AlertMessageContextData = {
  showAlert: (args: AlertMessageProps) => void;
};

export const AlertMessageContext = createContext({} as AlertMessageContextData);

export const AlertMessageProvider = ({
  children
}: NotificationProviderProps) => {
  const router = useRouter();
  const disclosure = useDisclosure();
  const [alertProps, setAlertProps] = useState<AlertMessageProps>({
    description: "",
    title: "",
    status: "success"
  });

  function showAlert({
    description,
    status,
    title,
    buttonTitle,
    onConfirm
  }: AlertMessageProps) {
    disclosure.onOpen();
    setAlertProps({
      description,
      status,
      title,
      buttonTitle,
      onConfirm: onConfirm ? onConfirm : hiddenAlert
    });
  }

  function hiddenAlert() {
    disclosure.onClose();
  }

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <AlertMessageContext.Provider
      value={{
        showAlert
      }}
    >
      {disclosure.isOpen && (
        <Box
          background="rgba(0,0,0,0.5)"
          position="absolute"
          width="100vw"
          height={disclosure.isOpen ? "100vh" : "0"}
          zIndex={20}
          onClick={hiddenAlert}
        ></Box>
      )}
      {children}
      {disclosure.isOpen && (
        <>
          <Fade in={disclosure.isOpen}>
            <AlertMessage {...alertProps} />
          </Fade>
        </>
      )}
    </AlertMessageContext.Provider>
  );
};

export const useNotification = () => useContext(AlertMessageContext);
