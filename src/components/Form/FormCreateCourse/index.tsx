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
  VStack
} from "@chakra-ui/react";
import Link from "next/link";

import SearchStudent, { IStudent } from "@/components/SearchStudent";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { Textarea } from "../Textarea";

const schemaCrete = yup.object().shape({
  name: yup.string().trim().required("Campo obrigatório"),
  description: yup.string().trim().required("Campo obrigatório"),
  duration: yup.number().required("Campo obrigatório")
});
const schemaEdit = yup.object().shape({
  name: yup.string().trim().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido")
});

export type IFormCreateCourseValues = {
  name: string;
  description: string;
  duration: number;
};

type IFormProps = {
  initialValues?: IFormCreateCourseValues;
  onSubmit: (values: IFormCreateCourseValues, students: IStudent[]) => void;
  isLoading?: boolean;
  loadingValues?: boolean;
};

const FormCreateCourse = ({
  onSubmit,
  initialValues,
  isLoading = false,
  loadingValues = false
}: IFormProps) => {
  const hasInitialValues = !!initialValues;
  const isEdit = hasInitialValues;
  const [studentList, setStudentList] = useState<any>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormCreateCourseValues>({
    mode: "onSubmit",
    resolver: yupResolver(isEdit ? schemaEdit : schemaCrete),
    defaultValues: {
      name: initialValues?.name,
      description: initialValues?.description
    }
  });

  const handleCreateUser = (values: IFormCreateCourseValues) => {
    onSubmit(
      {
        name: values.name,
        description: values.description,
        duration: values.duration
      },
      studentList
    );
  };

  useEffect(() => {
    if (hasInitialValues) {
      setValue("name", initialValues?.name);
      setValue("description", initialValues?.description);
    }
  }, [initialValues, setValue, hasInitialValues]);

  // funçoes de busca de alunos

  return (
    <>
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Skeleton colorScheme="blue" isLoaded={!loadingValues} rounded="8px">
          <Heading size="lg" fontWeight="normal">
            {isEdit ? "Editar aluno" : "Criar curso"}
          </Heading>
        </Skeleton>
        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid columns={1} spacing={4} w="100%">
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  name="name"
                  label="Nome do curso"
                  value={value}
                  onChange={onChange}
                  error={errors.name ? true : false}
                  helperText={errors.name?.message}
                  autoComplete="off"
                />
              )}
            />

            <Controller
              name="duration"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  name="duration"
                  label="Duração do curso"
                  value={value}
                  onChange={onChange}
                  error={errors.name ? true : false}
                  helperText={errors.name?.message}
                  autoComplete="off"
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Textarea
                  name="description"
                  label="Descrição do curso"
                  autoComplete="off"
                  onChange={onChange}
                  value={value}
                  error={errors.name ? true : false}
                  helperText={errors.name?.message}
                />
              )}
            />

            <SearchStudent onChange={(values) => setStudentList(values)} />
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Skeleton
              colorScheme="blue"
              isLoaded={!loadingValues}
              rounded="8px"
            >
              <Link href="/courses" passHref>
                <Button colorScheme="whiteAlpha" disabled>
                  Cancelar
                </Button>
              </Link>
            </Skeleton>
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

export default FormCreateCourse;
