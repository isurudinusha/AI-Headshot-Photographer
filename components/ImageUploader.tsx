
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  uploadedImage: File | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      
      {!uploadedImage ? (
        <label
          onClick={handleAreaClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-cyan-400 bg-slate-700/50' : 'border-slate-600 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-700/50'}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon className="w-10 h-10 mb-3 text-slate-400" />
            <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-slate-500">PNG, JPG, or WEBP</p>
          </div>
        </label>
      ) : (
        <div className="w-full p-2 border-2 border-slate-600 rounded-lg bg-slate-800/50">
          <p className="text-center text-sm mb-2 text-slate-300">Your uploaded image:</p>
          <img 
            src={URL.createObjectURL(uploadedImage)} 
            alt="Uploaded selfie" 
            className="w-full h-auto max-h-80 object-contain rounded-md" 
          />
        </div>
      )}
    </div>
  );
};
