import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Button
} from "@chakra-ui/react";

export type AlertMessageProps = {
  status: AlertProps["status"];
  title: string;
  description: string;
  buttonTitle?: string;
  onConfirm?: () => void;
};

const AlertMessage = ({
  status = "success",
  description,
  title,
  buttonTitle = "OK",
  onConfirm
}: AlertMessageProps) => {
  const handleConfirm = () => {
    onConfirm && onConfirm();
  };

  return (
    <>
      <Alert
        status={status}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        maxW={[300, 400, 500]}
        position="absolute"
        zIndex={20}
        top="50%"
        left="50%"
        transform={"translate(-50%, -50%)"}
        borderRadius="8"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg" color="blackAlpha.600">
          {title}
        </AlertTitle>
        <AlertDescription maxWidth="sm" color="blackAlpha.600">
          {description}
        </AlertDescription>
        <Button
          mt="5"
          minWidth="50%"
          variant="outline"
          colorScheme="blackAlpha"
          onClick={handleConfirm}
        >
          {buttonTitle}
        </Button>
      </Alert>
    </>
  );
};

export default AlertMessage;
