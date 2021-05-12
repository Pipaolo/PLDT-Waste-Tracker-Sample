import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { OutlineButton, InputField, Logo } from "../../shared_components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginScheme } from "../../utils/validators";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { useLoginStore } from "../../stores/loginStore";
import { useEffect } from "react";
import { redirect } from "next/dist/next-server/server/api-utils";

type LoginInput = {
  username: string;
  pin: number;
};

const LoginPage = () => {
  const router = useRouter();
  const loginState = useLoginStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginScheme),
  });

  const onSubmit = async (data: LoginInput) => {
    loginState.login(data.username, data.pin.toString());
  };

  useEffect(() => {
    if (loginState.error) {
      console.log("error");
      toast(loginState.error, {
        autoClose: 2000,
        bodyClassName: "text-red-500",
        hideProgressBar: true,
        position: "bottom-center",
      });

      return;
    }

    if (loginState.success) {
      router.push(`/users/${loginState.success["_id"]}`);
    }
  }, [loginState, router]);

  const buildLoading = () => {
    if (loginState.isLoading) {
      return (
        <div className="w-full flex justify-center">
          <Loader type="TailSpin" color="#E72D2F" height={40} width={40} />
        </div>
      );
    }
    return (
      <div className="w-full flex flex-col">
        <OutlineButton classNames="mt-4" onClick={() => handleSubmit(onSubmit)}>
          <span className="text-center">Login</span>
        </OutlineButton>
        <div className="mt-4 text-center">
          <span className="text-sm">Don't have an account? </span>
          <a
            href="/register"
            className="hover:underline transition duration-300 text-sm text-blue-500"
          >
            Click Here to Register
          </a>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col w-full h-screen p-4 bg-gradient-to-tr from-white to-pldt-red ">
      <Head>
        <title>Login</title>
      </Head>
      <header></header>
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-lg elevation-12 p-8 border-1 border-pldt-red w-full max-w-md ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center h-full w-full gap-4"
          >
            <Logo
              className="self-center w-1/2"
              onClick={() => router.push("/")}
            ></Logo>
            <InputField
              id="username"
              label="Username"
              type="text"
              register={register("username")}
              error={errors.username}
            ></InputField>
            <InputField
              id="pin"
              label="Pin"
              register={register("pin", {
                maxLength: 4,
              })}
              type="password"
              error={errors.pin}
            ></InputField>

            {buildLoading()}
          </form>
        </div>
      </main>
      <footer>Insert Footer</footer>
    </div>
  );
};

export default LoginPage;
