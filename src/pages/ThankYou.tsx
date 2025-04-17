
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowLeft, ShoppingBag, Copy, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type OrderData = {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
  }>;
  totalPrice: number;
  checkoutData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    contactMethod: string;
    paymentMethod: string;
  };
  paymentDetails?: {
    iban: string;
    cardNumber: string;
    bankName: string;
    recipientName: string;
  } | null;
  date: string;
  status?: string;
};

const ThankYou = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const { toast } = useToast();
  const [contactsData, setContactsData] = useState<{
    messengers: Array<{name: string, link: string, enabled: boolean}>
  }>({
    messengers: []
  });

  useEffect(() => {
    const savedOrderData = localStorage.getItem('lastOrder');
    if (savedOrderData) {
      try {
        const parsedData = JSON.parse(savedOrderData);
        setOrderData(parsedData);
      } catch (e) {
        console.error('Failed to parse order data', e);
      }
    }

    // Загрузка данных о мессенджерах
    const contactsDataJson = localStorage.getItem('contactsData');
    if (contactsDataJson) {
      try {
        const parsedContacts = JSON.parse(contactsDataJson);
        setContactsData(parsedContacts);
      } catch (e) {
        console.error('Failed to parse contacts data', e);
      }
    }
  }, []);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Скопировано",
          description: "Информация скопирована в буфер обмена",
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const getMessengerIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'telegram':
        return <MessageCircle className="h-4 w-4 mr-2" />;
      case 'whatsapp':
        return <MessageCircle className="h-4 w-4 mr-2" />;
      case 'viber':
        return <MessageCircle className="h-4 w-4 mr-2" />;
      default:
        return <MessageCircle className="h-4 w-4 mr-2" />;
    }
  };

  const enabledMessengers = contactsData?.messengers?.filter(m => m.enabled) || [];

  return (
    <div className="min-h-screen flex flex-col bg-product-beige/10">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container-section">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Спасибо за заказ!</h1>
              <p className="text-gray-600 mb-4">
                {orderData ? `Ваш заказ #${orderData.id} был успешно оформлен.` : 'Ваш заказ был успешно оформлен.'}
              </p>
              <p className="text-lg font-medium text-product mb-6">
                С вами свяжутся в ближайшее время
              </p>
              
              {enabledMessengers.length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Не можете ждать? Свяжитесь с нами прямо сейчас:</p>
                  <div className="flex gap-2 justify-center">
                    {enabledMessengers.map((messenger, index) => (
                      <Button 
                        key={index} 
                        variant="outline"
                        className="flex items-center gap-1"
                        asChild
                      >
                        <a href={messenger.link} target="_blank" rel="noopener noreferrer">
                          {getMessengerIcon(messenger.name)}
                          {messenger.name}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {orderData && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Информация о заказе</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Номер заказа</p>
                          <p className="font-medium">{orderData.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Дата заказа</p>
                          <p className="font-medium">{new Date(orderData.date).toLocaleString('ru')}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Имя</p>
                          <p className="font-medium">{orderData.checkoutData.firstName} {orderData.checkoutData.lastName}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Страна доставки</p>
                          <p className="font-medium">{orderData.checkoutData.country}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Город</p>
                          <p className="font-medium">{orderData.checkoutData.city}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="font-medium">{orderData.checkoutData.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Телефон</p>
                          <p className="font-medium">{orderData.checkoutData.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Способ связи</p>
                          <p className="font-medium">{orderData.checkoutData.contactMethod}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Способ оплаты</p>
                          <p className="font-medium">{
                            orderData.checkoutData.paymentMethod === 'prepayment' ? 'Предоплата' : 
                            orderData.checkoutData.paymentMethod === 'cod' ? 'Оплата при получении' : 
                            orderData.checkoutData.paymentMethod
                          }</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Товары</h3>
                      <div className="space-y-3">
                        {orderData.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center py-2 border-b">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Цвет: {item.color}, Количество: {item.quantity}</p>
                            </div>
                            <p className="font-medium">{item.price * item.quantity} ₴</p>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-3">
                          <p className="font-bold">Итого:</p>
                          <p className="font-bold text-xl">{orderData.totalPrice} ₴</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {orderData?.checkoutData.paymentMethod === 'prepayment' && orderData.paymentDetails && (
              <Card className="mb-6 border-blue-200">
                <CardContent className="p-6 bg-blue-50">
                  <h3 className="font-medium mb-3">Информация для оплаты</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Номер заказа:</p>
                        <p className="font-bold">{orderData.id}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleCopyText(orderData.id)}
                      >
                        <Copy className="h-3 w-3" /> Копировать
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">IBAN:</p>
                        <p className="font-medium">{orderData.paymentDetails.iban}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleCopyText(orderData.paymentDetails?.iban || '')}
                      >
                        <Copy className="h-3 w-3" /> Копировать
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Номер карты:</p>
                        <p className="font-medium">{orderData.paymentDetails.cardNumber}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleCopyText(orderData.paymentDetails?.cardNumber || '')}
                      >
                        <Copy className="h-3 w-3" /> Копировать
                      </Button>
                    </div>

                    <div>
                      <p className="text-gray-600">Банк:</p>
                      <p className="font-medium">{orderData.paymentDetails.bankName}</p>
                    </div>

                    <div>
                      <p className="text-gray-600">Получатель:</p>
                      <p className="font-medium">{orderData.paymentDetails.recipientName}</p>
                    </div>

                    <Alert className="bg-amber-50 border-amber-200 mt-4">
                      <AlertDescription className="text-amber-800">
                        Пожалуйста, после оплаты отправьте подтверждение платежа (скриншот или фото чека) через {orderData.checkoutData.contactMethod} для ускорения обработки вашего заказа.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="flex gap-4">
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Вернуться на главную
                </Button>
              </Link>
              <Link to="/#order" className="flex-1">
                <Button className="w-full">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Заказать еще
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThankYou;
