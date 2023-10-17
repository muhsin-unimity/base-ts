import "react-image-crop/dist/ReactCrop.css";
import { FC, useState, useRef, useEffect } from "react";
import ReactCrop, { type Crop } from "react-image-crop";

interface CropperProps {
  src: string;
  setCroppedImage: (croppedImageUrl: string) => void;
  aspectRatio: number;
}

export const Cropper: FC<CropperProps> = ({
  src,
  setCroppedImage,
  aspectRatio,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 30,
    height: 30 / (aspectRatio ? aspectRatio : 1),
    x: 0,
    y: 0,
  });

  function getCroppedImage() {
    if (imgRef.current) {
      const canvas = document.createElement("canvas");
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      canvas.width = crop.width || 100;
      canvas.height = crop.height || 100;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(
          imgRef.current,
          (crop.x || 0) * scaleX,
          (crop.y || 0) * scaleY,
          (crop.width || 100) * scaleX,
          (crop.height || 100) * scaleY,
          0,
          0,
          canvas.width,
          canvas.height
        );

        canvas.toBlob((blob) => {
          if (blob) {
            const croppedImageUrl = URL.createObjectURL(blob);
            setCroppedImage(croppedImageUrl);
          }
        });
      }
    }
  }

  return (
    <ReactCrop
      style={{ width: "100%" }}
      ruleOfThirds
      crop={crop}
      onChange={(c) => setCrop(c)}
      aspect={aspectRatio}
      onComplete={getCroppedImage}
    >
      <img
        style={{ width: "100%" }}
        ref={(element) => (imgRef.current = element)}
        src={src}
      />
    </ReactCrop>
  );
};
