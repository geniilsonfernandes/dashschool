import useAsync from "@/hook/useAsync";
import Base from "@/templates/Base";
import axios from "axios";
import Form, { IFormValues } from "../../../components/Form/FormCreateUser";

const Create = () => {
  const handleCreateUser = async (values: IFormValues) => {
    try {
      await axios.post("http://localhost:3000/api/student/create", {
        name: values.name,
        email: values.email,
        password: values.password
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, execute } = useAsync(handleCreateUser);

  return (
    <Base>
      <Form onSubmit={execute} isLoading={isLoading} />
    </Base>
  );
};

export default Create;
