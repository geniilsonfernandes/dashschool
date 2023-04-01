import { Input } from "@/components/Form/Input";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Skeleton,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from "@chakra-ui/react";
import Link from "next/link";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect } from "react";
import { stylesConstants } from "@/styles";
import cutString from "@/utils/cutString";

const schemaCrete = yup.object().shape({
  name: yup.string().trim().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  password: yup
    .string()
    .trim()
    .min(8, "senha deve ter no mínimo 8 caracteres")
    .required("Campo obrigatório")
});
const schemaEdit = yup.object().shape({
  name: yup.string().trim().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido")
});

type Course = {
  id: string;
  name: string;
  description: string;
};

export type IFormValues = {
  name: string;
  email: string;
  password: string;
  courseList?: Course[];
};

type IFormProps = {
  initialValues?: IFormValues;
  onSubmit: (values: IFormValues) => void;
  isLoading?: boolean;
  loadingValues?: boolean;
};

const Form = ({
  onSubmit,
  initialValues,
  isLoading = false,
  loadingValues = false
}: IFormProps) => {
  const hasInitialValues = !!initialValues;
  const isEdit = hasInitialValues;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormValues>({
    mode: "onSubmit",
    resolver: yupResolver(isEdit ? schemaEdit : schemaCrete),
    defaultValues: {
      name: initialValues?.name,
      email: initialValues?.email,
      password: initialValues?.password
    }
  });

  const handleCreateUser = (values: IFormValues) => {
    onSubmit(values);
  };

  useEffect(() => {
    if (hasInitialValues) {
      setValue("name", initialValues?.name);
      setValue("email", initialValues?.email);
      setValue("password", initialValues?.password);
    }
  }, [initialValues, setValue, hasInitialValues]);

  return (
    <>
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Skeleton colorScheme="blue" isLoaded={!loadingValues} rounded="8px">
          <Heading size="lg" fontWeight="normal">
            {isEdit ? "Editar aluno" : "Criar aluno"}
          </Heading>
        </Skeleton>
        <Divider my="6" borderColor="gray.700" />

        <Skeleton colorScheme="blue" isLoaded={!loadingValues} rounded="8px">
          <Tabs
            variant="solid-rounded"
            colorScheme={stylesConstants.COLOR_SCHEME}
          >
            <TabList mb={4}>
              <Tab>Dados do aluno</Tab>
              <Tab>Cursos</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack spacing="8">
                  <SimpleGrid
                    minChildWidth="240px"
                    columns={2}
                    spacing={8}
                    w="100%"
                  >
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
                          autoComplete="off"
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
                          autoComplete="off"
                        />
                      )}
                    />
                  </SimpleGrid>

                  {!isEdit && (
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
                            autoComplete="off"
                          />
                        )}
                      />
                    </SimpleGrid>
                  )}
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={3}>
                  {initialValues?.courseList?.map((course) => (
                    <Flex
                      width="100%"
                      key={course.id}
                      p="4"
                      bg="gray.900"
                      borderRadius="8"
                    >
                      <Text
                        fontSize="small"
                        fontWeight="bold"
                        color="white.300"
                      >
                        {course.name}
                      </Text>
                      <Spacer />
                      <Text fontSize="small" color="white.300" opacity=".5">
                        {cutString(course.description, 50)}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Skeleton>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link href="/student" passHref>
              <Button colorScheme="whiteAlpha" disabled>
                cancelar
              </Button>
            </Link>

            <Skeleton
              colorScheme="blue"
              isLoaded={!loadingValues}
              rounded="8px"
            >
              <Button
                isDisabled={Object.keys(errors).length > 0}
                isLoading={isLoading}
                loadingText="Enviando"
                colorScheme="facebook"
                onClick={handleSubmit(handleCreateUser)}
              >
                {hasInitialValues ? "Salvar" : "Criar"}
              </Button>
            </Skeleton>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Form;
