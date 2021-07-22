import classnames from "classnames";
import { Divider } from "../../shared_components";

interface IProps {
    classNames?:string;
    children?: React.ReactNode;
    title?: string;
}

export const AdminHeader = (props: IProps) => {
    return <div className={classnames('h-24 ', props.classNames)}>
        <span className="text-3xl font-oswald ">{props.title || 'Insert Title'}</span>
        <Divider className="mt-4"/>
    </div>
}