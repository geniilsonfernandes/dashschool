import { axiosInstance, Endpoints } from "@/api";
import { useNotification } from "@/contexts/AlertMessageContext";
import useAsync from "@/hook/useAsync";
import Base from "@/templates/Base";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Form, { IFormValues } from "../../../components/Form/FormCreateUser";

const Edit = () => {
  const notification = useNotification();
  const [initialValues, setInitialValues] = useState({} as IFormValues);
  const router = useRouter();
  const { id } = router.query as { id: string };

  const handleEditUser = async (values: IFormValues) => {
    try {
      await axiosInstance.put(Endpoints.student.update(id), {
        name: values.name,
        email: values.email,
        password: values.password
      });
      notification.showAlert({
        title: "Sucesso",
        description: "Aluno editado com sucesso",
        status: "success",
        buttonTitle: "Ir para lista de alunos",
        onConfirm: () => router.back()
      });
    } catch (error: any) {
      notification.showAlert({
        title: "Erro",
        description: error.response.data.errorMessage,
        status: "error"
      });
    }
  };

  const handleGetStudante = async () => {
    try {
      const reponse = await axiosInstance.get(Endpoints.student.get(id));

      setInitialValues({
        name: reponse.data.students.name,
        email: reponse.data.students.email,
        password: reponse.data.students.password
      });
      return reponse.data.students;
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, execute } = useAsync(handleGetStudante);

  useEffect(() => {
    execute();
  }, []);

  return (
    <Base>
      <Form
        onSubmit={handleEditUser}
        initialValues={initialValues}
        isLoading={isLoading}
      />
    </Base>
  );
};

export default Edit;
