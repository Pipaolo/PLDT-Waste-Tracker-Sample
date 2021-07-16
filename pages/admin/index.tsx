import { Container } from "../../shared_components/Container";
import Head from "next/head";
const AdminPage = () => {
  return (
    <Container className="flex flex-col bg-black md:h-screen">
      <Head>
        <title>Admin Panel</title>
      </Head>
      <div>Admin Panel Sample</div>
    </Container>
  );
};

export default AdminPage;
