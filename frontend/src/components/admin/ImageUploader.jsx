import { useEffect } from "react";

const ImageUploader = ({ images, setImages, max = 5 }) => {

  /* HANDLE FILE SELECT */
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files
      .slice(0, max - images.length)
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    setImages((prev) => [...prev, ...newImages]);
  };

  /* DELETE IMAGE */
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  /* MOVE IMAGE */
  const moveImage = (from, to) => {
    if (to < 0 || to >= images.length) return;
    const updated = [...images];
    const temp = updated[from];
    updated[from] = updated[to];
    updated[to] = temp;
    setImages(updated);
  };

  /* CLEANUP PREVIEWS */
  useEffect(() => {
    return () => {
      images.forEach((img) => img.preview && URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  return (
    <div className="space-y-4">

      {/* FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        disabled={images.length >= max}
        className="block w-full text-sm"
      />

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Upload up to {max} images (drag order matters)
      </p>

      {/* PREVIEW GRID */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden border dark:border-gray-700"
          >
            <img
              src={img.preview || img}
              alt="preview"
              className="h-32 w-full object-cover"
            />

            {/* ACTIONS */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => moveImage(index, index - 1)}
                className="px-2 py-1 bg-white text-black text-xs rounded"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveImage(index, index + 1)}
                className="px-2 py-1 bg-white text-black text-xs rounded"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="px-2 py-1 bg-red-600 text-white text-xs rounded"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
