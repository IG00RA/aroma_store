
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, Image } from 'lucide-react';
import EditorTemplate from './EditorTemplate';
import { useToast } from "@/hooks/use-toast";
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DropResult 
} from '@hello-pangea/dnd';

type Image = {
  id: string;
  src: string;
  alt: string;
};

const GalleryEditor = () => {
  const { toast } = useToast();
  
  // In a real app, these would be loaded from the server
  const [images, setImages] = useState<Image[]>([
    { id: '1', src: "/placeholder.svg", alt: "Держатель спереди" },
    { id: '2', src: "/placeholder.svg", alt: "Держатель сбоку" },
    { id: '3', src: "/placeholder.svg", alt: "Держатель в использовании" },
    { id: '4', src: "/placeholder.svg", alt: "Держатель в интерьере" },
    { id: '5', src: "/placeholder.svg", alt: "Детали держателя" },
  ]);

  const handleAltChange = (id: string, newAlt: string) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, alt: newAlt } : img
    ));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, this would upload to a server
      const file = e.target.files[0];
      const newImage: Image = {
        id: Date.now().toString(),
        src: URL.createObjectURL(file),
        alt: file.name.split('.')[0]
      };
      
      setImages([...images, newImage]);
      
      toast({
        title: "Изображение добавлено",
        description: "Новое изображение было добавлено в галерею",
      });
    }
  };

  const handleReplaceImage = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      setImages(images.map(img => 
        img.id === id ? { 
          ...img, 
          src: URL.createObjectURL(file)
        } : img
      ));
      
      toast({
        title: "Изображение заменено",
        description: "Изображение в галерее было успешно заменено",
      });
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
  };

  return (
    <EditorTemplate 
      title="Редактирование галереи" 
      description="Управляйте изображениями в галерее"
    >
      <div className="space-y-6">
        <div>
          <Button asChild variant="outline">
            <label className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Загрузить новое изображение
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Перетаскивайте изображения для изменения порядка
          </p>
        </div>
        
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="gallery">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {images.map((image, index) => (
                  <Draggable key={image.id} draggableId={image.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center space-x-4 border rounded-md p-3 bg-white"
                      >
                        <span className="text-gray-400 font-medium w-6 text-center">
                          {index + 1}
                        </span>
                        <div className="relative group h-16 w-16">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="h-16 w-16 object-cover rounded border"
                          />
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded border-0"
                          >
                            <label className="cursor-pointer">
                              <Image className="h-4 w-4" />
                              <span className="sr-only">Заменить изображение</span>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => handleReplaceImage(image.id, e)}
                              />
                            </label>
                          </Button>
                        </div>
                        <div className="flex-grow">
                          <label className="text-sm font-medium">Описание</label>
                          <Input 
                            value={image.alt}
                            onChange={(e) => handleAltChange(image.id, e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveImage(image.id)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </EditorTemplate>
  );
};

export default GalleryEditor;
