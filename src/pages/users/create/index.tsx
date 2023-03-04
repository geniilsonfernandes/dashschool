import { Input } from "@/components/Form/Input";
import Base from "@/templates/Base";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from "@chakra-ui/react";
import Link from "next/link";

const CreteUser = () => {
  return (
    <Base>
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Heading size="lg" fontWeight="normal">
          Criar usuário
        </Heading>
        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
            <Input name="name" label="Nome completo" />
            <Input name="email" label="E-mail" type="email" />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
            <Input name="password" label="Senha" type="password" />
            <Input
              name="password_confirmation"
              label="Confirmação de senha"
              type="password"
            />
          </SimpleGrid>
        </VStack>
        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link href="/users" passHref>
              <Button colorScheme="whiteAlpha">cancelar</Button>
            </Link>
            <Button colorScheme="pink">salvar</Button>
          </HStack>
        </Flex>
      </Box>
    </Base>
  );
};

export default CreteUser;
