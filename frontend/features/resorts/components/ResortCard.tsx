import { ResortWithFavorite } from "@/types/resort";
import { Heart, MapPin, Star, Bed, DoorOpen, Leaf } from "lucide-react";
import Image from "next/image";

interface ResortCardProps {
  resort: ResortWithFavorite;
  onToggleFavorite: (resort: ResortWithFavorite) => void;
}

export default function ResortCard({
  resort,
  onToggleFavorite,
}: ResortCardProps) {
  return (
    <div
      key={resort.id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="p-6 min-h-48">
        <div className="flex items-start justify-between mb-3 min-h-14">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 line-clamp-2">
            {resort.name}
          </h3>
          <button
            onClick={() => onToggleFavorite(resort)}
            className={`ml-2 hover:scale-110 transition-transform cursor-pointer ${
              resort.isFavorite
                ? "text-red-500"
                : "text-gray-300 dark:text-gray-600"
            }`}
            title={
              resort.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className="w-6 h-6"
              fill={resort.isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        <Image
          src="/istockphoto-1040315976-1024x1024.jpg"
          width={500}
          height={500}
          alt={resort.name || "Resort image"}
          className="rounded-lg mb-4 object-cover w-full h-64"
        />

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 shrink-0" />
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center line-clamp-2">
            {resort.place || "N/A"}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
          <span className="font-semibold text-gray-900 dark:text-white">
            {resort.rating}
          </span>
          {resort.totalReviews && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({resort.totalReviews})
            </span>
          )}
        </div>

        <div className="flex gap-2 items-start">
          <DoorOpen className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 line-clamp-2">
            {resort.room || "N/A"}
          </p>
        </div>

        <div className="flex gap-2 items-start">
          <Bed className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 line-clamp-2">
            {resort.bed || "N/A"}
          </p>
        </div>

        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
          {resort.price || "N/A"} per night
        </p>

        {resort.travelSustainableLevel && (
          <div className="flex items-center gap-2 mt-2">
            <Leaf className="w-3 h-3 shrink-0" />
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
              {resort.travelSustainableLevel}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
