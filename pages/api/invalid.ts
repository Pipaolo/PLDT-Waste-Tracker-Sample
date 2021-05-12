import { NextApiHandler, NextApiResponse } from "next";
import { APIError } from "../../types/api_error";
import { APIResponse } from "../../types/api_response";

const invalidHandler: NextApiHandler = (
  req,
  res: NextApiResponse<APIResponse>
) => {
  const error: APIError = {
    message: "Route not found",
    statusCode: 404,
  };
  const response: APIResponse = {
    error,
  };

  res.status(404).json(response);
};

export default invalidHandler;
