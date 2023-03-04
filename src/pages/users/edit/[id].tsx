import { useRouter } from "next/router";
import React from "react";
import Base from "@/templates/Base";
import Form, { IFormValues } from "../../../components/Form/FormCreateUser";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const handleEditUser = (values: IFormValues) => {
    console.log(values, id);
  };

  const initialValues = {
    name: "string",
    email: "genilson@gmail.com",
    password: "string",
    confirmPassword: "string"
  };

  return (
    <Base>
      <Form onSubmit={handleEditUser} initialValues={initialValues} isLoading />
    </Base>
  );
};

export default Edit;
