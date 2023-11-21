import { useState } from "react";
import Prediction from "../prediction";

const MainSection = () => {
  const [file, setFile] = useState(null);
  const [predictedImages, setPredictedImages] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file_upload", file);

      try {
        const response = await fetch("http://localhost:8000/predict/", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        const image = data.detected_circles_img;
        setPredictedImages((prev) => [
          {
            name: file.name,
            base64: image,
          },
          ...prev,
        ]);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="md:p-10 p-5" style={{ maxWidth: "600px" }}>
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload and Predict</button>
        </div>
        <div className="mt-5 flex flex-col items-center">
          {predictedImages.map((image, index) => (
            <Prediction key={index} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
