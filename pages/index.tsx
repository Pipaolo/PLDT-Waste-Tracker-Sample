import Head from "next/head";
import { useRouter } from "next/router";
import { MainButton } from "../shared_components";
export default function Home() {
  const router = useRouter();
  const handleOnGetStartedPressed = () => {
    router.push("/register");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen p-4 bg-gradient-to-tr from-white to-pldt-red ">
      <Head>
        <title>PLDT Smart Waste Tracker</title>
      </Head>
      <header></header>
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-lg elevation-12 p-8 border-1 border-pldt-red ">
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src="https://my.pldthome.com/Assets/images/header/default/logo.png"
              alt="PLDT Logo"
            />
            <div className="text-2xl font-bold text-black text-center">
              PLDT Smart Waste Points Tracker!
            </div>
            <div className="text-sm text-black">
              Keep track of your points at the comfort of your home
            </div>
            <div className="mt-8 flex flex-col items-center justify-center">
              <MainButton onClick={handleOnGetStartedPressed}>
                <span className="text-white font-bold">Get Started</span>
              </MainButton>
              <div className="mt-4 text-center">
                <span className="text-sm">Already have an account? </span>
                <a
                  href="/login"
                  className="hover:underline transition duration-300 text-sm text-blue-500"
                >
                  Click Here to Sign in
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>Insert Footer</footer>
    </div>
  );
}
