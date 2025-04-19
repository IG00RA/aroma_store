import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Upload } from "lucide-react";

const HeroEditor = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("Стильный держатель для благовоний");
  const [subtitle, setSubtitle] = useState(
    "Уникальный дизайн, экологичные материалы, идеальное решение для вашего интерьера"
  );
  const [buttonText, setButtonText] = useState("Заказать сейчас");
  const [imageUrl, setImageUrl] = useState("/placeholder.svg");

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("heroSection");
    if (savedData) {
      const { title, subtitle, buttonText, imageUrl } = JSON.parse(savedData);
      setTitle(title || "Стильный держатель для благовоний");
      setSubtitle(
        subtitle ||
          "Уникальный дизайн, экологичные материалы, идеальное решение для вашего интерьера"
      );
      setButtonText(buttonText || "Заказать сейчас");
      setImageUrl(imageUrl || "/placeholder.svg");
    }
  }, []);

  const handleSave = () => {
    const heroData = { title, subtitle, buttonText, imageUrl };
    localStorage.setItem("heroSection", JSON.stringify(heroData));
    toast({
      title: "Сохранено!",
      description: "Изменения в разделе 'Первый экран' сохранены",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setImageUrl(fileUrl);
      toast({
        title: "Изображение загружено",
        description: "Новое изображение было добавлено в первый экран",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Настройки первого экрана</CardTitle>
          <CardDescription>
            Измените заголовок, подзаголовок и другие элементы первого экрана
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Заголовок</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Подзаголовок</label>
            <Textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Текст кнопки</label>
            <Input
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Изображение</label>
            <div className="mt-2 flex items-center space-x-4">
              <img
                src={imageUrl}
                alt="Предпросмотр"
                className="h-24 w-24 object-cover rounded border"
              />
              <div>
                <Button asChild variant="outline">
                  <label className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Загрузить изображение
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="ml-auto">
            <Save className="mr-2 h-4 w-4" />
            Сохранить
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Предпросмотр</CardTitle>
          <CardDescription>
            Так будет выглядеть первый экран на сайте
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-6">
            <div className="max-w-md">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="mt-2 text-gray-600">{subtitle}</p>
              <button className="mt-4 bg-product text-white px-4 py-2 rounded">
                {buttonText}
              </button>
            </div>
            <div className="mt-4">
              <img
                src={imageUrl}
                alt="Предпросмотр"
                className="max-h-40 object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroEditor;
