import { axiosInstance, Endpoints } from "@/api";
import FormCreateCourse, {
  ISubmitValues
} from "@/components/Form/FormCreateCourse";
import usePageTitle from "@/hook/usePageTitle";
import { useNotification } from "@/contexts/AlertMessageContext";
import useAsync from "@/hook/useAsync";
import Base from "@/templates/Base";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

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
  usePageTitle("Criar Curso");
  const notification = useNotification();
  const router = useRouter();
  const handleCreateCourse = async (values: ISubmitValues) => {
    try {
      await axiosInstance.post(Endpoints.course.create(), {
        name: values.name,
        description: values.description,
        duration: values.duration,
        students: values.list.toAdd
      });
      notification.showAlert({
        title: "Sucesso",
        description: "Curso criado com sucesso",
        status: "success",
        buttonTitle: "Ir para lista de Cursos",
        onConfirm: () => router.push("/courses"),
        onClickOutside: () => router.push("/courses")
      });
    } catch (error: any) {
      notification.showAlert({
        title: "Erro",
        description: error.response.data.errorMessage,
        status: "error"
      });
    }
  };

  const { isLoading, execute } = useAsync<any, ISubmitValues>(
    handleCreateCourse
  );

  return (
    <Base>
      <FormCreateCourse
        onSubmit={(values) => execute(values)}
        isLoading={isLoading}
      />
    </Base>
  );
};

export default Create;
