import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "../components/ui/button";

interface QuizQuestion {
  question: string;
  options: string[];
}

interface LoveQuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export function LoveQuiz({ questions, onComplete }: LoveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResponse(true);
    
    setTimeout(() => {
      setShowResponse(false);
      setSelectedAnswer(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete();
      }
    }, 2000);
  };

  return (
    <div className="w-full max-w-xl">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl">
        {/* Progress */}
        <div className="flex justify-center gap-2 mb-8">
          {questions.map((_, index) => (
            <Heart
              key={index}
              className={`w-5 h-5 transition-all duration-300 ${
                index < currentQuestion
                  ? "text-red-500 fill-red-500"
                  : index === currentQuestion
                  ? "text-pink-400 fill-pink-400 animate-pulse"
                  : "text-pink-200"
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <h3 className="font-['Dancing_Script'] text-2xl md:text-3xl text-pink-700 mb-8 text-center">
          {questions[currentQuestion].question}
        </h3>

        {/* Options */}
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showResponse}
              className={`w-full bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-2xl py-6 text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 ${
                selectedAnswer === option && showResponse
                  ? "bg-pink-300 scale-105 ring-4 ring-pink-400"
                  : ""
              } ${showResponse && selectedAnswer !== option ? "opacity-50" : ""}`}
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Response */}
        {showResponse && selectedAnswer && (
          <div className="mt-6 text-center animate-bounce">
            <p className="text-pink-600 font-medium text-lg">
              You chose: {selectedAnswer} 💕
            </p>
          </div>
        )}

        {/* Question counter */}
        <p className="text-center text-pink-400 mt-6 font-light">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
}