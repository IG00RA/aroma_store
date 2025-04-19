import { Star, StarHalf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import firstImg from "../img/review/3.webp";
import secondImg from "../img/review/4.webp";
import thirdImg from "../img/review/5.webp";

type ReviewProps = {
  name: string;
  rating: number;
  text: string;
  image?: string;
};

const Review = ({ name, rating, text, image }: ReviewProps) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center space-x-1 mb-2">{renderStars()}</div>
        <p className="text-gray-600 mb-4">{text}</p>
        <div className="flex items-center gap-3">
          <Avatar>
            {image ? (
              <AvatarImage src={image} alt={name} />
            ) : (
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <p className="font-medium">– {name}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Анна",
      rating: 5,
      text: "Прекрасный держатель! Выглядит намного дороже своей цены. Очень стильный и отлично выполняет свою функцию.",
      image: firstImg,
    },
    {
      name: "Михаил",
      rating: 5,
      text: "Наконец-то нашел идеальный держатель для благовоний. Минималистичный дизайн, устойчивость и функциональность - все, что мне нужно.",
      image: secondImg,
    },
    {
      name: "Екатерина",
      rating: 4,
      text: "Отличное качество изготовления, пепел не разлетается, что очень важно. Рекомендую!",
      image: thirdImg,
    },
  ];

  return (
    <section className="bg-product-beige/10">
      <div className="container-section">
        <h2 className="section-title text-center">Что говорят наши клиенты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {reviews.map((review, index) => (
            <Review
              key={index}
              name={review.name}
              rating={review.rating}
              text={review.text}
              image={review.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
