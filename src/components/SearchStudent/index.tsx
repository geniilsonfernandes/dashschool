import { axiosInstance, Endpoints } from "@/api";
import { useNotification } from "@/contexts/AlertMessageContext";
import useAsync from "@/hook/useAsync";
import { IStudent, IStudentResponse } from "@/services";
import {
  Box,
  Divider,
  Flex,
  Link,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Search from "../Form/Search";
import StudantCard from "../StudantCard";

const schema = yup.object().shape({
  search: yup.string().trim().required("Campo obrigatório")
});

interface IFormSearchStudentValues {
  search: string;
}

type GridStudantsCardProps = {
  children: React.ReactNode;
  title: string;
  type: "search" | "list";
  onClear?: () => void;
};
const GridStudants = ({
  children,
  title,
  type = "list",
  onClear
}: GridStudantsCardProps) => {
  const handleClear = () => {
    onClear && onClear();
  };

  return (
    <Box>
      {type === "search" ? (
        <Flex justifyContent="space-between">
          <Text fontSize="small" color="gray.300" padding="0 0 8px 8px">
            {title}
          </Text>
          <Link
            as={"div"}
            fontSize="small"
            color="gray.300"
            padding="0 0 8px 8px"
            onClick={handleClear}
          >
            Limpar
          </Link>
        </Flex>
      ) : (
        <Text
          fontSize="16px"
          fontWeight="bold"
          color="white"
          padding="0 0 8px 8px"
        >
          {title}
        </Text>
      )}
      <VStack spacing="1">{children}</VStack>
    </Box>
  );
};
type IStudentGet = {
  page: string;
  filter: string;
};

type SearchStudentProps = {
  onChange?: (studentList: IStudent[]) => void;
};
const SearchStudent = ({ onChange }: SearchStudentProps) => {
  const notification = useNotification();
  const result = useDisclosure();
  const [studentListSelected, setStudentListSelected] = useState<IStudent[]>(
    []
  );
  const [studentList, setStudentList] = useState<IStudent[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormSearchStudentValues>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      search: ""
    }
  });

  const handleListStudents = async (args: IStudentGet) => {
    try {
      const reponse = await axiosInstance.get(Endpoints.student.list(), {
        params: {
          page: args.page,
          take: 1000,
          filter: args.filter
        }
      });
      setStudentList(reponse.data.items);
      return reponse.data.students;
    } catch (error) {
      console.log(error);
    }
  };

  const { execute, isLoading, data } = useAsync<
    IStudentResponse[],
    IStudentGet
  >(handleListStudents);

  const handleSearchStudent = async (values: IFormSearchStudentValues) => {
    try {
      await execute({
        page: "1",
        filter: values.search
      });
    } catch (error: any) {
      notification.showAlert({
        title: "Erro",
        description: error.response.data.errorMessage,
        status: "error"
      });
    }
    result.onOpen();
  };

  const handleCleaResult = () => {
    result.onClose();
    setStudentList([]);
  };

  const handleAddStudent = (id: string) => {
    const findStudent = studentList.find((item) => item.id === id);
    const list = [...studentListSelected, findStudent];
    onChange && onChange(list as IStudent[]);
    setStudentListSelected((prev: any) => [...prev, findStudent]);
  };

  const handleRemoveStudent = (id: string) => {
    const newStudentList = studentListSelected.filter((item) => item.id !== id);
    setStudentListSelected(newStudentList);
  };

  const handleRemoveSelectedStudent = (id: string) => {
    const newStudentListSelected = studentListSelected.filter(
      (item) => item.id !== id
    );
    setStudentListSelected(newStudentListSelected);
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        borderStyle="solid"
        borderWidth="1px"
        borderColor="gray.900"
        borderRadius="8px"
        padding="24px 16px"
      >
        <Controller
          control={control}
          name="search"
          render={({ field: { value, onChange } }) => (
            <Search
              autoComplete="off"
              label="Pesquisar aluno para adicionar ao curso"
              name="search_aluno"
              onClickToSearch={handleSubmit(handleSearchStudent)}
              value={value}
              onChange={onChange}
              error={errors.search ? true : false}
              helperText={errors.search?.message}
              isLoading={isLoading}
            />
          )}
        />
        {result.isOpen && (
          <>
            <Divider borderColor="gray.700" my="4" />
            <GridStudants
              title={
                data?.length === 0
                  ? "Nenhum aluno encontrado"
                  : "Alunos encontrados"
              }
              type="search"
              onClear={handleCleaResult}
            >
              {studentList &&
                studentList.map((item) => (
                  <StudantCard
                    email={item.email}
                    name={item.name}
                    key={item.id}
                    id={item.id}
                    onAdd={(id) => handleAddStudent(id)}
                    onRemove={(id) => handleRemoveStudent(id)}
                    isSelected={studentListSelected.some(
                      (student) => student.id === item.id
                    )}
                  />
                ))}
            </GridStudants>
          </>
        )}
      </Box>
      <Divider borderColor="gray.700" my="4" />
      <GridStudants title="Alunos neste curso" type="list">
        {studentListSelected.map((item) => (
          <StudantCard
            email={item.email}
            name={item.name}
            key={item.id}
            id={item.id}
            onRemove={(id) => handleRemoveSelectedStudent(id)}
            isSelected
            nofill
          />
        ))}
      </GridStudants>
    </Box>
  );
};

export default SearchStudent;
