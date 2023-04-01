import Banner from "@/components/Banner";
import Courses from "@/components/Courses";
import Base from "@/templates/Base";
import { Box } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

const Dashboard = () => {
  const session = useSession();

  return (
    <Base>
      <Box width="100%" mt="48px">
        <Banner name={session?.data?.user.name} />
        <Courses />
      </Box>
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

export default Dashboard;
