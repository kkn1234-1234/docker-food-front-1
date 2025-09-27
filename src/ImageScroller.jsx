import React from "react";

const ImageScroller = ({ images, speed = "10s" }) => {
  return (
    <div className="overflow-hidden w-full bg-gray-100 py-4">
      {/* Top row (scrolls left) */}
      <div
        className="flex gap-6 animate-scroll"
        style={{ "--scroll-speed": speed }}
      >
        {[...images, ...images].map((img, index) => (
          <img
            key={`top-${index}`}
            src={img}
            alt={`scroll-img-${index}`}
            className="w-40 h-40 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Bottom row (scrolls right) */}
      <div
        className="flex gap-6 animate-scroll-reverse mt-4"
        style={{ "--scroll-speed": speed }}
      >
        {[...images, ...images].map((img, index) => (
          <img
            key={`bottom-${index}`}
            src={img}
            alt={`scroll-img-${index}`}
            className="w-40 h-40 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageScroller;
