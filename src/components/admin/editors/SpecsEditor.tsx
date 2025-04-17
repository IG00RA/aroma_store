
import React, { useState } from 'react';
import EditorTemplate from './EditorTemplate';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from 'lucide-react';

const SpecsEditor = () => {
  const [specs, setSpecs] = useState([
    { name: "Материал", value: "PLA-пластик, экологически чистый и безопасный" },
    { name: "Размеры", value: "12 см в высоту, 5 см в ширину" },
    { name: "Цвета", value: "Белый, черный, голубой, бежевый (доступные варианты)" },
    { name: "Особенности", value: "Встроенный магнит для надежной фиксации, удобная подставка для сбора пепла" },
    { name: "Комплектация", value: "Держатель для ароматических палочек (ароматические палочки в комплект не входят)" },
  ]);

  const handleSpecChange = (index: number, field: 'name' | 'value', value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { name: "Новая характеристика", value: "Значение" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  return (
    <EditorTemplate 
      title="Редактирование характеристик" 
      description="Измените технические характеристики продукта"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Список характеристик</h3>
          <Button onClick={handleAddSpec} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Добавить
          </Button>
        </div>
        
        <div className="space-y-4">
          {specs.map((spec, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 items-center border-b pb-4">
              <div className="col-span-2">
                <label className="text-sm font-medium">Название</label>
                <Input 
                  value={spec.name} 
                  onChange={(e) => handleSpecChange(index, 'name', e.target.value)} 
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Значение</label>
                <Input 
                  value={spec.value} 
                  onChange={(e) => handleSpecChange(index, 'value', e.target.value)} 
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end items-end">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRemoveSpec(index)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorTemplate>
  );
};

export default SpecsEditor;
