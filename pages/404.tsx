import { Container } from "../shared_components";

const RouteNotFoundPage = () => {
  return (
    <Container className="p-4 flex justify-center items-center w-full h-screen">
      <h1 className="font-bold text-3xl text-gray-600">404 - Route not found!</h1>
    </Container>
  );
};
export default RouteNotFoundPage;
