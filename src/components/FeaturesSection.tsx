import React from "react";
import { motion } from "framer-motion";
import { Star, Leaf, Shield } from "lucide-react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
};

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 group"
    >
      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-product-beige/70 to-product-beige/20 flex items-center justify-center text-product mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-product-dark group-hover:text-product transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative bg-gradient-to-t from-gray-50/80 to-white py-24"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0wIDMwaC02VjQyaDZ2MTh6Ii8+PHBhdGggZD0iTTMwIDM2VjMwSDB2Nmgzem0zMCAwVjMwSDQydjZoMTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      <div className="container-section relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-product-dark">
            Чому наш тримач для пахощів особливий
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Ідеальне поєднання естетики, функціональності та якості
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            index={0}
            icon={<Star className="h-7 w-7" />}
            title="Сучасний дизайн"
            description="Мінімалістичний стиль, який прикрасить будь-який інтер'єр і стане акцентним елементом вашого простору."
          />
          <FeatureCard
            index={1}
            icon={<Leaf className="h-7 w-7" />}
            title="Екологічність"
            description="Безпечний PLA-пластик, виробництво з дбайливим ставленням до природи і турботою про довкілля."
          />
          <FeatureCard
            index={2}
            icon={<Shield className="h-7 w-7" />}
            title="Продумана ергономіка"
            description="Зручність використання, надійна конструкція і простота в догляді для вашого комфорту щодня."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
