
import React from 'react';

interface GeneratedImageProps {
  imageBase64: string;
  editPrompt: string;
  onEditPromptChange: (prompt: string) => void;
  onEditSubmit: () => void;
  isEditing: boolean;
}

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageBase64, editPrompt, onEditPromptChange, onEditSubmit, isEditing }) => {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-6">
      <h2 className="text-3xl font-bold text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">Your AI Headshot is Ready!</span>
      </h2>
      <div className="w-full max-w-md p-2 bg-slate-800/50 border-2 border-slate-700 rounded-lg shadow-lg">
        <img 
          src={imageBase64} 
          alt="Generated headshot" 
          className="w-full h-auto rounded-md"
        />
      </div>

      <div className="w-full max-w-md mt-4">
        <label htmlFor="edit-prompt" className="block text-lg font-semibold text-cyan-400 mb-2">
          Refine with a prompt:
        </label>
        <div className="flex gap-2">
          <input
            id="edit-prompt"
            type="text"
            value={editPrompt}
            onChange={(e) => onEditPromptChange(e.target.value)}
            placeholder="e.g., 'Change the background to a library'"
            className="flex-grow bg-slate-800 border border-slate-600 text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
          />
          <button
            onClick={onEditSubmit}
            disabled={!editPrompt.trim() || isEditing}
            className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400"
          >
            {isEditing ? 'Applying...' : 'Apply'}
          </button>
        </div>
         <p className="text-xs text-slate-500 mt-2">Try prompts like "Add a retro filter", "Change shirt color to blue", or "Make the lighting warmer".</p>
      </div>
    </div>
  );
};
