import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImg from "../img/hero.webp";

const HeroSection = () => {
  const { toast } = useToast();
  const [heroData, setHeroData] = useState({
    title: "Элегантный держатель для ароматических палочек",
    subtitle:
      "Минималистичный дизайн, который преображает атмосферу вашего пространства, принося гармонию и эстетическое наслаждение",
    buttonText: "Заказать сейчас",
    imageUrl: heroImg,
  });

  const scrollToFeatures = () => {
    document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToOrder = () => {
    document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOrderNow = () => {
    scrollToOrder();
    toast({
      title: "Перейдите к заказу",
      description: "Вы можете выбрать подходящий для вас вариант",
    });
  };

  return (
    <section className="bg-gradient-to-br from-product-beige/30 via-white to-product-beige/20 relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-product-beige/40 to-transparent opacity-60 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-product/10 to-transparent opacity-40 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-product-beige/20 blur-3xl"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-product/10 blur-3xl"
      ></motion.div>

      <div className="container-section flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <div className="space-y-3">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block px-4 py-1.5 bg-product-beige/50 text-product-dark rounded-full text-sm font-medium backdrop-blur-sm"
            >
              Эксклюзивный дизайн
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold leading-tight text-product-dark tracking-tight">
              <span className="relative inline-block">
                {heroData.title.split(" ").slice(0, 1)}
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1.5 bg-product/40 rounded-full"
                ></motion.span>
              </span>{" "}
              <br />
              {heroData.title.split(" ").slice(1).join(" ")}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-product-dark/70 leading-relaxed font-light">
            {heroData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Button
                onClick={handleOrderNow}
                size="lg"
                className="bg-product text-white hover:bg-product-dark transition-all duration-300 shadow-md hover:shadow-lg px-8 rounded-xl"
              >
                {heroData.buttonText}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Button
                onClick={scrollToFeatures}
                variant="outline"
                size="lg"
                className="border-product text-product hover:bg-product/5 transition-all duration-300 px-8 rounded-xl"
              >
                Узнать больше
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full lg:w-1/2 flex justify-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-product-beige/40 via-product-beige/20 to-white/5 rounded-full blur-3xl transform scale-75"></div>

          <div className="relative z-10 w-full max-w-[500px] aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tl from-product-beige/20 to-white/80 rounded-3xl -rotate-6 shadow-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-product-beige/20 to-transparent rounded-3xl rotate-3 shadow-md"></div>
            <motion.img
              src={heroData.imageUrl}
              alt="Элегантный держатель для ароматических палочек"
              className="relative z-10 w-full h-full object-contain rounded-3xl shadow-xl"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute top-10 right-10 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-product"
              initial={{ y: 0, rotate: 0 }}
              animate={{ y: -10, rotate: 10 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <span className="text-sm font-medium">Эко</span>
            </motion.div>
            <motion.div
              className="absolute bottom-20 left-0 w-20 h-20 bg-product-beige/80 rounded-full shadow-lg flex items-center justify-center text-product-dark backdrop-blur-sm"
              initial={{ y: 0, rotate: 0 }}
              animate={{ y: 10, rotate: -5 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            >
              <span className="text-sm font-medium">Стиль</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 transform flex flex-col items-center space-y-2 cursor-pointer"
        style={{ left: "45%", transform: "translateX(-45%)" }}
        onClick={scrollToFeatures}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-sm text-product-dark/70">Прокрутите вниз</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-5 w-5 text-product" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
