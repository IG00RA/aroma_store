import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const SpecsSection = () => {
  const specifications = [
    { name: "Матеріал", value: "PLA-пластик, екологічно чистий і безпечний" },
    { name: "Розміри", value: "12 см заввишки, 5 см завширшки" },
    {
      name: "Кольори",
      value: "Білий, чорний, блакитний, бежевий (доступні варіанти)",
    },
    {
      name: "Особливості",
      value:
        "Вбудований магніт для надійної фіксації, зручна підставка для збору попелу",
    },
    {
      name: "Комплектація",
      value:
        "Тримач для ароматичних паличок (ароматичні палички в комплект не входять)",
    },
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
                  <TableCell className="font-medium w-1/3 py-4">
                    {spec.name}
                  </TableCell>
                  <TableCell className="text-gray-600 py-4">
                    {spec.value}
                  </TableCell>
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
