import "./App.css";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, firestore } from "./Firebase";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { Thumbnail } from "./Thumbnail";

function App() {
  //web hooks for setting selected main image and it's segments
  const [mainImageUpload, setMainImageUpload] = useState(null); 
  const [segmentsUpload, setSegmentsUpload] = useState([]);
  const [mainImageUrls, setMainImageUrls] = useState([]);

  // upload selected files to firebase storage. Also persist the mainImageUrl 
  // and it's segmentUrls in firestore
  const uploadFiles = async () => {
    if (mainImageUpload == null) return;
    const currFilesRef = ref(storage, `${Date.now()}/`);
    const mainImageRef = ref(currFilesRef, `${mainImageUpload.name}`);
    var snapshot = await uploadBytes(mainImageRef, mainImageUpload);
    var mainImageUrl = await getDownloadURL(snapshot.ref);
    setMainImageUrls((prev) => [...prev, mainImageUrl]);

    var segmentUrls = [];
    for (let i = 0; i < segmentsUpload.length; i++) {
      const segmentRef = ref(currFilesRef, `${segmentsUpload[i].name}`);
      var segmentSnapshot = await uploadBytes(segmentRef, segmentsUpload[i]);
      var segmentUrl = await getDownloadURL(segmentSnapshot.ref);
      segmentUrls.push(segmentUrl);
    }

    // add mainImageUrl and it's segmentUrls in an array in firestore document
    addDoc(collection(firestore, "images"), {
      mainImageUrl: mainImageUrl,
      segmentUrls: segmentUrls
    });

     // reset the selected files (in UI as well)
     setMainImageUpload("");
     setSegmentsUpload("");
     const mainFileInput = document.getElementById("selectMainImage");
     const segmentFilesInput = document.getElementById("selectSegments");
     mainFileInput.value = "";
     segmentFilesInput.value = "";

  };

  // web hook to initialize mainImageUrls present in firestore for thumbnails
  useEffect(() => {
    const fetchMainImages = async () => {
      const allMainImages = [];
      const querySnapshot = await getDocs(collection(firestore, "images"));
      querySnapshot.forEach((doc) => {
        allMainImages.push(doc.data().mainImageUrl);
      });
      setMainImageUrls(allMainImages);
    };
    fetchMainImages();
  }, []);



  return (
    <div className="App">
      <div className="image-upload-container">
        <div className="input-wrapper">
          <label htmlFor="selectMainImage">Select Main Image</label>
          <input
            type="file"
            id="selectMainImage"
            onChange={(event) => {
              setMainImageUpload(event.target.files[0]);
            } } />
        </div>

        <div className="input-wrapper">
          <label htmlFor="selectSegments">Select Segments</label>
          <input
            type="file"
            id="selectSegments"
            multiple onChange={(event) => {
              setSegmentsUpload(event.target.files);
            } } />
        </div>
        <button onClick={uploadFiles}>Upload Files</button>
      </div> 

      <div className="thumbnail-container">
        {mainImageUrls.map((url) => {
            return (
                <Thumbnail imageUrl={url} />
            );
          })}
      </div>
    </div>

  );
}

export default App;
