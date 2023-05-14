import React, { useState, useEffect } from "react";
import { FullImage } from "./FullImage";
import "./App.css";

const Thumbnail = ({ imageUrl }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    // draw diminished versions of main images for thumbnails
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous"; // to enable cross-origin requests
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = 30;
      canvas.height = 30;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      setThumbnailUrl(canvas.toDataURL());
    };
  }, [imageUrl]);


  const handleThumbnailClick = () => {
    setShowFullImage(true);
  };

  const handleCloseClick = () => {
    setShowFullImage(false);
  };

  return (
    <div>
      <img className="thumbnail" src={thumbnailUrl} alt="Thumbnail" onClick={handleThumbnailClick}/>
      {showFullImage && (
        <div className="backdrop-container">
          <div
            className="backdrop"
            onClick={handleCloseClick}
          />
          <FullImage
          imageUrl={imageUrl}
          />
        </div>
      )}
    </div>
  );
};

export{
    Thumbnail
};
