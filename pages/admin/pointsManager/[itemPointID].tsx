import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AdminHeader, NavigationBar } from '../../../components';
import AdminAppbar from '../../../components/admin/AdminAppbar';
import { hostname } from '../../../config';
import { useAccessToken } from '../../../hooks/useAccessToken';
import { ItemPoint } from '../../../models/item_points';
import {
  Container,
  InputField,
  MainButton,
  PrivateContainer,
} from '../../../shared_components';
import { useItemPointsStore } from '../../../stores/itemPointsStore';
import { APIResponse } from '../../../types/api_response';
import { createPointItemScheme } from '../../../utils/validators';

interface EditPointInput {
  name: string;
  points: number;
}
interface IProps {
  accessToken?: string;
  itemPoint?: ItemPoint;
}

const AdminEditItemPointPage = (props: IProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPointInput>({
    resolver: yupResolver(createPointItemScheme),
    defaultValues: {
      name: props.itemPoint.name,
      points: props.itemPoint.points,
    }
  });

  const itemPointsState = useItemPointsStore();

  useEffect(() => {
    if (!itemPointsState.isLoading && itemPointsState.success) {
      router.push(`/admin/pointsManager`);
    }
  }, [itemPointsState]);

  const onSubmit = async (data: EditPointInput) => {
    const updatedItemPoint = { ...props.itemPoint, ...data };

     itemPointsState.editItemPoint(props.accessToken, updatedItemPoint);
  };

  return (
    <PrivateContainer className="flex flex-col w-full h-screen gap-4 p-4 mt-20 bg-black md:p-0 md:flex-row md:mt-0 md:h-screen">
      <Head>
        <title>Edit Points Manager</title>
      </Head>
      <AdminAppbar/>
      <NavigationBar className="h-full p-4"></NavigationBar>
      <Container className="w-full p-4">
        <Container className="flex flex-col w-full gap-2 bg-white rounded-lg ">
          <AdminHeader title="Edit Item Point"></AdminHeader>
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
  const { itemPointID } = context.params;
  const itemPointResponse = await axios.get<APIResponse>(`${hostname}/api/admin/pointsManager/${itemPointID}`, {
    headers:context.req.headers,
  })

  const itemPointData = itemPointResponse.data.data

  return {
    props: {
      accessToken,
      itemPoint: itemPointData,
    },
  };
};

export default AdminEditItemPointPage;
