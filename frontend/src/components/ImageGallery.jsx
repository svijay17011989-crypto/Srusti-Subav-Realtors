import { useState } from "react";

const FALLBACK_IMAGE = "/no-image.png";

function ImageGallery({ images = [] }) {
  const validImages = images.length > 0 ? images : [FALLBACK_IMAGE];
  const [activeImage, setActiveImage] = useState(validImages[0]);

  return (
    <div className="w-full">
      {/* MAIN IMAGE */}
      <div className="border rounded-xl overflow-hidden mb-4 shadow-sm">
        <img
          src={activeImage}
          alt="Property"
          className="w-full h-[360px] md:h-[420px] object-cover"
          onError={(e) => (e.target.src = FALLBACK_IMAGE)}
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3 overflow-x-auto">
        {validImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Thumbnail"
            onClick={() => setActiveImage(img)}
            onError={(e) => (e.target.src = FALLBACK_IMAGE)}
            className={`h-20 w-28 object-cover rounded-lg cursor-pointer border-2 transition
              ${
                activeImage === img
                  ? "border-blue-600"
                  : "border-transparent hover:border-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
