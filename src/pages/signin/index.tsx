import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { stylesConstants } from "@/styles";
import {
  Flex,
  Stack,
  Heading,
  Link as ChakraLink,
  Divider,
  Center,
  HStack,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
  SlideFade,
  Box
} from "@chakra-ui/react";
import Link from "next/link";

export default function SignIn() {
  const { isOpen, onToggle } = useDisclosure();

  const handleVerify = (otpCode: any) => {
    console.log(otpCode);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Box position={"relative"}>
        <SlideFade in={isOpen} offsetY="20px">
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
              <PinInput onChange={handleVerify}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <Button mt="8">Verificar agora</Button>
            <Button mt="2" variant="outline" onClick={onToggle}>
              Voltar
            </Button>
          </Flex>
        </SlideFade>

        <Flex
          w="360px"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          opacity={isOpen ? 0.5 : 1}
          filter={isOpen ? "blur(2px)" : "none"}
          pointerEvents={isOpen ? "none" : "auto"}
        >
          <Heading>Sign In</Heading>
          <Divider borderColor="gray.600" my="6" />
          <Flex as="form" borderRadius={8} flexDir="column">
            <Stack spacing={4}>
              <Input label="Email" name="email" type="email" />
              <Input label="Senha" name="password" type="password" />
              <Input
                label="Confirma senha"
                name="password_confirmation"
                type="password"
              />
            </Stack>
            <Button mt="6" onClick={onToggle}>
              Criar conta
            </Button>
          </Flex>
          <Button mt="2" variant="outline" onClick={onToggle}>
            Verificar codigo
          </Button>
          <Flex mt="8" justifyContent="center">
            <Text pr={2}> Já tem uma conta? </Text>
            <Link href="/login">
              <ChakraLink
                as="span"
                color={`${stylesConstants.COLOR_SCHEME}.400`}
              >
                Fazer Login
              </ChakraLink>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
