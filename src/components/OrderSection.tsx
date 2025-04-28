import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShieldCheck, Truck, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import heroImg from "../img/hero.webp";

const OrderSection = () => {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("white");
  const { addToCart } = useCart();
  const { toast } = useToast();

  // State for product data
  const [productName, setProductName] = useState(
    "Тримач для ароматичних паличок"
  );
  const [productPrice, setProductPrice] = useState(899);
  const [currency, setCurrency] = useState("UAH");
  const [productImage, setProductImage] = useState(heroImg);
  const [colors, setColors] = useState([
    { value: "white", label: "Білий" },
    { value: "black", label: "Чорний" },
    { value: "blue", label: "Блакитний" },
    { value: "beige", label: "Бежевий" },
  ]);
  const [deliveryInfo, setDeliveryInfo] = useState(
    "Доставка по всій Україні. Термін доставки: 3-7 робочих днів"
  );
  const [guaranteeInfo, setGuaranteeInfo] = useState(
    "Гарантія повернення грошей протягом 30 днів"
  );
  // Load product data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("productData");
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setProductName(data.productName || productName);
        setProductPrice(Number(data.price) || productPrice);
        setCurrency(data.currency || currency);
        setProductImage(data.imageUrl || productImage);
        if (data.colors && data.colors.length > 0) {
          setColors(data.colors);
          setColor(data.colors[0].value);
        }
        setDeliveryInfo(data.deliveryInfo || deliveryInfo);
        setGuaranteeInfo(data.guaranteeInfo || guaranteeInfo);
      } catch (e) {
        console.error("Failed to parse product data from localStorage", e);
      }
    }
  }, []);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const getColorClass = (colorValue: string) => {
    switch (colorValue) {
      case "white":
        return "bg-product-white border border-gray-200";
      case "black":
        return "bg-product-black";
      case "blue":
        return "bg-blue-300";
      case "beige":
        return "bg-product-beige";
      default:
        return "bg-gray-200";
    }
  };

  const getColorLabel = (colorValue: string) => {
    const colorObj = colors.find((c) => c.value === colorValue);
    return colorObj ? colorObj.label : colorValue;
  };

  const formatPrice = (price: number) => {
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

  const handleAddToCart = () => {
    addToCart({
      name: productName,
      price: productPrice,
      quantity: quantity,
      color: getColorLabel(color),
      imageUrl: productImage,
      currency: currency,
    });

    toast({
      title: "Товар додано до кошика",
      description: `${productName} (${getColorLabel(color)}) - ${quantity} шт.`,
    });
  };

  return (
    <section className="bg-white" id="order">
      <div className="container-section">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image */}
            <div className="bg-product-beige/20 p-8 flex items-center justify-center">
              <img
                src={productImage}
                alt={productName}
                className="max-h-[300px] object-contain"
              />
            </div>

            {/* Order Form */}
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-2">{productName}</h2>
              <p className="text-3xl font-bold text-product mb-6">
                {formatPrice(productPrice)}
              </p>

              <div className="space-y-6">
                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Виберіть колір
                  </label>
                  <Select value={color} onValueChange={setColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Виберіть колір" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center">
                            <span
                              className={`h-4 w-4 rounded-full mr-2 ${getColorClass(
                                color.value
                              )}`}
                            ></span>
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Кількість
                  </label>
                  <div className="flex items-center border rounded-md w-fit">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="px-3 py-1 text-xl font-medium disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="px-3 py-1 text-xl font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-4 h-4 mr-2" />
                    <span>{deliveryInfo}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    <span>{guaranteeInfo}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full btn-primary flex items-center gap-2"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5" />
                  Додати в кошик
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
