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
  phoneNumber: string;
  password: string;
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
    loginState.login(data.phoneNumber, data.password);
  };

  useEffect(() => {
    if (loginState.error) {
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
        <div className="flex justify-center w-full">
          <Loader type="TailSpin" color="#E72D2F" height={40} width={40} />
        </div>
      );
    }
    return (
      <div className="flex flex-col w-full">
        <OutlineButton classNames="mt-4" onClick={() => handleSubmit(onSubmit)}>
          <span className="text-center">Login</span>
        </OutlineButton>
        <div className="mt-4 text-center">
          <span className="text-sm">Don't have an account? </span>
          <a
            href="/register"
            className="text-sm text-blue-500 transition duration-300 hover:underline"
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
      <main className="flex items-center justify-center flex-1">
        <div className="w-full max-w-md p-8 bg-white rounded-lg elevation-12 border-1 border-pldt-red ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center w-full h-full gap-4"
          >
            <div className="w-full">
              <Logo
                className="self-center object-contain w-1/2"
                onClick={() => router.push("/")}
              ></Logo>
            </div>
            <InputField
              id="phoneNumber"
              label="Phone Number"
              type="tel"
              register={register("phoneNumber")}
              error={errors.phoneNumber}
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

export default LoginPage;
