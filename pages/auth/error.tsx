import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { OutlineButton, InputField, Logo } from "../../shared_components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginScheme } from "../../utils/validators";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { useLoginStore } from "../../stores/loginStore";
import { useEffect } from "react";
import { useSession, getCsrfToken } from "next-auth/client";
import { GetServerSideProps } from "next";

interface IProps {
  error?: string | string[];
}

const ErrorPage = (props: IProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-screen p-4 bg-gradient-to-tr from-white to-pldt-red ">
      <Head>
        <title>Login</title>
      </Head>
      <header></header>
      <main className="flex items-center justify-center flex-1">
        <div className="w-full max-w-md p-8 bg-white rounded-lg elevation-12 border-1 border-pldt-red ">
          <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <span className="text-xl font-bold text-center text-red-500">
              {props.error}
            </span>
            <div className="w-full ">
              <Logo
                className="self-center object-contain w-1/2"
                onClick={() => router.push("/")}
              ></Logo>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center w-full text-sm italic font-semibold opacity-50">
        Powered by GS Solutions
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const query = context.query;

  return {
    props: {
      error: query.error,
    },
  };
};
export default ErrorPage;
