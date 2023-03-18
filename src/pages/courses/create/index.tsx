import useAsync from "@/hook/useAsync";
import Base from "@/templates/Base";
import Form, { IFormValues } from "../../../components/Form/FormCreateUser";
import { axiosInstance, Endpoints } from "@/api";
import { useNotification } from "@/contexts/AlertMessageContext";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import FormCreateCourse, {
  IFormCreateCourseValues
} from "@/components/Form/FormCreateCourse";
import { ICreateCoursePayload } from "@/services/courseServive";

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

const Create = () => {
  const notification = useNotification();
  const router = useRouter();
  const handleCreateStudent = async (values: IFormCreateCourseValues) => {
    try {
      await axiosInstance.post(Endpoints.course.create(), {
        name: values.name,
        description: values.description,
        duration: values.duration,
        students: []
      });
      notification.showAlert({
        title: "Sucesso",
        description: "Aluno criado com sucesso",
        status: "success",
        buttonTitle: "Ir para lista de alunos",
        onConfirm: () => router.push("/student")
      });
    } catch (error: any) {
      notification.showAlert({
        title: "Erro",
        description: error.response.data.errorMessage,
        status: "error"
      });
    }
  };

  const { isLoading, execute } = useAsync(handleCreateStudent);

  return (
    <Base>
      <FormCreateCourse onSubmit={execute} isLoading={isLoading} />
    </Base>
  );
};

export default Create;
