import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { stylesConstants } from "@/styles";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Link as ChakraLink,
  SlideFade,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";

import Link from "next/link";

import { axiosInstance, Endpoints } from "@/api";
import { useNotification } from "@/contexts/AlertMessageContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import OtpVerificate from "@/components/OtpVerificate";

const schema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  password: yup.string().required("Campo obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password") ?? null], "As senhas precisam ser iguais")
    .required("Campo obrigatório")
});

export type IFormCreateValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignIn() {
  const notification = useNotification();
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IFormCreateValues>({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  });

  // const handleVerify = (otpCode: any) => {
  //   console.log(otpCode);
  // };

  const handleCreateUser = async (values: IFormCreateValues) => {
    try {
      await axiosInstance.post(Endpoints.user.create(), {
        name: values.name,
        email: values.email,
        password: values.password
      });

      notification.showAlert({
        description: "Usuário criado com sucesso",
        status: "success",
        title: "Sucesso",
        buttonTitle: "Faça login",
        onConfirm: () => router.push("/login")
      });
    } catch (error: any) {
      notification.showAlert({
        description: error.response.data.errorMessage,
        status: "error",
        title: "Erro",
        buttonTitle: "Tentar novamente"
      });
    }
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Box position={"relative"}>
        <SlideFade in={isOpen} offsetY="20px">
          <OtpVerificate onClose={onToggle} />
        </SlideFade>

        <Flex
          w={["310px", "360px"]}
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          opacity={isOpen ? 0.2 : 1}
          filter={isOpen ? "blur(4px)" : "none"}
          pointerEvents={isOpen ? "none" : "auto"}
        >
          <Heading>Sign In</Heading>
          <Divider borderColor="gray.600" my="6" />
          <Flex borderRadius={8} flexDir="column">
            <Stack spacing={4}>
              <Controller
                name="name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    name="name"
                    label="Nome"
                    type="text"
                    value={value}
                    onChange={onChange}
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    value={value}
                    onChange={onChange}
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    name="password"
                    type="password"
                    label="Senha"
                    value={value}
                    onChange={onChange}
                    error={errors.password ? true : false}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    name="password_confirmation"
                    type="password"
                    label="Confirmar senha"
                    value={value}
                    onChange={onChange}
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Stack>
            <Button
              mt="6"
              isLoading={isSubmitting}
              onClick={handleSubmit(handleCreateUser)}
            >
              {isSubmitting ? "Criando conta..." : "Criar conta"}
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
