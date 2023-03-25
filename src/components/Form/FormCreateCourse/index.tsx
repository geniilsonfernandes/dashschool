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

import SearchStudent, {
  ControlleList,
  InitialValuesTypes
} from "@/components/SearchStudent";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Textarea } from "../Textarea";

const schemaCrete = yup.object().shape({
  name: yup.string().trim().required("Campo obrigatório"),
  description: yup.string().trim().required("Campo obrigatório"),
  duration: yup.number().required("Campo obrigatório")
});
const schemaEdit = yup.object().shape({
  name: yup.string().trim().required("Campo obrigatório"),
  description: yup.string().trim().required("Campo obrigatório"),
  duration: yup.number().required("Campo obrigatório")
});

export type IFormCreateCourseValues = {
  name: string;
  description: string;
  duration: number;
};
export type IInitialValues = {
  name: string;
  description: string;
  duration: number;

  studentList?: InitialValuesTypes[];
};

export type ISubmitValues = {
  name: string;
  description: string;
  duration: number;
  list: ControlleList;
};

type IFormProps = {
  initialValues?: IInitialValues;
  onSubmit: (values: ISubmitValues) => void;
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
  const [list, setList] = useState<ControlleList>();

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

  const handleEditCourse = (values: IFormCreateCourseValues) => {
    onSubmit({
      name: values.name,
      description: values.description,
      duration: values.duration,
      list: list as ControlleList
    });
  };

  useEffect(() => {
    if (hasInitialValues) {
      setValue("name", initialValues?.name);
      setValue("description", initialValues?.description);
      setValue("duration", initialValues?.duration);
    }
  }, [initialValues, setValue, hasInitialValues]);

  return (
    <>
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Skeleton colorScheme="blue" isLoaded={!loadingValues} rounded="8px">
          <Heading size="lg" fontWeight="normal">
            {isEdit ? "Editar curso" : "Criar curso"}
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

            <SearchStudent
              initialValues={initialValues?.studentList}
              onChangelist={(values) => setList(values)}
            />
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
                onClick={handleSubmit(handleEditCourse)}
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
