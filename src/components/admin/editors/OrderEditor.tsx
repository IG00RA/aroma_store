import React, { useState, useEffect } from "react";
import EditorTemplate from "./EditorTemplate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { AlertCircle, ChevronRight, Globe, FileJson } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProductData {
  productName: string;
  price: number;
  currency: string;
  colors: Array<{ value: string; label: string }>;
  imageUrl: string;
  deliveryInfo: string;
  guaranteeInfo: string;
}

interface IntegrationSettings {
  type: string;
  url: string;
  enabled: boolean;
}

interface PaymentDetails {
  iban: string;
  cardNumber: string;
  bankName: string;
  recipientName: string;
}

const OrderEditor = () => {
  const { toast } = useToast();

  // State for product details
  const [productData, setProductData] = useState<ProductData>({
    productName: "Держатель для ароматических палочек",
    price: 299,
    currency: "UAH",
    colors: [
      { value: "white", label: "Белый" },
      { value: "black", label: "Черный" },
      { value: "blue", label: "Голубой" },
      { value: "beige", label: "Бежевый" },
    ],
    imageUrl: "/placeholder.svg",
    deliveryInfo: "Доставка по всей Украине. Срок доставки: 3-7 рабочих дней",
    guaranteeInfo: "Гарантия возврата денег в течение 30 дней",
  });

  // State for integration settings
  const [integrationSettings, setIntegrationSettings] =
    useState<IntegrationSettings>({
      type: "googleSheets",
      url: "",
      enabled: false,
    });

  // State for payment details
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    iban: "UA213223130000026007233566001",
    cardNumber: "5375 4141 0000 0000",
    bankName: "ПриватБанк",
    recipientName: "ФОП Иванов Иван Иванович",
  });

  const [activeTab, setActiveTab] = useState("product");

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("productData");
    if (savedData) {
      try {
        setProductData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse product data from localStorage", e);
      }
    }

    const savedIntegration = localStorage.getItem("integrationSettings");
    if (savedIntegration) {
      try {
        setIntegrationSettings(JSON.parse(savedIntegration));
      } catch (e) {
        console.error(
          "Failed to parse integration settings from localStorage",
          e
        );
      }
    }

    const savedPaymentDetails = localStorage.getItem("paymentDetails");
    if (savedPaymentDetails) {
      try {
        setPaymentDetails(JSON.parse(savedPaymentDetails));
      } catch (e) {
        console.error("Failed to parse payment details from localStorage", e);
      }
    }
  }, []);

  // Handle form submission
  const handleSaveProduct = () => {
    localStorage.setItem("productData", JSON.stringify(productData));

    toast({
      title: "Настройки товара сохранены",
      description: "Изменения успешно сохранены",
    });
  };

  const handleSaveIntegration = () => {
    localStorage.setItem(
      "integrationSettings",
      JSON.stringify(integrationSettings)
    );

    toast({
      title: "Настройки интеграции сохранены",
      description: "Изменения успешно сохранены",
    });
  };

  const handleSavePaymentDetails = () => {
    localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));

    toast({
      title: "Данные для оплаты сохранены",
      description: "Изменения успешно сохранены",
    });
  };

  // Input change handlers
  const handleProductChange = (field: keyof ProductData, value: any) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  const handleIntegrationChange = (
    field: keyof IntegrationSettings,
    value: any
  ) => {
    setIntegrationSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentDetailsChange = (
    field: keyof PaymentDetails,
    value: string
  ) => {
    setPaymentDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <EditorTemplate
      title="Настройки заказа"
      description="Управление настройками товара, оплаты и интеграций"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="product" className="flex-1">
            Настройки товара
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex-1">
            Данные для оплаты
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex-1">
            Интеграции
          </TabsTrigger>
        </TabsList>

        <TabsContent value="product" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Информация о товаре</CardTitle>
              <CardDescription>
                Настройте информацию о товаре, который будет отображаться в
                секции заказа
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Название товара</Label>
                <Input
                  id="product-name"
                  value={productData.productName}
                  onChange={(e) =>
                    handleProductChange("productName", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Цена</Label>
                  <Input
                    id="product-price"
                    type="number"
                    value={productData.price}
                    onChange={(e) =>
                      handleProductChange("price", Number(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-currency">Валюта</Label>
                  <select
                    id="product-currency"
                    className="w-full border rounded-md h-10 px-3"
                    value={productData.currency}
                    onChange={(e) =>
                      handleProductChange("currency", e.target.value)
                    }
                  >
                    <option value="UAH">Гривна (₴)</option>
                    <option value="USD">Доллар ($)</option>
                    <option value="EUR">Евро (€)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-image">URL изображения товара</Label>
                <Input
                  id="product-image"
                  value={productData.imageUrl}
                  onChange={(e) =>
                    handleProductChange("imageUrl", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery-info">Информация о доставке</Label>
                <Input
                  id="delivery-info"
                  value={productData.deliveryInfo}
                  onChange={(e) =>
                    handleProductChange("deliveryInfo", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guarantee-info">Информация о гарантии</Label>
                <Input
                  id="guarantee-info"
                  value={productData.guaranteeInfo}
                  onChange={(e) =>
                    handleProductChange("guaranteeInfo", e.target.value)
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProduct}>Сохранить</Button>
            </CardFooter>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Совет</AlertTitle>
            <AlertDescription>
              Чтобы добавить или изменить цвета товара, перейдите в секцию{" "}
              <Link to="/admin" className="text-blue-500 hover:underline">
                Описание товара
              </Link>
              .
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Реквизиты для оплаты</CardTitle>
              <CardDescription>
                Настройте реквизиты для оплаты, которые будут отображаться при
                выборе предоплаты
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="iban">IBAN</Label>
                <Input
                  id="iban"
                  value={paymentDetails.iban}
                  onChange={(e) =>
                    handlePaymentDetailsChange("iban", e.target.value)
                  }
                  placeholder="UAXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-number">Номер карты</Label>
                <Input
                  id="card-number"
                  value={paymentDetails.cardNumber}
                  onChange={(e) =>
                    handlePaymentDetailsChange("cardNumber", e.target.value)
                  }
                  placeholder="XXXX XXXX XXXX XXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank-name">Название банка</Label>
                <Input
                  id="bank-name"
                  value={paymentDetails.bankName}
                  onChange={(e) =>
                    handlePaymentDetailsChange("bankName", e.target.value)
                  }
                  placeholder="Например: ПриватБанк"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-name">Получатель платежа</Label>
                <Input
                  id="recipient-name"
                  value={paymentDetails.recipientName}
                  onChange={(e) =>
                    handlePaymentDetailsChange("recipientName", e.target.value)
                  }
                  placeholder="ФОП Иванов Иван Иванович"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePaymentDetails}>Сохранить</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройки интеграции</CardTitle>
              <CardDescription>
                Настройте интеграцию для автоматического сохранения заказов в
                Google Sheets или отправки на вебхук
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Тип интеграции</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Button
                    type="button"
                    variant={
                      integrationSettings.type === "googleSheets"
                        ? "default"
                        : "outline"
                    }
                    className="justify-start"
                    onClick={() =>
                      handleIntegrationChange("type", "googleSheets")
                    }
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Google Sheets
                  </Button>
                  <Button
                    type="button"
                    variant={
                      integrationSettings.type === "webhook"
                        ? "default"
                        : "outline"
                    }
                    className="justify-start"
                    onClick={() => handleIntegrationChange("type", "webhook")}
                  >
                    <FileJson className="mr-2 h-4 w-4" />
                    Webhook
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="integration-url">
                  URL{" "}
                  {integrationSettings.type === "googleSheets"
                    ? "Google Apps Script"
                    : "вебхука"}
                </Label>
                <Input
                  id="integration-url"
                  value={integrationSettings.url}
                  onChange={(e) =>
                    handleIntegrationChange("url", e.target.value)
                  }
                  placeholder={
                    integrationSettings.type === "googleSheets"
                      ? "https://script.google.com/macros/s/..."
                      : "https://api.example.com/webhook"
                  }
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {integrationSettings.type === "googleSheets"
                    ? "Введите URL вашего скрипта Google Apps Script, который будет обрабатывать данные из формы заказа."
                    : "Введите URL вебхука, на который будут отправляться данные о заказах."}
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="activate-integration"
                  checked={integrationSettings.enabled}
                  onCheckedChange={(checked) =>
                    handleIntegrationChange("enabled", checked)
                  }
                />
                <Label htmlFor="activate-integration">
                  Активировать интеграцию
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveIntegration}
                disabled={
                  !integrationSettings.url && integrationSettings.enabled
                }
              >
                Сохранить
              </Button>
            </CardFooter>
          </Card>

          {integrationSettings.type === "googleSheets" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Инструкция по настройке Google Sheets</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>1. Создайте новую Google таблицу</p>
                <p>2. Перейдите в меню Extensions &gt; Apps Script</p>
                <p>3. Создайте скрипт для обработки POST-запросов</p>
                <p>4. Опубликуйте скрипт как веб-приложение</p>
                <p>5. Скопируйте URL скрипта и вставьте его в поле URL выше</p>
                <p>
                  <a
                    href="https://developers.google.com/apps-script/guides/web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline inline-flex items-center"
                  >
                    Подробная инструкция <ChevronRight className="h-4 w-4" />
                  </a>
                </p>
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </EditorTemplate>
  );
};

export default OrderEditor;
