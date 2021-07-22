import { Container, PrivateContainer } from "../../shared_components";
import Head from "next/head";
import { AdminFooter, AdminHeader, NavigationBar } from "../../components";

const AdminPage = () => {
  return (
    <PrivateContainer className="flex justify-between w-full h-screen gap-4 bg-black md:h-screen">
      <Head>
        <title>Admin Panel</title>
      </Head>
      <NavigationBar className="h-full p-4"></NavigationBar>
      <Container className="w-full p-4">
        <Container className="flex flex-col w-full bg-white rounded-lg ">
          <AdminHeader title="Dashboard"></AdminHeader>
          <Container className="flex flex-col gap-4 prose md:prose-sm">
            <h1 className="font-oswald">Transactions</h1>
            <Container className="grid grid-cols-2">
               <div className="flex items-center justify-center w-64 h-32 bg-white border-2 border-gray-200 rounded-lg ">
                Sample Content
              </div>
            </Container>
          </Container>
        </Container>
      </Container>
    </PrivateContainer>
  );
};

export default AdminPage;
