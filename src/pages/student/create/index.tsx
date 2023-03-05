import Base from "@/templates/Base";
import Form, { IFormValues } from "../../../components/Form/FormCreateUser";

const Create = () => {
  const handleCreateUser = (values: IFormValues) => {
    console.log(values);
  };

  return (
    <Base>
      <Form onSubmit={handleCreateUser} />
    </Base>
  );
};

export default Create;
