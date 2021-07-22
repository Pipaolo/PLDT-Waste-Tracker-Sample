import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AdminHeader, NavigationBar } from '../../../components';
import { hostname } from '../../../config';
import { useAccessToken } from '../../../hooks/useAccessToken';
import {
  Container,
  InputField,
  MainButton,
  PrivateContainer,
} from '../../../shared_components';
import { useItemPointsStore } from '../../../stores/itemPointsStore';
import { createPointItemScheme } from '../../../utils/validators';

interface CreatePointInput {
  name: string;
  points: number;
}
interface IProps {
  accessToken?: string;
}

const AdminCreatePointsManagerPage = (props: IProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePointInput>({
    resolver: yupResolver(createPointItemScheme),
  });

  const itemPointsState = useItemPointsStore();

  useEffect(() => {
    itemPointsState.reset();
  }, []);

  useEffect(() => {
    if (!itemPointsState.isLoading && itemPointsState.success) {
      router.push(`${hostname}/admin/pointsManager`);
    }
  }, [itemPointsState]);

  const onSubmit = async (data: CreatePointInput) => {
     itemPointsState.createItemPoint(props.accessToken, data);
  };

  return (
    <PrivateContainer className="flex flex-row justify-center w-full gap-4 md:h-screen">
      <Head>
        <title>Create Points Manager</title>
      </Head>
      <NavigationBar className="h-full p-4"></NavigationBar>
      <Container className="w-full p-4">
        <Container className="flex flex-col w-full gap-2 bg-white rounded-lg ">
          <AdminHeader title="Create Item Points"></AdminHeader>
          <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              id="name"
              label="Name"
              register={register('name')}
              error={errors.name}
            />
            <InputField
              id="point"
              label="Points per piece"
              type="number"
              register={register('points')}
              error={errors.points}
            />
            <MainButton
              type="submit"
              className="w-full px-8 py-2 text-white rounded-full ripple-bg-pldt-red"
            >
              Submit
            </MainButton>
          </form>
        </Container>
      </Container>
    </PrivateContainer>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const accessToken = useAccessToken(context.req);

  if (!accessToken) {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    };
  }

  return {
    props: {
      accessToken,
    },
  };
};

export default AdminCreatePointsManagerPage;
