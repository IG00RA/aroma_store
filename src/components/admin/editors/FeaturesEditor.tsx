
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, Leaf, Shield, Plus, Trash2, Save } from 'lucide-react';

// This would typically come from an API or state management
const initialFeatures = [
  {
    id: 1,
    icon: "Star",
    title: "Современный дизайн",
    description: "Минималистичный стиль, который украсит любой интерьер и станет акцентным элементом вашего пространства."
  },
  {
    id: 2,
    icon: "Leaf",
    title: "Экологичность",
    description: "Безопасный PLA-пластик, производство с бережным отношением к природе и заботой об окружающей среде."
  },
  {
    id: 3,
    icon: "Shield",
    title: "Продуманная эргономика",
    description: "Удобство использования, надежная конструкция и простота в уходе для вашего комфорта каждый день."
  }
];

const iconOptions = [
  { value: "Star", label: "Звезда", component: <Star className="h-5 w-5" /> },
  { value: "Leaf", label: "Лист", component: <Leaf className="h-5 w-5" /> },
  { value: "Shield", label: "Щит", component: <Shield className="h-5 w-5" /> },
];

const FeaturesEditor = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState(initialFeatures);
  const [sectionTitle, setSectionTitle] = useState("Почему наш держатель для благовоний особенный");
  const [sectionSubtitle, setSectionSubtitle] = useState("Идеальное сочетание эстетики, функциональности и качества");

  const handleAddFeature = () => {
    const newFeature = {
      id: Date.now(),
      icon: "Star",
      title: "Новое преимущество",
      description: "Описание нового преимущества"
    };
    setFeatures([...features, newFeature]);
  };

  const handleRemoveFeature = (id: number) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  const handleFeatureChange = (id: number, field: string, value: string) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, [field]: value } : feature
    ));
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Сохранено!",
      description: "Изменения в разделе 'Преимущества' сохранены",
    });
  };

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find(i => i.value === iconName);
    return icon ? icon.component : <Star className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Настройки раздела "Преимущества"</CardTitle>
          <CardDescription>
            Измените заголовок, подзаголовок и список преимуществ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Заголовок раздела</label>
            <Input 
              value={sectionTitle} 
              onChange={(e) => setSectionTitle(e.target.value)} 
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Подзаголовок раздела</label>
            <Input 
              value={sectionSubtitle} 
              onChange={(e) => setSectionSubtitle(e.target.value)} 
              className="mt-1"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="ml-auto">
            <Save className="mr-2 h-4 w-4" />
            Сохранить
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Список преимуществ</h3>
          <Button onClick={handleAddFeature} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Добавить
          </Button>
        </div>

        {features.map((feature) => (
          <Card key={feature.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {getIconComponent(feature.icon)}
                  <span>{feature.title || "Новое преимущество"}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRemoveFeature(feature.id)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium">Иконка</label>
                <select 
                  value={feature.icon} 
                  onChange={(e) => handleFeatureChange(feature.id, 'icon', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Заголовок</label>
                <Input 
                  value={feature.title} 
                  onChange={(e) => handleFeatureChange(feature.id, 'title', e.target.value)} 
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Описание</label>
                <Textarea 
                  value={feature.description} 
                  onChange={(e) => handleFeatureChange(feature.id, 'description', e.target.value)} 
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t bg-gray-50">
              <Button onClick={handleSave} size="sm" className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Сохранить
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesEditor;
