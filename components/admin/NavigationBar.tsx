import classNames from "classnames"

interface IProps {
    className?:string;
    children?:string;
}
export const NavigationBar = (props:IProps) => {
    return <div className={classNames([props.className, 'w-64 rounded-3xl  border-gray-500 elevation-8'])}>Navigation Bar</div>
}