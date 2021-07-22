import classNames from "classnames";
import _ from "lodash";
import { useRouter } from "next/router";
import { Logo } from "../../shared_components";
import { NavigationItem } from "./NavigationItem";

interface IProps {
  className?: string;
  children?: string;
}

interface IRoute {
  route: string;
  name: string;
}

const routes: Array<IRoute> = [
  {
    name: "Dashboard",
    route: '/admin/',
  },
  {
    name: "Transactions",
    route: '/admin/transactions',
  }
]

export const NavigationBar = (props: IProps) => {
  const router = useRouter();
  
  const renderSampleNavigationItems = () => {
    return routes.map((r) => <NavigationItem key={r.name} name={r.name} route={r.route}></NavigationItem>);
  };

  return (
    <div
      className={classNames([
        props.className,
        "w-64  border-gray-500 elevation-8 bg-white",
      ])}
    >
      <div>
      <Logo
                onClick={() => router.push("/")}
                className="object-fill"
                width={200}
                height={60}
                layout="fixed"
              />
      </div>
      <div className='flex flex-col'>
      {renderSampleNavigationItems()}
      </div>
    </div>
  );
};
