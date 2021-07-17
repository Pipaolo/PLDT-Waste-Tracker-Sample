import classNames from "classnames"
import { useRouter } from "next/router"
import { Logo } from "../../shared_components"

interface IProps {
    className?: string;
    children?: React.ReactNode;
}


export const AdminFooter = (props: IProps) => {
    const router = useRouter();

    return <div className={classNames(['h-24 w-full flex justify-center', props.className])}>
            <Logo
                onClick={() => router.push("/")}
                className="object-fill"
                width={200}
                height={60}
                layout="fixed"
              />
    </div>
}