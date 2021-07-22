import { Container, PrivateContainer } from "../../shared_components";
import Head from "next/head";
import { AdminFooter, AdminHeader, NavigationBar } from "../../components";

const AdminPage = () => {
  return (
    <PrivateContainer className="flex flex-col bg-black md:h-screen ">
      <Head>
        <title>Admin Panel</title>
      </Head>
      <Container className="flex w-full gap-2 p-2">
        <NavigationBar className="h-full p-4"></NavigationBar>
        <div className="flex flex-col justify-between w-full gap-2">
          <AdminHeader classNames="p-4" title="Dashboard"></AdminHeader>
          <Container className="flex flex-wrap gap-4 overflow-y-auto overflow-x-hidden">
            <div className=" h-32 w-64 bg-white border-2 border-gray-200 rounded-lg flex justify-center items-center ">
              Sample Content
            </div>
          </Container>
          <AdminFooter className=" p-4"></AdminFooter>
        </div>
      </Container>
    </PrivateContainer>
  );
};

export default AdminPage;
