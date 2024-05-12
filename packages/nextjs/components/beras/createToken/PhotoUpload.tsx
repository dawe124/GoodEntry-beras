export const PhotoUpload = ({ onFileSelect }: { onFileSelect: any }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;
    if (files) onFileSelect(files[0]);
  };

  return (
    <div>
      <span className="text-md">Picture:</span>
      <input type="file" id="photoUpload" accept="image/*" onChange={onChange} className="ml-4" title="." />
    </div>
  );
};
