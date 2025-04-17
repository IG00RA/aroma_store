
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

const SpecsSection = () => {
  const specifications = [
    { name: "Материал", value: "PLA-пластик, экологически чистый и безопасный" },
    { name: "Размеры", value: "12 см в высоту, 5 см в ширину" },
    { name: "Цвета", value: "Белый, черный, голубой, бежевый (доступные варианты)" },
    { name: "Особенности", value: "Встроенный магнит для надежной фиксации, удобная подставка для сбора пепла" },
    { name: "Комплектация", value: "Держатель для ароматических палочек (ароматические палочки в комплект не входят)" },
  ];

  return (
    <section className="bg-white">
      <div className="container-section">
        <h2 className="section-title text-center">Характеристики</h2>
        <div className="max-w-3xl mx-auto mt-8">
          <Table>
            <TableBody>
              {specifications.map((spec, index) => (
                <TableRow key={index} className="border-b border-gray-200">
                  <TableCell className="font-medium w-1/3 py-4">{spec.name}</TableCell>
                  <TableCell className="text-gray-600 py-4">{spec.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
