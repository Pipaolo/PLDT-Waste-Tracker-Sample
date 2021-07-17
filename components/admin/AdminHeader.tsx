import classnames from "classnames";

interface IProps {
    classNames?:string;
    children?: React.ReactNode;
    title?: string;
}

export const AdminHeader = (props: IProps) => {
    return <div className={classnames('h-24 ', props.classNames)}>
        <span className="font-oswald text-3xl ">{props.title || 'Insert Title'}</span>
    </div>
}