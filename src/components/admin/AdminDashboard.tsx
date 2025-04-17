
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Sparkles, 
  FileText, 
  Clock, 
  MessageSquare, 
  Image,
  ShoppingCart,
  Users,
  LogOut,
  Package,
  Phone
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import HeroEditor from './editors/HeroEditor';
import FeaturesEditor from './editors/FeaturesEditor';
import DescriptionEditor from './editors/DescriptionEditor';
import SpecsEditor from './editors/SpecsEditor';
import GalleryEditor from './editors/GalleryEditor';
import ReviewsEditor from './editors/ReviewsEditor';
import FaqEditor from './editors/FaqEditor';
import OrderEditor from './editors/OrderEditor';
import OrderManagement from './editors/OrderManagement';
import ContactsEditor from './editors/ContactsEditor';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");

  // Debug the active tab
  useEffect(() => {
    console.log("Active tab changed:", activeTab);
  }, [activeTab]);

  const handleLogout = () => {
    // In a real app, this would handle session termination
    localStorage.removeItem('adminAuthenticated'); // Clear authentication flag
    window.location.href = '/admin'; // Redirect to login page
  };

  const sections = [
    { id: "hero", label: "Первый экран", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "features", label: "Преимущества", icon: <Sparkles className="h-4 w-4" /> },
    { id: "description", label: "Описание", icon: <FileText className="h-4 w-4" /> },
    { id: "specs", label: "Характеристики", icon: <Clock className="h-4 w-4" /> },
    { id: "gallery", label: "Галерея", icon: <Image className="h-4 w-4" /> },
    { id: "reviews", label: "Отзывы", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "faq", label: "FAQ", icon: <Users className="h-4 w-4" /> },
    { id: "order", label: "Настройки заказа", icon: <ShoppingCart className="h-4 w-4" /> },
    { id: "orders", label: "Управление заказами", icon: <Package className="h-4 w-4" /> },
    { id: "contacts", label: "Контакты и ссылки", icon: <Phone className="h-4 w-4" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Админ-панель</h2>
        </div>
        
        <div className="py-4">
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center px-4 py-3 text-left
                    ${activeTab === section.id 
                      ? 'bg-product-beige/20 text-product border-r-4 border-product' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">{section.icon}</span>
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="absolute bottom-0 w-64 border-t p-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="hero">
              <HeroEditor />
            </TabsContent>
            <TabsContent value="features">
              <FeaturesEditor />
            </TabsContent>
            <TabsContent value="description">
              <DescriptionEditor />
            </TabsContent>
            <TabsContent value="specs">
              <SpecsEditor />
            </TabsContent>
            <TabsContent value="gallery">
              <GalleryEditor />
            </TabsContent>
            <TabsContent value="reviews">
              <ReviewsEditor />
            </TabsContent>
            <TabsContent value="faq">
              <FaqEditor />
            </TabsContent>
            <TabsContent value="order">
              <OrderEditor />
            </TabsContent>
            <TabsContent value="orders">
              <OrderManagement />
            </TabsContent>
            <TabsContent value="contacts">
              <ContactsEditor />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
