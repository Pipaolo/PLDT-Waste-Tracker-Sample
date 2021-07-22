import classNames from 'classnames';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useOnClickOutside } from '../../hooks/useClickOutside';
import { Logo } from '../../shared_components';
import { useDrawerStore } from '../../stores/drawerStore';
import { NavigationItem } from './NavigationItem';

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
    name: 'Dashboard',
    route: '/admin/',
  },
  {
    name: 'Transactions',
    route: '/admin/transactions',
  },
  {
    name: 'Points Manager',
    route: '/admin/pointsManager',
  },
];

export const NavigationBar = (props: IProps) => {
  const router = useRouter();
  const ref = useRef();
  const drawerState = useDrawerStore();

  const renderSampleNavigationItems = () => {
    return routes.map((r) => (
      <NavigationItem
        key={r.name}
        name={r.name}
        route={r.route}
      ></NavigationItem>
    ));
  };

  useOnClickOutside(ref, () => {
    if (drawerState.isOpen) {
      drawerState.closeDrawer()
      return;
    }
  }) 


  return (
    <div
      ref={ref}
      className={classNames([
        props.className,
        drawerState.isOpen ? 'translate-x-0 elevation-8' : '-translate-x-full',
        'w-64 fixed transform md:static md:block top-0 left-0 border-gray-500 md:translate-x-0 bg-white md:elevation-8  ease-in-out transition-all duration-300 z-30',
      ])}
    >
      <div>
        <Logo
          onClick={() => router.push('/')}
          className="object-fill"
          width={200}
          height={60}
          layout="fixed"
        />
      </div>
      <div className="flex flex-col">{renderSampleNavigationItems()}</div>
    </div>
  );
};
