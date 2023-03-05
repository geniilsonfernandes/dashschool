import { Input } from "@/components/Form/Input";
import { stylesConstants } from "@/styles";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Link as ChakraLink,
  Stack
} from "@chakra-ui/react";
import Link from "next/link";

export default function SignIn() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Heading>Login</Heading>
        <Divider borderColor="gray.600" my="6" />
        <Flex as="form" borderRadius={8} flexDir="column">
          <Stack spacing={4}>
            <Input label="Email" name="email" type="email" />
            <Input label="Senha" name="password" type="password" />
          </Stack>
          <Button
            type="submit"
            mt="6"
            colorScheme={stylesConstants.COLOR_SCHEME}
          >
            Entrar
          </Button>
        </Flex>
        <Flex mt="8" justifyContent="center">
          <Link href="/signin">
            <ChakraLink as="span" color={`${stylesConstants.COLOR_SCHEME}.400`}>
              Cria conta
            </ChakraLink>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
