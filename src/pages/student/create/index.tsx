import useAsync from "@/hook/useAsync";
import Base from "@/templates/Base";
import Form, { IFormValues } from "../../../components/Form/FormCreateUser";
import { axiosInstance, Endpoints } from "@/api";
import { useNotification } from "@/contexts/AlertMessageContext";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import usePageTitle from "@/hook/usePageTitle";

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
  usePageTitle("Criar Aluno");
  const notification = useNotification();
  const router = useRouter();
  const handleCreateStudent = async (values: IFormValues) => {
    try {
      await axiosInstance.post(Endpoints.student.create(), {
        name: values.name,
        email: values.email,
        password: values.password
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
      <Form onSubmit={execute} isLoading={isLoading} />
    </Base>
  );
};

export default Create;
