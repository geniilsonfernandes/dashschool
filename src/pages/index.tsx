import { NextPageContext } from "next";
import { useSession, signOut, getSession } from "next-auth/react";

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

export default function index() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <h1>Olá {session.user.name} </h1>

          <button onClick={() => signOut()}>sair</button>
        </>
      ) : (
        <h1>Olá visitante</h1>
      )}
    </div>
  );
}
