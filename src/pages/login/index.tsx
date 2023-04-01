import { Input } from "@/components/Form/Input";
import { stylesConstants } from "@/styles";
import { getSession, signIn } from "next-auth/react";
import {
  Divider,
  Flex,
  Heading,
  Link as ChakraLink,
  Stack,
  Box,
  Text
} from "@chakra-ui/react";
import Link from "next/link";

import { useNotification } from "@/contexts/AlertMessageContext";
import { yupResolver } from "@hookform/resolvers/yup";

import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/Button";
import { NextPageContext } from "next";
import Logo from "@/components/Header/Logo";

const schema = yup.object().shape({
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  password: yup.string().required("Campo obrigatório")
});

export type IFormCreateValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IFormCreateValues>({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  });

  const router = useRouter();

  const notification = useNotification();

  const handleLogin = async (values: IFormCreateValues) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password
      });

      if (response?.error) {
        throw response;
      }

      router.push("/dashboard");
    } catch (error: any) {
      notification.showAlert({
        title: "Erro ao fazer login",
        description: error.error,
        status: "error"
      });
    }
  };

  return (
    <Flex
      w="100vw"
      minHeight={"100vh"}
      align="center"
      justify="center"
      flexDirection={["column", "column", "row"]}
      gap="4"
    >
      <Box w="360px">
        <Logo brandName="Dashschool" />

        <Heading maxWidth={360} fontSize="4xl" pt={"10px"}>
          Faça seu login na plataforma
        </Heading>
        <Box maxWidth={260}>
          <Divider borderColor="gray.600" my="6" />
          <Text>Gerencie seus cursos e alunos em uma única plataforma!</Text>
        </Box>
      </Box>

      <Flex
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Flex borderRadius={8} flexDir="column">
          <Stack spacing={4}>
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
          </Stack>
          <Button
            mt="6"
            isLoading={isSubmitting}
            onClick={handleSubmit(handleLogin)}
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
