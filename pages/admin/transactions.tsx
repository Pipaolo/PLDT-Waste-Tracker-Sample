import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { useMemo } from 'react';
import { AdminHeader, NavigationBar } from '../../components';
import { hostname } from '../../config';
import { WasteTransaction } from '../../models/waste_transaction';
import { Container, PrivateContainer } from '../../shared_components';
import { APIResponse } from '../../types/api_response';
import { useTable, Column } from 'react-table';
import moment from 'moment';
import AdminAppbar from '../../components/admin/AdminAppbar';

interface IProps {
  transactions: Array<WasteTransaction>;
}
const AdminTransactionsPage = (props: IProps) => {
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
      data: props.transactions,
    });

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
          <table className="table" {...getTableProps()}>
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
        </Container>
      </Container>
    </PrivateContainer>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  try {
    const response = await axios.get<APIResponse>(
      `${hostname}/api/admin/transactions`,
      { headers: context.req.headers }
    );
    const transactions = response.data.data as Array<WasteTransaction>;

    // Start converting the transcations createdAt date
    const parsedTransactions = transactions.map((t) => ({
      ...t,
      createdAt: moment(t.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
    }));

    return {
      props: {
        transactions,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        transactions: [],
      },
    };
  }
};

export default AdminTransactionsPage;
