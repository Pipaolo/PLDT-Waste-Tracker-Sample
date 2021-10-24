import { Container, PrivateContainer } from '../../../shared_components';
import Head from 'next/head';
import AdminAppbar from '../../../components/admin/AdminAppbar';
import { AdminHeader, NavigationBar } from '../../../components';
const SettingsPage = () => {
  return (
    <PrivateContainer className="flex flex-col w-full h-screen gap-4 p-4 mt-20 bg-black md:p-0 md:flex-row md:mt-0 md:h-screen">
      <Head>
        <title>Settings</title>
      </Head>
      <AdminAppbar />
      <NavigationBar className="h-full p-4" />
      <Container className="w-full p-4">
        <Container className="flex flex-col w-full bg-white rounded-lg ">
          <AdminHeader title="Settings" />
        </Container>
      </Container>
    </PrivateContainer>
  );
};

export default SettingsPage;
