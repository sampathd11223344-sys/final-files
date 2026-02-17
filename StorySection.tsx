import { useState, useEffect } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

interface StorySectionProps {
  sections: Array<{ heading: string; content: string }>;
  currentIndex: number;
  onNext: () => void;
}

export function StorySection({ sections, currentIndex, onNext }: StorySectionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showNext, setShowNext] = useState(false);
  const currentSection = sections[currentIndex];

  useEffect(() => {
    setDisplayedText("");
    setShowNext(false);
    
    let index = 0;
    const text = currentSection.content;
    const typingSpeed = 30;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowNext(true), 1000);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [currentSection]);

  // Auto-advance after 4 seconds if text is complete
  useEffect(() => {
    if (showNext) {
      const timer = setTimeout(() => {
        onNext();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showNext, onNext]);

  return (
    <div className="w-full max-w-2xl">
      {/* Progress indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index <= currentIndex ? "bg-pink-400 w-8" : "bg-pink-200 w-2"
            }`}
          />
        ))}
      </div>

      {/* Story card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
        <h2 className="font-['Dancing_Script'] text-3xl md:text-4xl text-pink-700 mb-6 text-center">
          {currentSection.heading}
        </h2>
        <p className="text-pink-800 text-lg leading-relaxed min-h-32">
          {displayedText}
          <span className="inline-block w-0.5 h-5 bg-pink-500 animate-pulse ml-1" />
        </p>

        {/* Next button */}
        {showNext && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={onNext}
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
            >
              {currentIndex === sections.length - 1 ? (
                <>
                  Continue to Quiz <Heart className="w-5 h-5 fill-white" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Section counter */}
      <p className="text-center text-pink-400 mt-6 font-light">
        {currentIndex + 1} of {sections.length}
      </p>
    </div>
  );
}