
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from 'lucide-react';
import EditorTemplate from './EditorTemplate';

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const FaqEditor = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      id: 1,
      question: "Из какого материала изготовлен держатель?",
      answer: "Наш держатель изготовлен из экологически чистого PLA-пластика, безопасного для здоровья и окружающей среды."
    },
    {
      id: 2,
      question: "Подходит ли он для всех типов ароматических палочек?",
      answer: "Да, наш держатель универсален и подходит для большинства стандартных ароматических палочек разной толщины."
    },
    {
      id: 3,
      question: "Как очищать держатель от пепла?",
      answer: "Просто снимите магнитную подставку и аккуратно промойте ее водой. Высушите перед следующим использованием."
    },
    {
      id: 4,
      question: "Сколько времени занимает доставка?",
      answer: "Обычно доставка занимает 3-7 рабочих дней, в зависимости от вашего региона."
    }
  ]);

  const handleAddFaq = () => {
    const newFaq = {
      id: Date.now(),
      question: "Новый вопрос",
      answer: "Ответ на новый вопрос"
    };
    setFaqs([...faqs, newFaq]);
  };

  const handleRemoveFaq = (id: number) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  const handleFaqChange = (id: number, field: keyof FaqItem, value: string) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, [field]: value } : faq
    ));
  };

  return (
    <EditorTemplate 
      title="Редактирование FAQ" 
      description="Управляйте часто задаваемыми вопросами"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Вопросы и ответы</h3>
          <Button onClick={handleAddFaq} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Добавить вопрос
          </Button>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div className="w-full">
                  <label className="text-sm font-medium">Вопрос</label>
                  <Input 
                    value={faq.question} 
                    onChange={(e) => handleFaqChange(faq.id, 'question', e.target.value)} 
                    className="mt-1"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFaq(faq.id)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 ml-4"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <label className="text-sm font-medium">Ответ</label>
                <Textarea 
                  value={faq.answer} 
                  onChange={(e) => handleFaqChange(faq.id, 'answer', e.target.value)} 
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditorTemplate>
  );
};

export default FaqEditor;
