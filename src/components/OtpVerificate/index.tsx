import {
  Divider,
  Flex,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Text
} from "@chakra-ui/react";
import Button from "../Button";

type OtpVerificateProps = {
  onClose: () => void;
};

const OtpVerificate = ({ onClose }: OtpVerificateProps) => {
  return (
    <Flex
      w={["310px", "360px"]}
      maxWidth="360px"
      bg="gray.800"
      p="8"
      borderRadius={8}
      flexDir="column"
      position="absolute"
      zIndex={10}
    >
      <Heading>Verificação</Heading>
      <Divider borderColor="gray.600" my="6" />
      <Text align="center" mb="8">
        Digite o código de verificação enviado para seu e-mail
      </Text>
      <HStack justifyContent="center" spacing={5}>
        <PinInput>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Button mt="8">Verificar agora</Button>
      <Button mt="2" variant="outline" onClick={onClose}>
        Voltar
      </Button>
    </Flex>
  );
};

export default OtpVerificate;
