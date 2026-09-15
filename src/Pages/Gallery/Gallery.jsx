import { useEffect, useState } from "react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85", alt: "Fresh vegetable salad" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85", alt: "Freshly baked pizza" },
  { src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=85", alt: "Restaurant dining table" },
  { src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85", alt: "Pasta with herbs" },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85", alt: "Grilled food platter" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=85", alt: "Colorful healthy bowl" },
  { src: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85", alt: "Stack of pancakes" },
  { src: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1200&q=85", alt: "Dessert with berries" },
  { src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85", alt: "Pizza being served" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85", alt: "Table full of food" },
  { src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85", alt: "Fresh ingredients on a table" },
  { src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=85", alt: "Chocolate dessert" },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedImage = selectedIndex === null ? null : galleryImages[selectedIndex];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedIndex === null) return;
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((index) => (index + 1) % galleryImages.length);
      if (event.key === "ArrowLeft") setSelectedIndex((index) => (index - 1 + galleryImages.length) % galleryImages.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <main className="min-h-screen bg-orange-50/40 pb-16">
      <section className="bg-orange-500 px-4 py-16 text-center text-white sm:py-20">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-100">Hidden Pearl moments</p>
        <h1 className="text-4xl font-bold sm:text-5xl">Gallery</h1>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600">A taste of the dishes, ingredients, and warm moments from Hidden Pearl. Select an image to view it in full.</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-5">
          {galleryImages.map((image, index) => (
            <button key={image.src} type="button" onClick={() => setSelectedIndex(index)} className="group relative overflow-hidden rounded-xl bg-gray-200 text-left focus:outline-none focus:ring-4 focus:ring-orange-300">
              <img src={image.src} alt={image.alt} className="aspect-square w-full object-cover transition duration-300 group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-black/0 text-sm font-semibold text-white opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100">View image</span>
            </button>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4" role="dialog" aria-modal="true" aria-label={selectedImage.alt} onClick={() => setSelectedIndex(null)}>
          <button type="button" onClick={() => setSelectedIndex(null)} className="absolute right-5 top-5 rounded-full bg-white/15 px-4 py-2 text-2xl text-white hover:bg-white/25" aria-label="Close gallery image">×</button>
          <button type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((index) => (index - 1 + galleryImages.length) % galleryImages.length); }} className="absolute left-3 rounded-full bg-white/15 px-4 py-3 text-3xl text-white hover:bg-white/25 sm:left-8" aria-label="Previous image">‹</button>
          <img src={selectedImage.src} alt={selectedImage.alt} onClick={(event) => event.stopPropagation()} className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl" />
          <button type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((index) => (index + 1) % galleryImages.length); }} className="absolute right-3 rounded-full bg-white/15 px-4 py-3 text-3xl text-white hover:bg-white/25 sm:right-8" aria-label="Next image">›</button>
        </div>
      )}
    </main>
  );
};

export default Gallery;
