import { axiosInstance, Endpoints } from "@/api";
import FormCreateCourse, {
  ISubmitValues
} from "@/components/Form/FormCreateCourse";
import { useNotification } from "@/contexts/AlertMessageContext";
import useAsync from "@/hook/useAsync";
import usePageTitle from "@/hook/usePageTitle";
import Base from "@/templates/Base";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Edit = () => {
  usePageTitle("Editar Curso");
  const notification = useNotification();
  const [initialValues, setInitialValues] = useState<any>({});
  const router = useRouter();
  const { id } = router.query as { id: string };

  const handleEditCourser = async (values: ISubmitValues) => {
    try {
      await axiosInstance.put(Endpoints.course.update(id), {
        name: values.name,
        description: values.description,
        duration: values.duration,
        students: {
          delete: values.list.toRemove,
          create: values.list.toAdd
        }
      });
      notification.showAlert({
        title: "Sucesso",
        description: "Aluno editado com sucesso",
        status: "success",
        buttonTitle: "Ir para lista de cursos",
        onConfirm: () => router.back()
      });
    } catch (error: any) {
      console.log(error);

      notification.showAlert({
        title: "Erro",
        description: "Erro ao editar curso",
        status: "error"
      });
    }
  };

  const handleGetCourse = async () => {
    try {
      const reponse = await axiosInstance.get(Endpoints.course.get(id));

      const createStudentList = reponse.data.course.Courses_Students.map(
        (item: any) => {
          return {
            id: item.Students.id,
            name: item.Students.name,
            email: item.Students.email
          };
        }
      );

      setInitialValues({
        name: reponse.data.course.name,
        description: reponse.data.course.description,
        duration: reponse.data.course.duration,
        studentList: createStudentList
      });
      return reponse.data.students;
    } catch (error: any) {
      notification.showAlert({
        title: "Erro",
        description: error.response.data.errorMessage,
        status: "error",
        buttonTitle: "Ir para lista de cursos",
        onConfirm: () => router.back()
      });
    }
  };

  const update = useAsync<any, ISubmitValues>(handleEditCourser);
  const get = useAsync(handleGetCourse);

  useEffect(() => {
    get.execute();
  }, []);

  return (
    <Base>
      <FormCreateCourse
        onSubmit={(values) => {
          update.execute(values);
        }}
        isLoading={update.isLoading}
        loadingValues={get.isLoading}
        initialValues={initialValues}
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
