import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/mongodb";
import WasteModel from "../../models/waste";
import UserModel from "../../models/user";
import { APIError } from "../../types/api_error";
import { APIResponse } from "../../types/api_response";
import { generalizePhoneNumber } from "../../utils/converters";
import { philippineNumberRegex } from "../../utils/validators";
import WasteTransactionModel from "../../models/waste_transaction";

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
      const generalizedPhoneNumber = generalizePhoneNumber(phoneNumber);

      const userDocument = await UserModel.findOne({
        phoneNumber: generalizedPhoneNumber,
      });

      if (!userDocument) {
        throw Error("There are no existing user with that number..");
      }

      let wasteDocument = await WasteModel.findOne({
        phoneNumber: generalizedPhoneNumber,
      });

      if (wasteDocument) {
        // Start updating the document
        wasteDocument.batteries += batteries;
        wasteDocument.chargers += chargers;
        wasteDocument.phones += phones;

        await wasteDocument.save();
      } else {
        // Create a brand new Waste Document
        wasteDocument = await WasteModel.create({
          batteries,
          chargers,
          phones,
          phoneNumber: generalizedPhoneNumber,
        });
      }

      // Store the transaction
      await WasteTransactionModel.create({
        batteries,
        chargers,
        phones,
        phoneNumber: generalizedPhoneNumber,
      });

      // Update the User's points
      userDocument.points +=
        wasteDocument.batteries + wasteDocument.chargers + wasteDocument.phones;

      await userDocument.save();

      res.status(200).json({
        data: wasteDocument.toObject(),
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
      const generalizedPhoneNumber = generalizePhoneNumber(
        phoneNumber.toString()
      );

      // Search for an existing waste documetn
      const waste = await WasteModel.findOne({
        phoneNumber: generalizedPhoneNumber,
      }).lean();

      const wasteTransactions = await WasteTransactionModel.find(
        {
          phoneNumber: generalizedPhoneNumber,
        },
        null,
        {
          sort: {
            createdAt: -1,
          },
        }
      ).lean();

      const data = {
        waste: waste,
        transactions: wasteTransactions,
      };

      // Convert all the documents into json
      res.status(200).json({
        data,
      });

      return;
    }

    // Fetch all the wastes data if there are no phone query parameter
    const wastes = await WasteModel.find().lean();

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
