import Head from "next/head";
import { useRouter } from "next/router";
import { MainButton, Logo } from "../shared_components";
export default function Home() {
  const router = useRouter();
  const handleOnGetStartedPressed = () => {
    router.push("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4 bg-gradient-to-tr from-white to-pldt-red ">
      <Head>
        <title>PLDT Smart Waste Tracker</title>
      </Head>
      <main className="flex items-center justify-center flex-1">
        <div className="p-8 bg-white rounded-lg elevation-12 border-1 border-pldt-red ">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full">
              <Logo
                onClick={() => router.push("/")}
                className="object-contain"
              />
            </div>
            <div className="mt-12 text-2xl font-bold text-center text-black">
              PLDT Smart Waste Points Tracker!
            </div>
            <div className="text-sm text-black">
              Keep track of your points at the comfort of your home
            </div>
            <div className="flex flex-col items-center justify-center mt-12 space-y-2">
              <MainButton onClick={handleOnGetStartedPressed}>
                <span className="font-bold text-white">Get Started</span>
              </MainButton>
              <div className="text-center">
                <span className="text-sm">Already have an account? </span>
                <a
                  href="/login"
                  className="text-sm text-blue-500 transition duration-300 hover:underline"
                >
                  Click Here to Sign in
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center w-full text-sm italic font-semibold opacity-50">
        Powered by GS Solutions
      </footer>
    </div>
  );
}
