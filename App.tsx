
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { GeneratedImage } from './components/GeneratedImage';
import { Loader } from './components/Loader';
import { generateHeadshot } from './services/geminiService';
import { STYLE_OPTIONS } from './constants';
import type { StyleOption } from './types';

type AppState = 'initial' | 'image_uploaded' | 'style_selected' | 'generating' | 'generated' | 'editing';

export default function App() {
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);
  const [generatedImageBase64, setGeneratedImageBase64] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>('initial');

  const handleImageUpload = useCallback((file: File) => {
    setUploadedImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImageBase64(reader.result as string);
      setAppState('image_uploaded');
      setGeneratedImageBase64(null); // Reset generated image on new upload
      setSelectedStyle(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleStyleSelect = useCallback((style: StyleOption) => {
    setSelectedStyle(style);
    setAppState('style_selected');
  }, []);
  
  const processImageGeneration = useCallback(async (base64Image: string, prompt: string, imageFile: File | null) => {
    if (!base64Image || !prompt || !imageFile) return;

    setIsLoading(true);
    setError(null);
    setAppState(generatedImageBase64 ? 'editing' : 'generating');

    try {
      const mimeType = imageFile.type;
      const imageData = base64Image.split(',')[1];
      const generatedImage = await generateHeadshot(imageData, mimeType, prompt);
      setGeneratedImageBase64(`data:image/png;base64,${generatedImage}`);
      setAppState('generated');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAppState(generatedImageBase64 ? 'generated' : 'style_selected');
    } finally {
      setIsLoading(false);
    }
  }, [generatedImageBase64]);

  const handleGenerateClick = useCallback(() => {
    if (uploadedImageBase64 && selectedStyle && uploadedImageFile) {
      processImageGeneration(uploadedImageBase64, selectedStyle.prompt, uploadedImageFile);
    }
  }, [uploadedImageBase64, selectedStyle, uploadedImageFile, processImageGeneration]);
  
  const handleEditClick = useCallback(() => {
     if (generatedImageBase64 && editPrompt && uploadedImageFile) {
        processImageGeneration(generatedImageBase64, editPrompt, uploadedImageFile);
    }
  }, [generatedImageBase64, editPrompt, uploadedImageFile, processImageGeneration]);

  const handleStartOver = useCallback(() => {
    setUploadedImageFile(null);
    setUploadedImageBase64(null);
    setSelectedStyle(null);
    setGeneratedImageBase64(null);
    setEditPrompt('');
    setIsLoading(false);
    setError(null);
    setAppState('initial');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 font-sans p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <Header />
        
        <main className="mt-8 bg-slate-900/50 rounded-2xl shadow-2xl p-6 md:p-10 border border-slate-700">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6 text-center">
              <strong>Error:</strong> {error}
            </div>
          )}

          {isLoading && <Loader message={appState === 'generating' ? 'Generating your headshot...' : 'Applying your edits...'} />}

          {!generatedImageBase64 && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-cyan-400 border-b-2 border-cyan-400/30 pb-2">1. Upload Your Selfie</h2>
                <ImageUploader onImageUpload={handleImageUpload} uploadedImage={uploadedImageFile} />
              </div>

              <div className={`flex flex-col gap-6 transition-opacity duration-500 ${appState !== 'initial' ? 'opacity-100' : 'opacity-50 md:opacity-40 pointer-events-none md:pointer-events-auto'}`}>
                <h2 className="text-2xl font-bold text-cyan-400 border-b-2 border-cyan-400/30 pb-2">2. Choose a Style</h2>
                <StyleSelector styles={STYLE_OPTIONS} selectedStyle={selectedStyle} onStyleSelect={handleStyleSelect} />
              </div>
            </div>
          )}

          {generatedImageBase64 && !isLoading && (
            <div className="flex flex-col items-center gap-8">
              <GeneratedImage 
                imageBase64={generatedImageBase64}
                editPrompt={editPrompt}
                onEditPromptChange={setEditPrompt}
                onEditSubmit={handleEditClick}
                isEditing={appState === 'editing'}
              />
              <button
                onClick={handleStartOver}
                className="mt-4 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500"
              >
                Start Over
              </button>
            </div>
          )}

          {appState === 'style_selected' && !isLoading && (
            <div className="mt-10 text-center">
              <button
                onClick={handleGenerateClick}
                disabled={!uploadedImageFile || !selectedStyle || isLoading}
                className="px-12 py-4 bg-cyan-500 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400"
              >
                Generate Headshot
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
