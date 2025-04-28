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

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getDefaultUrl = (): string =>
  typeof window !== "undefined"
    ? document.referrer || "Не вказано"
    : "Не вказано";

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
  const params = getQueryParams();

  // Prepare query string from params
  const queryString = Object.entries(params)
    .filter(([_, value]) => value)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`
    )
    .join("&");

  const payload = {
    message: sendData.message,
    name: sendData.name || "Не вказано",
    surname: sendData.surname || "Не вказано",
    messenger: sendData.messenger || "Не вказано",
    phone: sendData.phone || "Не вказано",
    items: sendData.items || [],
  };

  try {
    const response = await fetch(
      `${API_URL}/api/send-extended-message${
        queryString ? `?${queryString}` : ""
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send data to server: ${errorText}`);
    }
  } catch (error) {
    console.error("Error sending data to server:", error);
    throw new Error("Error sending data to server: " + error);
  }
};
