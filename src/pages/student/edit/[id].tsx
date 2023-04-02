import { axiosInstance, Endpoints } from "@/api";
import { useNotification } from "@/contexts/AlertMessageContext";
import useAsync from "@/hook/useAsync";
import usePageTitle from "@/hook/usePageTitle";
import Base from "@/templates/Base";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Form, { IFormValues } from "../../../components/Form/FormCreateUser";

const Edit = () => {
  usePageTitle("Editar Aluno");
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
      console.log(reponse.data.students);

      setInitialValues({
        name: reponse.data.students.name,
        email: reponse.data.students.email,
        password: reponse.data.students.password,
        courseList: reponse.data.students.Courses_Students.map(
          (course: any) => ({
            id: course.Courses.id,
            name: course.Courses.name,
            description: course.Courses.description
          })
        )
      });
      return reponse.data.students;
    } catch (error: any) {
      notification.showAlert({
        title: "Erro",
        description: error.response.data.errorMessage,
        status: "error",
        buttonTitle: "Ir para lista de alunos",
        onConfirm: () => router.back()
      });
    }
  };

  const update = useAsync(handleEditUser);
  const get = useAsync(handleGetStudante);

  useEffect(() => {
    get.execute();
  }, []);

  return (
    <Base>
      <Form
        onSubmit={(values) => update.execute(values)}
        initialValues={initialValues}
        isLoading={update.isLoading}
        loadingValues={get.isLoading}
      />
    </Base>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
}

export default Edit;
