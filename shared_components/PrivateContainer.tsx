import { useSession } from "next-auth/client";
import classnames from "classnames";
import { useRouter } from "next/router";
import { useEffect } from "react";
interface IProps {
  className: string;
  children: React.ReactNode;
}

export const PrivateContainer = (props: IProps) => {
  const router = useRouter();
  const [session, loading] = useSession();
  

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen ">
        <div className="prose">
          <h1 className="prose text-center">Loading...</h1>
        </div>
      </div>
    );
  }
  
  if(!session && !loading) {
      router.replace('/auth/login') ;
  }
  

  return (
    <div className={classnames(["bg-white h-full w-full", props.className])}>
      {props.children}
    </div>
  );
};
