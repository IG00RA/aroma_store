import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  Phone,
  Mail,
  Flag,
  CreditCard,
  Truck,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type CheckoutData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  deliveryService: string;
  postalOffice: string;
  contactMethod: string;
  paymentMethod: string;
};

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

const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();
  const { toast } = useToast();

  const [step, setStep] = useState<"cart" | "checkout">(
    items.length > 0 ? "cart" : "checkout"
  );
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "ukraine",
    city: "",
    deliveryService: "",
    postalOffice: "",
    contactMethod: "telegram",
    paymentMethod: "prepayment",
  });

  // State for payment details
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    iban: "UA213223130000026007233566001",
    cardNumber: "5375 4141 0000 0000",
    bankName: "ПриватБанк",
    recipientName: "ФОП Иванов Иван Иванович",
  });

  // Generate order ID
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    // Generate unique order ID when component mounts
    const timestamp = new Date().getTime();
    const randomSuffix = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    setOrderId(`ORD-${timestamp}-${randomSuffix}`);
  }, []);

  // State for integration settings
  const [integrationSettings, setIntegrationSettings] =
    useState<IntegrationSettings>({
      type: "googleSheets",
      url: "",
      enabled: false,
    });

  // Load integration settings and payment details
  useEffect(() => {
    const savedIntegration = localStorage.getItem("integrationSettings");
    if (savedIntegration) {
      try {
        const settings = JSON.parse(savedIntegration);
        setIntegrationSettings({
          type: settings.type || "googleSheets",
          url: settings.url || "",
          enabled: settings.enabled || false,
        });
      } catch (e) {
        console.error(
          "Failed to parse integration settings from localStorage",
          e
        );
      }
    }

    // Load payment details
    const savedPaymentDetails = localStorage.getItem("paymentDetails");
    if (savedPaymentDetails) {
      try {
        setPaymentDetails(JSON.parse(savedPaymentDetails));
      } catch (e) {
        console.error("Failed to parse payment details from localStorage", e);
      }
    }
  }, []);

  const formatPrice = (price: number, currency = "UAH") => {
    const currencySymbol =
      currency === "UAH"
        ? "₴"
        : currency === "USD"
        ? "$"
        : currency === "EUR"
        ? "€"
        : "";
    return `${price} ${currencySymbol}`;
  };

  const handleCheckoutDataChange = (
    field: keyof CheckoutData,
    value: string
  ) => {
    setCheckoutData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProceedToCheckout = () => {
    setStep("checkout");
  };

  const handleBackToCart = () => {
    setStep("cart");
  };

  const sendOrderToIntegration = async (orderData: any) => {
    if (!integrationSettings.enabled || !integrationSettings.url) {
      return;
    }

    try {
      // Format the data based on integration type
      if (integrationSettings.type === "googleSheets") {
        // For Google Sheets, we would make a POST request to a Google Apps Script endpoint
        const response = await fetch(integrationSettings.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
          mode: "no-cors", // This is important for Google Apps Script
        });

        console.log("Order data sent to Google Sheets");
      } else if (integrationSettings.type === "webhook") {
        // For a webhook, we just send the data as is
        const response = await fetch(integrationSettings.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("Order data sent to webhook");
      }
    } catch (error) {
      console.error("Error sending order data to integration:", error);
    }
  };

  const handleFinalCheckout = () => {
    // Prepare order data
    const orderData = {
      id: orderId,
      customer: {
        firstName: checkoutData.firstName,
        lastName: checkoutData.lastName,
        email: checkoutData.email,
        phone: checkoutData.phone,
        contactMethod: checkoutData.contactMethod,
      },
      shipping: {
        country: checkoutData.country,
        city: checkoutData.city,
        deliveryService: checkoutData.deliveryService,
        postalOffice: checkoutData.postalOffice,
      },
      payment: {
        method: checkoutData.paymentMethod,
        total: totalPrice,
        currency: items[0]?.currency || "UAH", // Use the currency from the first item or default to UAH
      },
      items: items.map((item) => ({
        name: item.name,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
        currency: item.currency || "UAH",
      })),
      orderDate: new Date().toISOString(),
    };

    // Send order to integration
    sendOrderToIntegration(orderData);

    // Save order data to localStorage for demo purposes
    localStorage.setItem(
      "lastOrder",
      JSON.stringify({
        ...orderData,
        paymentDetails:
          checkoutData.paymentMethod === "prepayment" ? paymentDetails : null,
        checkoutData: checkoutData, // Keep the checkout data for the thank you page
      })
    );

    toast({
      title: "Замовлення оформлено",
      description: `Спасибі за замовлення, ${checkoutData.firstName}! Номер вашого замовлення: ${orderId}`,
    });

    clearCart();
    setIsCartOpen(false);

    // Redirect to thank you page
    navigate("/thank-you");
  };

  const isFormValid = () => {
    return (
      checkoutData.firstName.trim() !== "" &&
      checkoutData.lastName.trim() !== "" &&
      checkoutData.phone.trim() !== "" &&
      checkoutData.email.trim() !== "" &&
      checkoutData.city.trim() !== "" &&
      checkoutData.country !== "" &&
      checkoutData.deliveryService !== "" &&
      (checkoutData.deliveryService === "" ||
        checkoutData.postalOffice.trim() !== "") &&
      checkoutData.contactMethod !== "" &&
      checkoutData.paymentMethod !== ""
    );
  };

  const currency = items.length > 0 ? items[0].currency || "UAH" : "UAH";

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 px-[0.4rem] min-w-[1.2rem] h-[1.2rem] flex items-center justify-center"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {step === "cart" ? "Корзина" : "Оформлення замовлення"}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-grow py-12 text-center">
              <ShoppingCart
                className="h-16 w-16 text-muted-foreground mb-4"
                strokeWidth={1}
              />
              <h3 className="text-lg font-medium mb-2">Кошик порожній</h3>
              <p className="text-muted-foreground">
                Додайте товари, щоб оформити замовлення
              </p>
            </div>
          ) : (
            <>
              {step === "cart" ? (
                <>
                  <div className="flex-grow overflow-auto py-4 space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start space-x-4 border-b pb-4"
                      >
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          className="h-16 w-16 object-contain rounded bg-gray-50"
                        />
                        <div className="flex-grow space-y-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium">{item.name}</h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Колір: {item.color}
                          </div>
                          <div className="flex justify-between items-center pt-2">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-none"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="px-2 min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-none"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="font-medium">
                              {formatPrice(
                                item.price * item.quantity,
                                item.currency
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="py-4 space-y-4 border-t mt-auto">
                    <div className="flex justify-between font-medium">
                      <span>Сума замовлення:</span>
                      <span>{formatPrice(totalPrice, currency)}</span>
                    </div>
                    <Button
                      onClick={handleProceedToCheckout}
                      className="w-full btn-primary"
                    >
                      Оформити замовлення
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full flex gap-2"
                      onClick={clearCart}
                    >
                      <Trash2 className="h-4 w-4" /> Очистити кошик
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-grow overflow-auto py-4 space-y-4">
                    <div
                      className="space-y-4"
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Ім'я</Label>
                          <Input
                            id="firstName"
                            value={checkoutData.firstName}
                            onChange={(e) =>
                              handleCheckoutDataChange(
                                "firstName",
                                e.target.value
                              )
                            }
                            placeholder="Введіть ім'я"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Прізвище</Label>
                          <Input
                            id="lastName"
                            value={checkoutData.lastName}
                            onChange={(e) =>
                              handleCheckoutDataChange(
                                "lastName",
                                e.target.value
                              )
                            }
                            placeholder="Введіть прізвище"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={checkoutData.email}
                          onChange={(e) =>
                            handleCheckoutDataChange("email", e.target.value)
                          }
                          placeholder="example@mail.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Номер телефону</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={checkoutData.phone}
                          onChange={(e) =>
                            handleCheckoutDataChange("phone", e.target.value)
                          }
                          placeholder="+380XXXXXXXXX"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Країна доставки</Label>
                        <Select
                          value={checkoutData.country}
                          onValueChange={(value) =>
                            handleCheckoutDataChange("country", value)
                          }
                          disabled // Locked to Ukraine
                        >
                          <SelectTrigger id="country" className="w-full">
                            <SelectValue placeholder="Виберіть країну" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ukraine">
                              <div className="flex items-center">
                                <Flag className="h-4 w-4 mr-2" />
                                Україна
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">Місто</Label>
                        <Input
                          id="city"
                          value={checkoutData.city}
                          onChange={(e) =>
                            handleCheckoutDataChange("city", e.target.value)
                          }
                          placeholder="Введіть назву міста"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deliveryService">Служба доставки</Label>
                        <Select
                          value={checkoutData.deliveryService}
                          onValueChange={(value) =>
                            handleCheckoutDataChange("deliveryService", value)
                          }
                        >
                          <SelectTrigger
                            id="deliveryService"
                            className="w-full"
                          >
                            <SelectValue placeholder="Виберіть спосіб доставки" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="novaposhta">
                              <div className="flex items-center">
                                <Truck className="h-4 w-4 mr-2" />
                                Нова Пошта
                              </div>
                            </SelectItem>
                            <SelectItem value="ukrposhta">
                              <div className="flex items-center">
                                <Truck className="h-4 w-4 mr-2" />
                                Укрпошта
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {checkoutData.deliveryService && (
                        <div className="space-y-2">
                          <Label htmlFor="postalOffice">
                            Номер поштового відділення
                          </Label>
                          <div className="relative">
                            <Input
                              id="postalOffice"
                              value={checkoutData.postalOffice}
                              onChange={(e) =>
                                handleCheckoutDataChange(
                                  "postalOffice",
                                  e.target.value
                                )
                              }
                              placeholder="Вкажіть номер відділення"
                              className="pr-10"
                            />
                            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {checkoutData.deliveryService === "novaposhta"
                              ? "Вкажіть номер відділення Нової Пошти для доставки"
                              : "Вкажіть номер відділення Укрпошти для доставки"}
                          </p>
                        </div>
                      )}

                      <div className="space-y-3">
                        <Label>Спосіб оплати</Label>
                        <RadioGroup
                          value={checkoutData.paymentMethod}
                          onValueChange={(value) =>
                            handleCheckoutDataChange("paymentMethod", value)
                          }
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="prepayment"
                              id="prepayment"
                            />
                            <Label
                              htmlFor="prepayment"
                              className="flex items-center"
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              Передоплата
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod" className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Оплата при отриманні
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {checkoutData.paymentMethod === "prepayment" && (
                        <Alert className="bg-blue-50 border-blue-200">
                          <AlertCircle className="h-4 w-4 text-blue-600" />
                          <AlertDescription className="text-sm text-blue-800">
                            <p className="font-medium">
                              Інформація про оплату:
                            </p>
                            <p>
                              Номер заказа: <strong>{orderId}</strong>
                            </p>
                            <p>
                              Після оформлення замовлення, будь ласка, надішліть
                              оплату на такі реквізити:
                            </p>
                            <div className="mt-2 space-y-1">
                              <p>
                                IBAN: <strong>{paymentDetails.iban}</strong>
                              </p>
                              <p>
                                Карта:{" "}
                                <strong>{paymentDetails.cardNumber}</strong>
                              </p>
                              <p>
                                Банк: <strong>{paymentDetails.bankName}</strong>
                              </p>
                              <p>
                                Одержувач:{" "}
                                <strong>{paymentDetails.recipientName}</strong>
                              </p>
                            </div>
                            <p className="mt-2">
                              Після оплати, будь ласка, надішліть підтвердження
                              платежу через обраний вами месенджер.
                            </p>
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-3">
                        <Label>Переважний спосіб зв'язку</Label>
                        <RadioGroup
                          value={checkoutData.contactMethod}
                          onValueChange={(value) =>
                            handleCheckoutDataChange("contactMethod", value)
                          }
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="telegram" id="telegram" />
                            <Label
                              htmlFor="telegram"
                              className="flex items-center"
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Telegram
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="viber" id="viber" />
                            <Label
                              htmlFor="viber"
                              className="flex items-center"
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Viber
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="whatsapp" id="whatsapp" />
                            <Label
                              htmlFor="whatsapp"
                              className="flex items-center"
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              WhatsApp
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email" />
                            <Label
                              htmlFor="email"
                              className="flex items-center"
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Email
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <div className="py-4 space-y-3 border-t mt-auto">
                    <div className="flex justify-between font-medium">
                      <span>Сума замовлення:</span>
                      <span>{formatPrice(totalPrice, currency)}</span>
                    </div>
                    <Button
                      onClick={handleFinalCheckout}
                      className="w-full btn-primary"
                      disabled={!isFormValid()}
                    >
                      Підтвердити замовлення
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleBackToCart}
                    >
                      Повернутися до кошика
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
