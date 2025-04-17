
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const faqs = [
    {
      question: "Из какого материала изготовлен держатель?",
      answer: "Наш держатель изготовлен из экологически чистого PLA-пластика, безопасного для здоровья и окружающей среды."
    },
    {
      question: "Подходит ли он для всех типов ароматических палочек?",
      answer: "Да, наш держатель универсален и подходит для большинства стандартных ароматических палочек разной толщины."
    },
    {
      question: "Как очищать держатель от пепла?",
      answer: "Просто снимите магнитную подставку и аккуратно промойте ее водой. Высушите перед следующим использованием."
    },
    {
      question: "Сколько времени занимает доставка?",
      answer: "Обычно доставка занимает 3-7 рабочих дней, в зависимости от вашего региона."
    }
  ];

  return (
    <section className="bg-white">
      <div className="container-section">
        <h2 className="section-title text-center">Часто задаваемые вопросы</h2>
        <div className="max-w-3xl mx-auto mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-lg py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
