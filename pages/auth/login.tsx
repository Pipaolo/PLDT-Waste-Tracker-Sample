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
  csrfToken: string;
}
type LoginInput = {
  username: string;
  password: string;
};

const LoginPage = ({ csrfToken }: IProps) => {
  const router = useRouter();
  const loginState = useLoginStore();
  const [session,loading] = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginScheme),
  });

  const onSubmit = async (data: LoginInput) => {
    loginState.login(data.username, data.password);
  };

  useEffect(() => {

  }, [loginState, router]);

  const buildLoading = () => {
    if (loading) {
      return (
        <div className="flex justify-center w-full">
          <Loader type="TailSpin" color="#E72D2F" height={40} width={40} />
        </div>
      );
    }
    console.log(session);
    return (
      <div className="flex flex-col w-full">
        <OutlineButton classNames="mt-4" onClick={() => handleSubmit(onSubmit)}>
          <span className="text-center">Login</span>
        </OutlineButton>
      </div>
    );
  };
  return (
    <div className="flex flex-col w-full h-screen p-4 bg-gradient-to-tr from-white to-pldt-red ">
      <Head>
        <title>Login</title>
      </Head>
      <header></header>
      <main className="flex items-center justify-center flex-1">
        <div className="w-full max-w-md p-8 bg-white rounded-lg elevation-12 border-1 border-pldt-red ">
          <form
            className="flex flex-col justify-center w-full h-full gap-4"
            method="post"
            action="/api/auth/callback/credentials"
          >
            <div className="w-full">
              <Logo
                className="self-center object-contain w-1/2"
                onClick={() => router.push("/")}
              ></Logo>
            </div>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <InputField
              id="username"
              label="Username"
              type="text"
              register={register("username")}
              error={errors.username}
            ></InputField>
            <InputField
              id="password"
              label="Password"
              register={register("password")}
              type="password"
              error={errors.password}
            ></InputField>

            {buildLoading()}
          </form>
        </div>
      </main>
      <footer className="flex items-center justify-center w-full text-sm italic font-semibold opacity-50">
        Powered by GS Solutions
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};
export default LoginPage;
