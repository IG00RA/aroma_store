
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MoreHorizontal, 
  Eye, 
  Copy, 
  Send, 
  CheckCircle, 
  XCircle, 
  Package,
  ArrowUpRight,
  Truck
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
};

type OrderStatusType = 'pending' | 'shipped' | 'delivered' | 'rejected' | 'processing';

type Order = {
  id: string;
  date: string;
  totalPrice: number;
  items: OrderItem[];
  status: OrderStatusType;
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
  trackingNumber?: string;
};

const OrderManagement = () => {
  console.log("OrderManagement component rendering");
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [statusUpdateDialog, setStatusUpdateDialog] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [newStatus, setNewStatus] = useState<OrderStatusType>('pending');
  
  useEffect(() => {
    console.log("Loading orders from localStorage");
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        // Ensure all orders have a status property
        const updatedOrders = parsedOrders.map((order: any) => ({
          ...order,
          status: order.status || 'pending'
        }));
        setOrders(updatedOrders);
        console.log("Orders loaded successfully:", updatedOrders);
      } catch (error) {
        console.error('Failed to parse orders', error);
      }
    } else {
      console.log("No orders found in localStorage");
      
      // For testing: If no orders exist, create a sample order
      const sampleOrder: Order = {
        id: "ORD-" + Math.floor(Math.random() * 100000),
        date: new Date().toISOString(),
        totalPrice: 1590,
        status: 'pending',
        items: [
          {
            id: "ITEM-1",
            name: "Стильный держатель для благовоний",
            price: 1590,
            quantity: 1,
            color: "Натуральный"
          }
        ],
        checkoutData: {
          firstName: "Иван",
          lastName: "Петров",
          email: "ivan@example.com",
          phone: "+380991234567",
          country: "Украина",
          city: "Киев",
          contactMethod: "telegram",
          paymentMethod: "prepayment"
        },
        paymentDetails: {
          iban: "UA213223130000026007233566001",
          cardNumber: "5375 4141 0000 0000",
          bankName: "ПриватБанк",
          recipientName: "ФОП Иванов И.И."
        }
      };
      
      // Store the sample order
      localStorage.setItem('orders', JSON.stringify([sampleOrder]));
      setOrders([sampleOrder]);
      console.log("Created and saved sample order:", sampleOrder);
    }
  }, []);

  const handleUpdateStatus = () => {
    if (!selectedOrder) return;
    
    const updatedOrders = orders.map(order => {
      if (order.id === selectedOrder.id) {
        const updatedOrder = {
          ...order,
          status: newStatus,
          trackingNumber: newStatus === 'shipped' ? trackingNumber : order.trackingNumber
        };
        return updatedOrder;
      }
      return order;
    });
    
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    setStatusUpdateDialog(false);
    setSelectedOrder(null);
    setTrackingNumber('');
    
    toast({
      title: 'Статус обновлен',
      description: `Заказ #${selectedOrder.id} успешно обновлен`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return `${price} ₴`;
  };

  const getStatusBadge = (status: OrderStatusType) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Ожидает обработки</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">В обработке</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">Отправлен</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Доставлен</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Отменен</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: 'Скопировано',
      description: 'ID заказа скопирован в буфер обмена',
    });
  };

  const getPaymentMethodName = (method: string) => {
    const methods: {[key: string]: string} = {
      'prepayment': 'Предоплата',
      'cod': 'Оплата при получении'
    };
    return methods[method] || method;
  };

  console.log("Orders state:", orders);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Управление заказами</CardTitle>
          <CardDescription>
            Просмотр и управление всеми заказами клиентов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Заказа</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Метод оплаты</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    Заказы отсутствуют
                  </TableCell>
                </TableRow>
              ) : (
                orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>{`${order.checkoutData.firstName} ${order.checkoutData.lastName}`}</TableCell>
                    <TableCell>{getPaymentMethodName(order.checkoutData.paymentMethod)}</TableCell>
                    <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedOrder(order);
                            setIsOrderDetailsOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            Просмотреть детали
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCopyOrderId(order.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Копировать ID
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedOrder(order);
                            setNewStatus(order.status);
                            setTrackingNumber(order.trackingNumber || '');
                            setStatusUpdateDialog(true);
                          }}>
                            <Send className="mr-2 h-4 w-4" />
                            Обновить статус
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Детали заказа #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Заказ от {selectedOrder && formatDate(selectedOrder.date)}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Информация</TabsTrigger>
                <TabsTrigger value="items">Товары</TabsTrigger>
                {selectedOrder.checkoutData.paymentMethod === 'prepayment' && (
                  <TabsTrigger value="payment">Данные оплаты</TabsTrigger>
                )}
                {selectedOrder.status === 'shipped' && selectedOrder.trackingNumber && (
                  <TabsTrigger value="tracking">Отслеживание</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="details">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Информация о клиенте</h3>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div>
                            <Label className="text-xs text-gray-500">Имя</Label>
                            <p>{selectedOrder.checkoutData.firstName} {selectedOrder.checkoutData.lastName}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Email</Label>
                            <p>{selectedOrder.checkoutData.email}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Телефон</Label>
                            <p>{selectedOrder.checkoutData.phone}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Страна</Label>
                            <p>{selectedOrder.checkoutData.country}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Город</Label>
                            <p>{selectedOrder.checkoutData.city}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Детали заказа</h3>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div>
                            <Label className="text-xs text-gray-500">Номер заказа</Label>
                            <p>{selectedOrder.id}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Дата заказа</Label>
                            <p>{formatDate(selectedOrder.date)}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Способ оплаты</Label>
                            <p>{getPaymentMethodName(selectedOrder.checkoutData.paymentMethod)}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Статус</Label>
                            <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                          </div>
                          {selectedOrder.status === 'shipped' && selectedOrder.trackingNumber && (
                            <div>
                              <Label className="text-xs text-gray-500">Номер отправления</Label>
                              <p>{selectedOrder.trackingNumber}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="items">
                <Card>
                  <CardContent className="pt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Товар</TableHead>
                          <TableHead>Цвет</TableHead>
                          <TableHead>Цена</TableHead>
                          <TableHead>Кол-во</TableHead>
                          <TableHead className="text-right">Сумма</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map(item => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.color}</TableCell>
                            <TableCell>{formatPrice(item.price)}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell className="text-right">{formatPrice(item.price * item.quantity)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={4} className="text-right font-bold">Итого:</TableCell>
                          <TableCell className="text-right font-bold">{formatPrice(selectedOrder.totalPrice)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {selectedOrder.checkoutData.paymentMethod === 'prepayment' && (
                <TabsContent value="payment">
                  <Card>
                    <CardContent className="pt-4">
                      {selectedOrder.paymentDetails ? (
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs text-gray-500">IBAN</Label>
                            <div className="flex justify-between items-center">
                              <p className="font-mono">{selectedOrder.paymentDetails.iban}</p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  navigator.clipboard.writeText(selectedOrder.paymentDetails?.iban || '');
                                  toast({
                                    title: 'Скопировано',
                                    description: 'IBAN скопирован в буфер обмена',
                                  });
                                }}
                              >
                                <Copy className="h-3 w-3 mr-1" /> Копировать
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-xs text-gray-500">Номер карты</Label>
                            <div className="flex justify-between items-center">
                              <p className="font-mono">{selectedOrder.paymentDetails.cardNumber}</p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  navigator.clipboard.writeText(selectedOrder.paymentDetails?.cardNumber || '');
                                  toast({
                                    title: 'Скопировано',
                                    description: 'Номер карты скопирован в буфер обмена',
                                  });
                                }}
                              >
                                <Copy className="h-3 w-3 mr-1" /> Копировать
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-xs text-gray-500">Банк</Label>
                            <p>{selectedOrder.paymentDetails.bankName}</p>
                          </div>
                          
                          <div>
                            <Label className="text-xs text-gray-500">Получатель</Label>
                            <p>{selectedOrder.paymentDetails.recipientName}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-4">Информация об оплате отсутствует</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
              
              {selectedOrder.status === 'shipped' && selectedOrder.trackingNumber && (
                <TabsContent value="tracking">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-xs text-gray-500">Номер ТТН</Label>
                          <div className="flex justify-between items-center">
                            <p className="font-mono">{selectedOrder.trackingNumber}</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                navigator.clipboard.writeText(selectedOrder.trackingNumber || '');
                                toast({
                                  title: 'Скопировано',
                                  description: 'Номер ТТН скопирован в буфер обмена',
                                });
                              }}
                            >
                              <Copy className="h-3 w-3 mr-1" /> Копировать
                            </Button>
                          </div>
                        </div>
                        
                        <Button className="w-full">
                          <ArrowUpRight className="h-4 w-4 mr-2" />
                          Отследить отправление
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          )}
          
          <DialogFooter>
            <Button 
              variant="default" 
              onClick={() => {
                if (selectedOrder) {
                  setNewStatus(selectedOrder.status);
                  setTrackingNumber(selectedOrder.trackingNumber || '');
                  setIsOrderDetailsOpen(false);
                  setStatusUpdateDialog(true);
                }
              }}
            >
              Обновить статус
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={statusUpdateDialog} onOpenChange={setStatusUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Обновление статуса заказа</DialogTitle>
            <DialogDescription>
              Изменить статус заказа #{selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Статус заказа</Label>
              <Select
                value={newStatus}
                onValueChange={(value) => setNewStatus(value as OrderStatusType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Ожидает обработки</SelectItem>
                  <SelectItem value="processing">В обработке</SelectItem>
                  <SelectItem value="shipped">Отправлен</SelectItem>
                  <SelectItem value="delivered">Доставлен</SelectItem>
                  <SelectItem value="rejected">Отменен</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newStatus === 'shipped' && (
              <div className="space-y-2">
                <Label htmlFor="tracking">Номер ТТН</Label>
                <div className="flex gap-2">
                  <Input 
                    id="tracking" 
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Введите номер ТТН"
                  />
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusUpdateDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleUpdateStatus}>
              {newStatus === 'shipped' ? (
                <>
                  <Truck className="mr-2 h-4 w-4" />
                  Подтвердить отправку
                </>
              ) : newStatus === 'delivered' ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Подтвердить доставку
                </>
              ) : newStatus === 'rejected' ? (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  Отменить заказ
                </>
              ) : (
                <>
                  <Package className="mr-2 h-4 w-4" />
                  Обновить статус
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManagement;
