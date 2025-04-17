
import React, { useState } from 'react';
import EditorTemplate from './EditorTemplate';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const DescriptionEditor = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("Держатель для ароматических палочек - стиль и функциональность");
  const [paragraphs, setParagraphs] = useState([
    "Наш держатель для ароматических палочек сочетает в себе инновационный дизайн и практичность. Мы разработали его для тех, кто ценит эстетику и функциональность в каждой детали своего дома.",
    "Благодаря уникальной форме, пепел от ароматических палочек аккуратно собирается на специальной подставке, сохраняя чистоту вокруг. Держатель устойчив и надежен, что обеспечивает безопасное использование благовоний.",
    "Минималистичный дизайн и нейтральные цвета позволяют ему гармонично вписаться в любой интерьер - от скандинавского до восточного стиля. Это не просто функциональный предмет, но и стильный элемент декора, который станет изюминкой вашего дома.",
    "Каждый держатель изготавливается с применением современных технологий 3D-печати, что гарантирует высокое качество и точность деталей. Мы используем только экологически чистые материалы, безопасные для вас и ваших близких."
  ]);
  
  // Image data for description cards
  const [images, setImages] = useState([
    { id: '1', src: "/placeholder.svg", alt: "Держатель спереди" },
    { id: '2', src: "/placeholder.svg", alt: "Держатель сбоку" },
    { id: '3', src: "/placeholder.svg", alt: "Держатель в использовании" },
    { id: '4', src: "/placeholder.svg", alt: "Держатель в интерьере" },
    { id: '5', src: "/placeholder.svg", alt: "Детали держателя" }
  ]);

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = value;
    setParagraphs(newParagraphs);
  };

  const handleAddParagraph = () => {
    setParagraphs([...paragraphs, "Новый параграф"]);
    // Add a new image for the new paragraph
    setImages([...images, { 
      id: Date.now().toString(), 
      src: "/placeholder.svg", 
      alt: "Новое изображение" 
    }]);
  };

  const handleRemoveParagraph = (index: number) => {
    setParagraphs(paragraphs.filter((_, i) => i !== index));
    // Remove corresponding image
    setImages(images.filter((_, i) => i !== index));
  };

  const handleReplaceImage = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const newImages = [...images];
      if (newImages[index]) {
        newImages[index] = {
          ...newImages[index],
          src: URL.createObjectURL(file)
        };
        setImages(newImages);
        
        toast({
          title: "Изображение заменено",
          description: `Изображение для карточки ${index + 1} было успешно заменено`,
        });
      }
    }
  };

  return (
    <EditorTemplate 
      title="Редактирование раздела описания" 
      description="Измените заголовок и текст описания продукта"
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Заголовок</label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="mt-1"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Параграфы и изображения</label>
          <div className="space-y-4 mt-2">
            {paragraphs.map((paragraph, index) => (
              <div key={index} className="flex space-x-4 border p-4 rounded-md">
                <div className="relative group h-20 w-20 flex-shrink-0">
                  <img 
                    src={images[index]?.src || "/placeholder.svg"} 
                    alt={images[index]?.alt || `Изображение ${index + 1}`} 
                    className="h-20 w-20 object-cover rounded border"
                  />
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded border-0"
                  >
                    <label className="cursor-pointer w-full h-full flex items-center justify-center">
                      <Image className="h-4 w-4" />
                      <span className="sr-only">Заменить изображение</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleReplaceImage(index, e)}
                      />
                    </label>
                  </Button>
                </div>
                <div className="flex-grow">
                  <Textarea 
                    value={paragraph} 
                    onChange={(e) => handleParagraphChange(index, e.target.value)} 
                    rows={3}
                    className="w-full"
                    placeholder="Текст параграфа"
                  />
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveParagraph(index)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 h-8 w-8 p-0 flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button 
              variant="outline"
              onClick={handleAddParagraph}
              className="w-full"
            >
              + Добавить параграф с изображением
            </Button>
          </div>
        </div>
      </div>
    </EditorTemplate>
  );
};

export default DescriptionEditor;
