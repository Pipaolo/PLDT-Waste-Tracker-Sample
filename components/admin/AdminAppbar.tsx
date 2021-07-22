import { MenuSolid } from '@graywolfai/react-heroicons';
import { Logo } from '../../shared_components';
import { AiOutlineMenu } from 'react-icons/ai/index';
import { useDrawerStore } from '../../stores/drawerStore';
const AdminAppbar = () => {
  const drawerState = useDrawerStore();

  const handleOnMenuPressed = () => {
    if (drawerState.isOpen) {
      drawerState.closeDrawer();
      return;
    }
    drawerState.openDrawer();
  };

  return (
    <div className="absolute inset-x-0 top-0 flex w-full h-20 p-4 elevation-4 md:hidden">
      <div className="flex items-center">
        <AiOutlineMenu
          className="w-12 h-12 p-2 rounded-full ripple-bg-white"
          onClick={handleOnMenuPressed}
        ></AiOutlineMenu>
        <Logo height={50} width={150} layout="fixed" />
      </div>
    </div>
  );
};

export default AdminAppbar;
