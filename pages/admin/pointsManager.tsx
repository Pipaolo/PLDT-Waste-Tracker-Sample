import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { AdminHeader, NavigationBar } from "../../components";
import { hostname } from "../../config";
import { WasteTransaction } from "../../models/waste_transaction";
import {
  Container,
  MainButton,
  OutlineButton,
  PrivateContainer,
} from "../../shared_components";
import { APIResponse } from "../../types/api_response";


interface IProps {
  transactions: Array<WasteTransaction>
}

const AdminPointsManagerPage = (props: IProps) => {
  return (
    <PrivateContainer className="flex flex-row justify-center w-full gap-4 md:h-screen">
      <Head>
        <title>Points Manager</title>
      </Head>
      <NavigationBar className="h-full p-4"></NavigationBar>
      <Container className="w-full p-4">
        <Container className="flex flex-col w-full gap-2 bg-white rounded-lg ">
          <AdminHeader title="Points Manager"></AdminHeader>
          <MainButton className='self-end px-8 prose text-white bg-green-300 rounded-lg w-min' onClick={() => {}}>Create</MainButton>
          <table className="table">
            <thead className="border border-solid">
              <tr>
                <th>Item</th>
                <th>Points Per Item</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="p-4 border-2">
                <td>Sample</td>
                <td>Sample</td>
                <td>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <MainButton className='text-white rounded-lg ripple-bg-blue-400' onClick={() => {}}>Edit</MainButton>
                    <MainButton className='text-white rounded-lg ripple-bg-pldt-red' onClick={() => {}}>Delete</MainButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Container>
      </Container>
    </PrivateContainer>
  );
};

export const getServerSideProps:GetServerSideProps<IProps> = async (context) => {
  try {
    // TODO: Fetch transactions from the database
    const response = await axios.get<APIResponse>(`${hostname}/api/transactions`);
    console.log(response.data.data);
    return {
      props: {
        transactions: [],
      }
    }
  } catch (error) {
    return {
      props: {
        transactions: [],
      }
    }
  }
}

export default AdminPointsManagerPage;
