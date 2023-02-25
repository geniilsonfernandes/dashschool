import { Input } from "@/components/Form/Input";
import Header from "@/components/Header";
import Siderbar from "@/components/Siderbar";
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

const CreteUser = () => {
  return (
    <Box>
      <Header />
      <Flex maxWidth={1480} w="100%" my="6" mx="auto" px="6">
        <Siderbar />
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
              <Button colorScheme="whiteAlpha">cancelar</Button>
              <Button colorScheme="pink">salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreteUser;
