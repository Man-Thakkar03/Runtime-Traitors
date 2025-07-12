"use client";

interface PreviewBoxProps {
  text: string;
  image?: string | null;
}

export default function PreviewBox({ text, image }: PreviewBoxProps) {
  const hashtags = text.split(' ').filter(word => word.startsWith('#'));
  
  return (
    <div className="mt-4 border border-[#2D2D35] p-4 rounded-lg bg-[#23232A] text-gray-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#2D2D35] flex items-center justify-center">
          <span className="text-gray-300 font-semibold">U</span>
        </div>
        <div>
          <p className="font-semibold text-white">You</p>
          <p className="text-xs text-gray-400">Just now</p>
        </div>
      </div>
      
      <p className="text-gray-300 whitespace-pre-wrap mb-4">{text}</p>
      
      {image && (
        <div className="mb-4 rounded-lg overflow-hidden border border-[#2D2D35]">
          <img 
            src={image}
            alt="Preview" 
            className="max-h-[300px] w-full object-contain" 
          />
        </div>
      )}
      
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {hashtags.map((tag, i) => (
            <span 
              key={i}
              className="text-sm px-2 py-1 rounded-full bg-[#2D2D35] text-purple-400 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
