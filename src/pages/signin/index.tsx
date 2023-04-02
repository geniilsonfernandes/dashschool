import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { stylesConstants } from "@/styles";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Link as ChakraLink,
  Stack,
  Text
} from "@chakra-ui/react";
import Link from "next/link";

import { axiosInstance, Endpoints } from "@/api";
import { useNotification } from "@/contexts/AlertMessageContext";
import { yupResolver } from "@hookform/resolvers/yup";

import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Logo from "@/components/Header/Logo";
import usePageTitle from "@/hook/usePageTitle";

const schema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  password: yup
    .string()
    .trim()
    .min(8, "senha deve ter no mínimo 8 caracteres")
    .required("Campo obrigatório"),
  confirmPassword: yup
    .string()
    .trim()
    .min(8, "senha deve ter no mínimo 8 caracteres")
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
  usePageTitle("Criar conta");
  const notification = useNotification();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IFormCreateValues>({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  });

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
    <Flex
      w="100vw"
      align="center"
      justify="center"
      flexDirection={["column", "column", "row"]}
      minHeight="100vh"
      gap="4"
    >
      <Box w="360px">
        <Logo brandName="Dashschool" />

        <Heading maxWidth={360} fontSize="4xl" pt={"10px"}>
          Seja bem-vindo(a) à nossa plataforma de gerenciamento de cursos
        </Heading>
        <Box maxWidth={260}>
          <Divider borderColor="gray.600" my="6" />
          <Text>Por favor, preencha as informações para criar sua conta.!</Text>
        </Box>
      </Box>

      <Box position={"relative"}>
        <Flex
          w={["310px", "360px"]}
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
        >
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

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
}
