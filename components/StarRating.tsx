import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  // Convert rating to a number out of 10
  const normalizedRating = Math.round(rating * 10) / 10;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating / 2
                ? "text-yellow-400 fill-yellow-400"
                : star - 0.5 <= rating / 2
                ? "text-yellow-400 fill-yellow-400 opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm ml-1">{normalizedRating}/10</span>
    </div>
  );
}
