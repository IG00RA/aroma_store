interface FormData {
  message: string;
  name?: string;
  surname?: string;
  messenger?: string;
  phone?: string;
  items?: Array<{ color: string; quantity: number }>;
}

interface QueryParams {
  [key: string]: string | null | undefined;
  refId?: string | null | undefined;
  sub1?: string | null | undefined;
  sub2?: string | null | undefined;
  sub3?: string | null | undefined;
  sub4?: string | null | undefined;
  sub5?: string | null | undefined;
  sub6?: string | null | undefined;
  sub7?: string | null | undefined;
  sub8?: string | null | undefined;
  fbp?: string | null | undefined;
}

const ANALYTIC_BOT_TOKEN = import.meta.env.VITE_ANALYTIC_BOT_TOKEN || "";
const ANALYTIC_CHAT_ID = import.meta.env.VITE_ANALYTIC_CHAT_ID || "";

const getDefaultUrl = (): string =>
  typeof window !== "undefined"
    ? document.referrer || "Не вказано"
    : "Не вказано";

const url = getDefaultUrl();

function getParamString(queryParams: QueryParams): string {
  let message = "";
  for (const key in queryParams) {
    if (queryParams[key]) {
      message += `${key} <b>${queryParams[key]}</b>\n`;
    }
  }
  return message;
}

const getQueryParams = (): QueryParams => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    refId: searchParams.get("ref_id"),
    sub1: searchParams.get("sub1"),
    sub2: searchParams.get("sub2"),
    sub3: searchParams.get("sub3"),
    sub4: searchParams.get("sub4"),
    sub5: searchParams.get("sub5"),
    sub6: searchParams.get("sub6"),
    sub7: searchParams.get("sub7"),
    sub8: searchParams.get("sub8"),
    fbp: searchParams.get("fbp"),
  };
};

export const sendMessage = async (sendData: FormData): Promise<void> => {
  let botMessage = `<b>${sendData.message}</b>\n`;
  botMessage += `Імя: <b>${sendData.name}</b>\n`;
  botMessage += `Прізвище: <b>${sendData.surname}</b>\n`;
  botMessage += `Месенджер: <b>${sendData.messenger}</b>\n`;
  botMessage += `Телефон: <b>${sendData.phone}</b>\n`;
  botMessage += `Url: <b>${url}</b>\n`;

  // Додавання інформації про товари
  if (sendData.items && sendData.items.length > 0) {
    botMessage += `\n<b>Товари:</b>\n`;
    sendData.items.forEach((item, index) => {
      botMessage += `${index + 1}. Колір: <b>${item.color}</b>, Кількість: <b>${
        item.quantity
      }</b>\n`;
    });
  }

  const params = getQueryParams();
  botMessage += getParamString(params);

  const urlBot = `https://api.telegram.org/bot${ANALYTIC_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: ANALYTIC_CHAT_ID,
    parse_mode: "html",
    text: botMessage,
  };

  try {
    const response = await fetch(urlBot, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send data to Telegram: ${errorText}`);
    }
  } catch (error) {
    console.error("Error sending data to Telegram:", error);
    throw new Error("Error sending data to Telegram: " + error);
  }
};
