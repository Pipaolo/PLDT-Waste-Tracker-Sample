import Head from "next/head";
import React from "react";
import { OutlineButton, Logo, InputField } from "../../shared_components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerScheme } from "../../utils/validators";
import { useState } from "react";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import { useRegisterStore } from "../../stores/registerStore";
import { useEffect } from "react";

type RegisterInput = {
  phoneNumber: string;
  pin: number;
  name: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const registerState = useRegisterStore();

  useEffect(() => {
    if (registerState.error) {
      toast(registerState.error, {
        autoClose: 2000,
        bodyClassName: "text-red-500",
        hideProgressBar: true,
        position: "bottom-center",
      });
      return;
    } else if (registerState.success) {
      toast("Registration Success", {
        autoClose: 2000,
        bodyClassName: "text-green-500",
        hideProgressBar: true,
        position: "bottom-center",
      });
    }
  }, [registerState]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerScheme),
  });

  const onSubmit = async (data: RegisterInput) => {
    // Convert the data by adding points
    const newUser = {
      ...data,
      points: 0,
    };

    registerState.register(JSON.stringify(newUser));
  };

  const buildLoading = () => {
    if (registerState.isLoading) {
      return (
        <div className="w-full flex justify-center">
          <Loader type="TailSpin" color="#E72D2F" height={40} width={40} />
        </div>
      );
    }
    return (
      <div className="w-full flex flex-col">
        <OutlineButton classNames="mt-4" onClick={() => handleSubmit(onSubmit)}>
          <span className="text-center">Register</span>
        </OutlineButton>
        <div className="mt-4 text-center">
          <span className="text-sm">Already have an account? </span>
          <a
            href="/login"
            className="hover:underline transition duration-300 text-sm text-blue-500"
          >
            Click Here to Login
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-screen p-4 bg-gradient-to-tr from-white to-pldt-red ">
      <Head>
        <title>Register</title>
      </Head>
      <header></header>
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-lg elevation-12 p-8 border-1 border-pldt-red w-full max-w-md ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center h-full w-full gap-4"
          >
            <div className="w-full">
              <Logo
                className="object-contain self-center w-1/2"
                onClick={() => router.push("/")}
              ></Logo>
            </div>
            <InputField
              id="name"
              label="Name"
              type="text"
              register={register("name")}
              error={errors.name}
            ></InputField>
            <InputField
              id="phoneNumber"
              label="Phone Number"
              register={register("phoneNumber")}
              type="text"
              error={errors.phoneNumber}
            ></InputField>
            <InputField
              id="pin"
              label="Pin"
              register={register("pin")}
              type="password"
              error={errors.pin}
            ></InputField>

            {buildLoading()}
          </form>
        </div>
      </main>
      <footer className="w-full flex justify-center items-center text-sm font-semibold italic opacity-50">
        Powered by GS Solutions
      </footer>
    </div>
  );
};

export default RegisterPage;
