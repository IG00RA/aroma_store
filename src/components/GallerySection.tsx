
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GallerySection = () => {
  // Temporary placeholder images
  const images = [
    { id: 1, src: "/placeholder.svg", alt: "Держатель спереди" },
    { id: 2, src: "/placeholder.svg", alt: "Держатель сбоку" },
    { id: 3, src: "/placeholder.svg", alt: "Держатель в использовании" },
    { id: 4, src: "/placeholder.svg", alt: "Держатель в интерьере" },
    { id: 5, src: "/placeholder.svg", alt: "Детали держателя" },
  ];

  return (
    <section className="bg-product-beige/10">
      <div className="container-section">
        <h2 className="section-title text-center">Взгляните ближе</h2>
        
        <div className="mt-12 max-w-5xl mx-auto">
          <Tabs defaultValue="image-1" className="w-full">
            <div className="relative rounded-xl overflow-hidden mb-6 bg-white shadow-md">
              {images.map((image) => (
                <TabsContent key={image.id} value={`image-${image.id}`} className="p-0">
                  <div className="aspect-[4/3] w-full">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TabsContent>
              ))}
            </div>
            
            <TabsList className="w-full flex justify-center bg-transparent h-auto space-x-2">
              {images.map((image) => (
                <TabsTrigger 
                  key={image.id} 
                  value={`image-${image.id}`}
                  className="relative w-20 h-20 bg-white rounded-md p-1 data-[state=active]:border-2 data-[state=active]:border-product"
                >
                  <img 
                    src={image.src} 
                    alt={`Миниатюра ${image.id}`} 
                    className="w-full h-full object-cover rounded"
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
