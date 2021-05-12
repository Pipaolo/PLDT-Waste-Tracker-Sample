import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { hostname } from "../../config";
import { IUser } from "../../models/user";
import { Logo, OutlineButton } from "../../shared_components";

interface UserProps {
  data: IUser;
}

const UsersPage = ({ data }: UserProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-screen p-4 bg-gradient-to-tr from-white to-pldt-red ">
      <Head>
        <title>{data.name}</title>
      </Head>
      <header></header>
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center bg-white rounded-lg elevation-12 p-8 border-1 border-pldt-red w-full max-w-md gap-12">
          <div className="w-full">
            <Logo onClick={() => router.push("/")} className="object-contain" />
          </div>
          <div className="flex flex-col justify-center items-center w-full space-y-12">
            <div className="font-bold text-xl">Hi! {data.name}</div>
            <div className="font-light mt-8">
              Current Points: <span className="font-bold">{data.points}</span>
            </div>

            <OutlineButton classNames="w-full" onClick={() => router.push("/")}>
              <span>Logout</span>
            </OutlineButton>
          </div>
        </div>
      </main>
      <footer className="w-full flex justify-center items-center text-sm font-semibold italic opacity-50">
        Powered by GS Solutions
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<UserProps> = async (
  context
) => {
  const { userID } = context.query;

  const response = await fetch(`${hostname}/api/users/${userID}`);
  const result = await response.json();

  // If there are no user found redirect them to the homepage
  if (result.error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      data: result.data as IUser,
    },
  };
};

export default UsersPage;
