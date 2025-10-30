
import React from 'react';
import type { StyleOption } from '../types';

interface StyleSelectorProps {
  styles: StyleOption[];
  selectedStyle: StyleOption | null;
  onStyleSelect: (style: StyleOption) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onStyleSelect(style)}
          className={`relative block p-2 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-cyan-500/50 ${selectedStyle?.id === style.id ? 'ring-4 ring-cyan-500 scale-105' : 'hover:scale-105 ring-2 ring-transparent hover:ring-slate-600'}`}
        >
          <img src={style.thumbnail} alt={style.name} className="w-full h-auto rounded-md aspect-square object-cover" />
          <div className="absolute inset-0 bg-black/50 hover:bg-black/30 transition-colors duration-300 rounded-md flex items-end p-2">
            <p className={`w-full text-center text-sm font-semibold transition-colors duration-300 ${selectedStyle?.id === style.id ? 'text-cyan-300' : 'text-white'}`}>
              {style.name}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};
