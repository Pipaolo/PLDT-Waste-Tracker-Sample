import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { useMemo } from 'react';
import { AdminHeader, NavigationBar } from '../../../components';
import { hostname } from '../../../config';
import { WasteTransaction } from '../../../models/waste_transaction';
import { Container, PrivateContainer } from '../../../shared_components';
import { APIResponse } from '../../../types/api_response';
import { useTable, Column } from 'react-table';
import moment from 'moment';
import AdminAppbar from '../../../components/admin/AdminAppbar';
import { useWasteTransactionsStore } from '../../../stores/wasteTransactionsStore';
import { useEffect } from 'react';
import { useAccessToken } from '../../../hooks/useAccessToken';
import Loader from 'react-loader-spinner';

interface IProps {
  accessToken?: string;
}

const AdminTransactionsPage = (props: IProps) => {
  const wasteTransactionsState = useWasteTransactionsStore();

  useEffect(() => {
    wasteTransactionsState.getWasteTransactions(props.accessToken);
  }, []);

  const columns: Array<Column<WasteTransaction>> = useMemo(
    () => [
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Batteries',
        accessor: 'batteries',
      },
      {
        Header: 'Phones',
        accessor: 'phones',
      },
      {
        Header: 'Chargers',
        accessor: 'chargers',
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
      },
    ],
    []
  );

  const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: wasteTransactionsState.data,
    });

  const renderLoading = () => {
    if (wasteTransactionsState.isLoading && !wasteTransactionsState.success) {
      return (
        <div className="flex justify-center w-full">
          <Loader type="TailSpin" color="#E72D2F" height={40} width={40} />
        </div>
      );
    }
    

    return  <table className="table" {...getTableProps()}>
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((col) => (
            <th {...col.getHeaderProps()}>{col.render('Header')}</th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  </table>
  };

  return (
    <PrivateContainer className="flex flex-col w-full h-screen gap-4 p-4 mt-20 bg-black md:p-0 md:flex-row md:mt-0 md:h-screen">
      <Head>
        <title>Transactions</title>
      </Head>
      <AdminAppbar />
      <NavigationBar className="h-full p-4"></NavigationBar>
      <Container className="w-full p-4">
        <Container className="flex flex-col w-full bg-white rounded-lg ">
          <AdminHeader title="Transactions"></AdminHeader>
          {renderLoading()}
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

    return {
      props: {
        accessToken: token,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default AdminTransactionsPage;
