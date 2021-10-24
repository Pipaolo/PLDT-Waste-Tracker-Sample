import { Container, PrivateContainer } from '../../shared_components';
import Head from 'next/head';
import { AdminFooter, AdminHeader, NavigationBar } from '../../components';
import { GetServerSideProps } from 'next';
import { WasteTransaction } from '../../models/waste_transaction';
import axios from 'axios';
import { APIResponse } from '../../types/api_response';
import { hostname } from '../../config';
import { WasteTransactionStats } from '../../types/waste_transaction_stats';
import { ResponsivePie } from '@nivo/pie';
import { getSession, useSession } from 'next-auth/client';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest } from 'next-auth/internals/utils';
import AdminAppbar from '../../components/admin/AdminAppbar';

interface IProps {
  transactions?:
    | {
        daily?: any[] | undefined;
        overall?: any[] | undefined;
      }
    | undefined;
}

const AdminPage = (props: IProps) => {
  const session = useSession();
  console.log(session);
  const renderTransactionsStats = () => {
    return (
      <div className="flex flex-col items-center w-full h-full gap-4 p-8 bg-white border-2 border-gray-200 rounded-lg md:gap-0 md:grid md:grid-cols-2 md:h-72">
        <div className="flex flex-col items-center w-full md:h-full h-72">
          <ResponsivePie
            data={props.transactions.overall}
            animate={true}
            enableArcLinkLabels={false}
            fit={true}
            transitionMode="centerRadius"
            motionConfig="wobbly"
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
          <span>Overall Transactions</span>
        </div>
        <div className="flex flex-col items-center w-full md:h-full h-72">
          <ResponsivePie
            data={props.transactions.daily}
            animate={true}
            enableArcLinkLabels={false}
            transitionMode="centerRadius"
            motionConfig="wobbly"
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
          <span>Daily Transactions</span>
        </div>
      </div>
    );
  };
  return (
    <PrivateContainer className="flex flex-col w-full h-screen gap-4 p-4 mt-20 bg-black md:p-0 md:flex-row md:mt-0 md:h-screen">
      <Head>
        <title>Admin Panel</title>
      </Head>
      <AdminAppbar />
      <NavigationBar className="h-full p-4"></NavigationBar>
      <Container className="w-full md:p-4">
        <Container className="flex flex-col w-full bg-white rounded-lg ">
          <AdminHeader title="Dashboard"></AdminHeader>
          <Container className="flex flex-col w-full gap-4 ">
            <div className="prose">
              <h2 className="font-oswald">Transactions</h2>
            </div>
            <Container className="w-full">
              {renderTransactionsStats()}
            </Container>
          </Container>
        </Container>
      </Container>
    </PrivateContainer>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  try {
    const dailyTransactionsResponse = await axios.get<APIResponse>(
      `${hostname}/api/admin/statistics/transactions?sortBy=DAILY`,
      {
        headers: context.req.headers,
      }
    );
    const allTransactionsResponse = await axios.get<APIResponse>(
      `${hostname}/api/admin/statistics/transactions`,
      {
        headers: context.req.headers,
      }
    );

    // Convert the responses into the chart readable format
    const dailyTransactionsData = dailyTransactionsResponse.data
      ? dailyTransactionsResponse.data.data
      : {};
    const allTransactionsData = allTransactionsResponse.data
      ? allTransactionsResponse.data.data
      : {};
    const allTransactionsChartData = Object.keys(allTransactionsData).map(
      (key) => ({
        id: key,
        value: allTransactionsData[key],
      })
    );

    const dailyTransactionsChartData = Object.keys(dailyTransactionsData).map(
      (key) => ({
        id: key,
        value: dailyTransactionsData[key],
      })
    );

    return {
      props: {
        transactions: {
          daily: dailyTransactionsChartData || [],
          overall: allTransactionsChartData || [],
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        transactions: {
          daily: [],
          overall: [],
        },
      },
    };
  }
};

export default AdminPage;
