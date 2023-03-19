import { axiosInstance, Endpoints } from "@/api";
import FormCreateCourse, {
  IFormCreateCourseValues
} from "@/components/Form/FormCreateCourse";
import { IStudent } from "@/components/SearchStudent";
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
  const notification = useNotification();
  const router = useRouter();
  const handleCreateCourse = async (args: {
    value: IFormCreateCourseValues;
    student: IStudent[];
  }) => {
    try {
      const { value, student } = args;
      const createStudentList = (list: IStudent[]) => {
        if (!list) return [];
        return list.map((item) => item.id);
      };

      await axiosInstance.post(Endpoints.course.create(), {
        name: value.name,
        description: value.description,
        duration: value.duration,
        students: createStudentList(student)
      });
      notification.showAlert({
        title: "Sucesso",
        description: "Curso criado com sucesso",
        status: "success",
        buttonTitle: "Ir para lista de alunos",
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

  const { isLoading, execute } = useAsync(handleCreateCourse);

  return (
    <Base>
      <FormCreateCourse
        onSubmit={(value, student) => execute({ value, student })}
        isLoading={isLoading}
      />
    </Base>
  );
};

export default Create;
