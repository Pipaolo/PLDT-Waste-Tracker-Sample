import { assert } from "console";
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/mongodb";
import WasteModel from "../../models/waste";
import { APIError } from "../../types/api_error";
import { APIResponse } from "../../types/api_response";
import { philippineNumberRegex } from "../../utils/validators";

const phoneNumberRegexReplace = RegExp("^(\\+63|0)");

type WasteData = {
  batteries: number;
  phones: number;
  chargers: number;
  phoneNumber: string;
};

const wasteHandler = (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  switch (req.method) {
    case "GET":
      return getWastes(req, res);
    case "POST":
      return createWaste(req, res);
  }
};

const createWaste = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  try {
    // Read the body
    const { batteries, chargers, phones, phoneNumber } = req.body as WasteData;

    if (
      batteries !== null &&
      chargers !== null &&
      phones !== null &&
      phoneNumber !== null
    ) {
      // Check if the received phone number is valid
      if (!philippineNumberRegex.test(phoneNumber)) {
        res.status(400).json({
          error: {
            message: "Invalid Phone Number",
            statusCode: 400,
          },
        });
        return;
      }

      // Remove the prefixes from the phone number to ensure
      // that there are no number duplication
      const filteredPhoneNumber =
        "0" + phoneNumber.replace(phoneNumberRegexReplace, "");

      // Start Checking if there is an existing document
      const existingWasteDocument = await WasteModel.findOne({
        phoneNumber: filteredPhoneNumber,
      }).exec();

      if (existingWasteDocument) {
        existingWasteDocument.batteries = batteries;
        existingWasteDocument.chargers = chargers;
        existingWasteDocument.phones = phones;
        existingWasteDocument.save();

        res.status(200).json({
          data: existingWasteDocument.toJSON(),
        });
        return;
      }

      const document = await WasteModel.create({
        batteries,
        chargers,
        phones,
        phoneNumber,
      });

      res.status(200).json({
        data: document.toJSON(),
      });
      return;
    }

    res.status(400).json({
      error: {
        message: "Error creating waste",
        statusCode: 400,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: error.message,
        statusCode: 400,
      },
    });
  }
};

const getWastes = async (
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) => {
  try {
    const { phoneNumber } = req.query;

    let wastes = [];
    if (phoneNumber) {
      // Check if the received phone number is valid
      if (!philippineNumberRegex.test(phoneNumber.toString())) {
        res.status(400).json({
          error: {
            message: "Invalid Phone Number",
            statusCode: 400,
          },
        });
        return;
      }

      // Remove the prefixes from the phone number to ensure
      // that there are no number duplication
      const filteredPhoneNumber =
        "0" + phoneNumber.toString().replace(phoneNumberRegexReplace, "");

      // Start Fetching the user's Waste Data
      const documents = await WasteModel.find({
        phoneNumber: filteredPhoneNumber,
      }).exec();

      // Convert all the documents into json
      wastes = documents.map((d) => d.toJSON());

      res.status(200).json({
        data: wastes,
      });

      return;
    }

    // Fetch all the wastes data if there are no phone query parameter
    const documents = await WasteModel.find().exec();
    wastes = documents.map((d) => d.toJSON());

    res.status(200).json({
      data: wastes,
    });
  } catch (e) {
    const error: APIError = {
      message: e.toString(),
      statusCode: 400,
    };
    res.status(400).json({
      error,
    });
  }
};

export default connectDB(wasteHandler);
