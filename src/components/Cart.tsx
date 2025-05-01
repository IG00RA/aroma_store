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
import { ShoppingCart, X, Plus, Minus, Trash2, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { sendMessage } from "@/api/sendData";
import { useLocation, useNavigate } from "react-router-dom";

type CheckoutData = {
  firstName: string;
  lastName: string;
  phone: string;
  contactMethod: string;
};

interface PaymentDetails {
  iban: string;
  cardNumber: string;
  bankName: string;
  recipientName: string;
}

const Cart = () => {
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
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState<"cart" | "checkout">(
    items.length > 0 ? "cart" : "checkout"
  );
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    firstName: "",
    lastName: "",
    phone: "",
    contactMethod: "telegram",
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

  // Load payment details from localStorage
  useEffect(() => {
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
    value: string | number
  ) => {
    setCheckoutData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProceedToCheckout = () => {
    setStep("checkout");
  };

  const handleBackToCart = () => {
    setStep("cart");
  };

  const handleFinalCheckout = async () => {
    // Перевірка валідності форми
    if (!isFormValid()) {
      toast({
        title: "Помилка",
        description: "Будь ласка, заповніть усі обов’язкові поля.",
        variant: "destructive",
      });
      return;
    }

    // Підготовка даних для відправки
    const message = {
      message: "Користувач зробив замовлення Aroma",
      name: checkoutData.firstName,
      surname: checkoutData.lastName,
      messenger: checkoutData.contactMethod,
      phone: checkoutData.phone,
      items: items.map((item) => ({
        color: item.color,
        quantity: item.quantity,
      })),
    };

    // Підготовка даних замовлення для збереження
    const orderData = {
      id: orderId,
      customer: {
        firstName: checkoutData.firstName,
        lastName: checkoutData.lastName,
        phone: checkoutData.phone,
        contactMethod: checkoutData.contactMethod,
      },
      items: items.map((item) => ({
        name: item.name,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
        currency: item.currency || "UAH",
      })),
      total: totalPrice,
      currency: items[0]?.currency || "UAH",
      orderDate: new Date().toISOString(),
      paymentDetails: paymentDetails,
    };

    try {
      // Відправка повідомлення в Telegram
      await sendMessage(message);

      // Збереження даних у localStorage
      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          ...orderData,
          checkoutData: checkoutData,
        })
      );

      toast({
        title: "Замовлення оформлено",
        description: `Спасибі за замовлення, ${checkoutData.firstName}! Номер вашого замовлення: ${orderId}`,
      });

      clearCart();
      setIsCartOpen(false);
      navigate(`/thank-you${location.search}`);
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося відправити замовлення. Спробуйте ще раз.",
        variant: "destructive",
      });
    }
  };

  const isFormValid = () => {
    return (
      checkoutData.firstName.trim() !== "" &&
      checkoutData.lastName.trim() !== "" &&
      checkoutData.phone.trim() !== "" &&
      checkoutData.contactMethod !== ""
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
                        </RadioGroup>
                      </div>

                      {/* <Alert className="bg-blue-50 border-blue-200">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-sm text-blue-800">
                          <p className="font-medium">Інформація про оплату:</p>
                          <p>
                            Номер замовлення: <strong>{orderId}</strong>
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
                      </Alert> */}
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
