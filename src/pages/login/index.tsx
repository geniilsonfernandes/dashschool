import { Input } from "@/components/Form/Input";
import {
  Flex,
  Button,
  Stack,
  Heading,
  Link,
  Divider,
  Center
} from "@chakra-ui/react";

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
        <Heading mb="8">Login</Heading>
        <Flex as="form" borderRadius={8} flexDir="column">
          <Stack spacing={4}>
            <Input label="Email" name="email" type="email" />
            <Input label="Senha" name="password" type="password" />
          </Stack>
          <Button type="submit" mt="6" colorScheme="pink">
            Entrar
          </Button>
        </Flex>
        <Flex mt="8" justifyContent="center">
          <Link as="a" color="pink.400">
            Cria conta
          </Link>
          <Center height="24px" mx="2">
            <Divider orientation="vertical" />
          </Center>
          <Link as="a" color="pink.400">
            Recuperar senha
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
