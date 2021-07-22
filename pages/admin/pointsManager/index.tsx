import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getCookieParser } from 'next/dist/next-server/server/api-utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { actions, Column, useTable } from 'react-table';
import { AdminHeader, NavigationBar } from '../../../components';
import { hostname } from '../../../config';
import { useAccessToken } from '../../../hooks/useAccessToken';
import { ItemPoint } from '../../../models/item_points';
import { WasteTransaction } from '../../../models/waste_transaction';
import {
  Container,
  MainButton,
  OutlineButton,
  PrivateContainer,
} from '../../../shared_components';
import { useItemPointsStore } from '../../../stores/itemPointsStore';
import { APIResponse } from '../../../types/api_response';

interface IProps {
  accessToken?: string;
  itemPoints?: ItemPoint[];
}

const AdminPointsManagerPage = (props: IProps) => {
  const router = useRouter();
  const itemPointsState = useItemPointsStore();
  
  useEffect(() => {
    itemPointsState.getItemPoints(props.itemPoints);
  }, [props, itemPointsState.getItemPoints]);

  const columns: Array<Column<ItemPoint>> = useMemo(
    () => [
      {
        Header: 'Item Name',
        accessor: 'name',
      },
      {
        Header: 'Points per Item',
        accessor: 'points',
      },
    ],
    [itemPointsState]
  );

  const data: Array<ItemPoint> = useMemo(() => itemPointsState.data, [itemPointsState]);
  
  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  
  const handleOnCreateButtonPressed = () => {
    itemPointsState.reset();
    router.push('/admin/pointsManager/create');
  };

  const handleOnEditButtonPressed = async (item) => {
    itemPointsState.reset();
    router.push(`/admin/pointsManager/${item._id}`);
  };
  
  const handleOnDeleteButtonPressed = async (item) => {
     itemPointsState.deleteItemPoint(props.accessToken, item._id);
  };


  return (
    <PrivateContainer className="flex flex-row justify-center w-full gap-4 md:h-screen">
      <Head>
        <title>Points Manager</title>
      </Head>
      <NavigationBar className="h-full p-4"></NavigationBar>
      <Container className="w-full p-4">
        <Container className="flex flex-col w-full gap-2 bg-white rounded-lg ">
          <AdminHeader title="Points Manager"></AdminHeader>
          <MainButton
            className="self-end px-8 py-2 text-white rounded-lg ripple-bg-green-400 elevation-3 w-min"
            onClick={handleOnCreateButtonPressed}
          >
            <span className="font-bold">Create</span>
          </MainButton>
          <table className="table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((col) => (
                    <th {...col.getHeaderProps()}>{col.render('Header')}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                    <td>
                      <div className="flex justify-center w-full gap-4">
                        <MainButton
                          onClick={() =>
                            handleOnEditButtonPressed(row.original)
                          }
                          className="px-8 py-2 text-white duration-300 rounded-lg ripple-bg-blue-500"
                        >
                          Edit
                        </MainButton>
                        <MainButton
                          onClick={() =>
                            handleOnDeleteButtonPressed(row.original)
                          }
                          className="px-8 py-2 text-white duration-300 rounded-lg ripple-bg-red-500"
                        >
                          Delete
                        </MainButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
      </Container>
    </PrivateContainer>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  try {
    const token = useAccessToken(context.req);

    if (!token) {
      return {
        props: {},
        redirect: {
          destination: '/auth/login',
        },
      };
    }

    const itemPointsResponse = await axios.get<APIResponse>(
      `${hostname}/api/admin/pointsManager`,
      {
        headers: context.req.headers,
      }
    );

    const itemPointsData = itemPointsResponse.data.data || [];

    return {
      props: {
        accessToken: token,
        itemPoints: itemPointsData,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default AdminPointsManagerPage;
