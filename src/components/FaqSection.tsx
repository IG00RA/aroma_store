import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const faqs = [
    {
      question: "З якого матеріалу виготовлено тримач?",
      answer:
        "Наш тримач виготовлено з екологічно чистого PLA-пластику, безпечного для здоров'я та довкілля.",
    },
    {
      question: "Чи підходить він для всіх типів ароматичних паличок?",
      answer:
        "Так, наш тримач універсальний і підходить для більшості стандартних ароматичних паличок різної товщини.",
    },
    {
      question: "Як очищати тримач від попелу?",
      answer:
        "Просто зніміть магнітну підставку й акуратно промийте її водою. Висушіть перед наступним використанням.",
    },
    {
      question: "Скільки часу займає доставка?",
      answer:
        "Зазвичай доставка займає 3-7 робочих днів, залежно від вашого регіону.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="container-section">
        <h2 className="section-title text-center">Часті запитання</h2>
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
