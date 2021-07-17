import{ useSession, }from "next-auth/client";
import classnames from "classnames";
import { useRouter } from "next/router";
import { useEffect } from "react";
interface IProps {
    className: string;
    children: React.ReactNode;
}

export const PrivateContainer = (props:IProps) => {
    const router = useRouter();
    const [session, loading] = useSession();

    useEffect(() => {
        if(!session && !loading){
            router.replace("/auth/login");
        }
    },[session, loading]);
    

    const renderLoading = () => {
        if(!loading && session){
            console.log(session);
            return props.children;
        }
        return <div>Loading...</div>
    }
    return <div className={classnames(['bg-white h-full w-full', props.className])}>{renderLoading()}</div>
}