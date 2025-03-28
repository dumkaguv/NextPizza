import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

interface Props {
  orderId: number;
  amount: number;
  description: string;
}

export const createPayment = async (details: Props) => {
  const { data } = await axios.post<PaymentData>(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: details.amount,
        currency: "RUB",
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID as string,
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        "Content-type": "application/json",
        "Idempotence-key": Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
};
