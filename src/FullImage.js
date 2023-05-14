import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { firestore } from "./Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const FullImage = ({ imageUrl }) => {
  const [segments, setSegments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSegmentUrl, setSelectedSegmentUrl] = useState("");

  useEffect(() => {
    // read segmentUrls for the main image from firestore
    const fetchSegments = async () => {
      const imagesRef = collection(firestore, "images");
      const q = query(imagesRef, where("mainImageUrl", "==", `${imageUrl}`));
      const querySnapshot = await getDocs(q);
      const segmentUrls = querySnapshot.docs.map(doc => doc.data().segmentUrls);
      setSegments(segmentUrls);
    };

    fetchSegments();
  }, [imageUrl]);

  const handleClick = (e) => {
    const mainImage = e.target;
    const ratio = mainImage.naturalWidth / mainImage.clientWidth;

    //normalise the co-ordinates on rendered image 
    const x = Math.round(e.nativeEvent.offsetX * ratio);
    const y = Math.round(e.nativeEvent.offsetY * ratio);

    for (let i = 0; i < segments[0].length; i++) {
        const segmentImg = new Image();
        segmentImg.crossOrigin = "anonymous";
        segmentImg.src = segments[0][i];

        segmentImg.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = segmentImg.width;
        canvas.height = segmentImg.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(segmentImg, 0, 0, segmentImg.width, segmentImg.height);

        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        // check alpha value of pixel
        if (pixelData[3] !== 0) {
            setSelectedSegmentUrl(segments[0][i]);
            setModalIsOpen(true);
            return;
        }
        const pixel = pixelData.data;
        };
    }
  };

  return (
    <div className="full-image">
      <img src={imageUrl} alt="FullImage" onClick={handleClick}/>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <img src={selectedSegmentUrl} />
      </Modal>
    </div>
  );
}

export {
    FullImage
};
