import { useRef } from "react";

const MB = 0.2; // max file size in MB
const MAX_FILE_SIZE = MB * 1024 * 1024;

export const PhotoUpload = ({ onFileSelect }: { onFileSelect: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > MAX_FILE_SIZE) {
        alert(`File size exceeds the ${MB}MB limit.`);
        return;
      }
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <span className="text-md">Picture:</span>
      <input
        ref={fileInputRef}
        type="file"
        id="photoUpload"
        accept="image/*"
        onChange={onChange}
        className="hidden"
        title="."
      />
      <button type="button" onClick={handleClick} className="ml-4 px-4 py-2 bg-secondary text-neutral rounded-[1rem]">
        Upload
      </button>
      <p className="mb-0 mt-2">*It is highly recommmended to use images with 1:1 ratio</p>
      <p className="my-0">*Max allowed image size is {MB}MB</p>
    </div>
  );
};
