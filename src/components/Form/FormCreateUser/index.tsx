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

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  password: yup.string().required("Campo obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password") ?? null], "As senhas precisam ser iguais")
    .required("Campo obrigatório")
});

export type IFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type IFormProps = {
  initialValues?: IFormValues;
  onSubmit: (values: IFormValues) => void;
  isLoading?: boolean;
};

const Form = ({ onSubmit, initialValues, isLoading }: IFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IFormValues>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: initialValues
  });

  const hasInitialValues = !!initialValues;

  const handleCreateUser = (values: IFormValues) => {
    onSubmit(values);
  };

  return (
    <>
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Heading size="lg" fontWeight="normal">
          {hasInitialValues ? "Editar usuário" : "Criar usuário"}
        </Heading>
        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" columns={2} spacing={8} w="100%">
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  name="name"
                  label="Nome completo"
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
                  value={value}
                  onChange={onChange}
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
                />
              )}
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
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
                  label="Senha"
                  value={value}
                  onChange={onChange}
                  error={errors.confirmPassword ? true : false}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </SimpleGrid>
        </VStack>
        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link href="/student" passHref>
              <Button colorScheme="whiteAlpha" disabled>
                cancelar
              </Button>
            </Link>
            <Button
              isDisabled={Object.keys(errors).length > 0}
              isLoading={isLoading}
              loadingText="Enviando"
              colorScheme="pink"
              onClick={handleSubmit(handleCreateUser)}
            >
              {hasInitialValues ? "Salvar" : "Criar"}
            </Button>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Form;
