"use client";

interface CharCounterProps {
  text: string;
  max?: number;
}

export default function CharCounter({ text, max = 500 }: CharCounterProps) {
  const length = text.length;
  const percent = (length / max) * 100;
  
  // Color changes based on how close to the limit
  let textColor = "text-gray-500";
  if (percent > 80 && percent < 90) {
    textColor = "text-yellow-500";
  } else if (percent >= 90 && percent < 100) {
    textColor = "text-orange-500";
  } else if (percent >= 100) {
    textColor = "text-red-500";
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-[#23232A] rounded-full overflow-hidden">
        <div 
          className={`h-full ${
            percent > 80 && percent < 90 
              ? 'bg-yellow-500' 
              : percent >= 90 && percent < 100
                ? 'bg-orange-500'
                : percent >= 100 
                  ? 'bg-red-500' 
                  : 'bg-purple-600'
          }`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <p className={`text-right text-xs ${textColor}`}>
        {length}/{max}
      </p>
    </div>
  );
}
