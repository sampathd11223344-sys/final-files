import { useState, useEffect } from "react";
import { StorySection } from "./components/StorySection";
import { FloatingHearts } from "./components/FloatingHearts";
import { LoveQuiz } from "./components/LoveQuiz";
import { ProposalButton } from "./components/ProposalButton";
import { useAudio } from "./utils/useAudio";
import { Heart, Music, Music2 } from "lucide-react";

const storySections = [
  {
    heading: "The Day We Met",
    content: "I still remember that moment clearly. The way you smiled, the sparkle in your eyes — everything around me faded away. In that instant, I knew my life was about to change forever.",
  },
  {
    heading: "Every Moment Together",
    content: "Each day with you feels like a beautiful adventure. From our silly inside jokes to those quiet moments of understanding — you make even the ordinary days feel extraordinary.",
  },
  {
    heading: "Your Beautiful Soul",
    content: "Your kindness, your strength, the way you care for everyone around you — you have a heart of gold. I fall in love with you more every single day.",
  },
  {
    heading: "Through Every Season",
    content: "Whether we're laughing until our stomachs hurt or holding each other through the tough times — I'm grateful for every season we share. You're my rock, my safe place.",
  },
  {
    heading: "Little Things I Love",
    content: "The way you scrunch your nose when you're thinking. How you always know exactly what I need before I say a word. The warmth of your hand in mine.",
  },
  {
    heading: "Dreams We Share",
    content: "I see a future filled with so many beautiful moments — traveling together, building our home, growing old side by side. Every dream is better because you're in it.",
  },
  {
    heading: "You Are My Everything",
    content: "Words can never fully express how much you mean to me. You're not just my love — you're my best friend, my confidant, my heart's true home.",
  },
];

const quizQuestions = [
  {
    question: "What's my favorite thing about you?",
    options: ["Your beautiful smile 😊", "Your kind heart 💕", "Everything about you ✨"],
  },
  {
    question: "What's our perfect date?",
    options: ["Cozy movie night 🎬", "Romantic dinner 🍷", "Adventure together 🌟"],
  },
  {
    question: "How much do I love you?",
    options: ["To the moon 🌙", "To infinity ∞", "More than words can say 💗"],
  },
  {
    question: "What makes you happiest?",
    options: ["Being with you 💑", "Our memories 📸", "Your hugs 🤗"],
  },
  {
    question: "What do I promise you?",
    options: ["Forever love 💍", "Always by your side 🤝", "All of the above ❤️"],
  },
];

type AppStage = "loading" | "story" | "quiz" | "proposal" | "final";

export default function App() {
  const [stage, setStage] = useState<AppStage>("loading");
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { isPlaying, toggleAudio } = useAudio();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("story");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStoryComplete = () => {
    setStage("quiz");
  };

  const handleQuizComplete = () => {
    setStage("proposal");
  };

  const handleFinalAccept = () => {
    setStage("final");
  };

  return (
    <div className="min-h-screen bg-pink-50 overflow-x-hidden">
      <FloatingHearts count={20} />
      
      {/* Audio Toggle */}
      <button
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle music"
      >
        {isPlaying ? <Music className="w-5 h-5 text-pink-600" /> : <Music2 className="w-5 h-5 text-pink-400" />}
      </button>

      {/* Loading Screen */}
      {stage === "loading" && (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="animate-bounce">
            <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
          </div>
          <p className="mt-4 text-pink-700 text-lg font-light">Loading your love story...</p>
        </div>
      )}

      {/* Story Stage */}
      {stage === "story" && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <StorySection
            sections={storySections}
            currentIndex={currentStoryIndex}
            onNext={() => {
              if (currentStoryIndex < storySections.length - 1) {
                setCurrentStoryIndex(currentStoryIndex + 1);
              } else {
                handleStoryComplete();
              }
            }}
          />
        </div>
      )}

      {/* Quiz Stage */}
      {stage === "quiz" && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <LoveQuiz
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
        </div>
      )}

      {/* Proposal Stage */}
      {stage === "proposal" && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <ProposalButton onAccept={handleFinalAccept} />
        </div>
      )}

      {/* Final Stage */}
      {stage === "final" && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-pink-100">
          <FloatingHearts count={30} slow={true} />
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl max-w-2xl text-center z-10">
            <Heart className="w-20 h-20 text-red-500 fill-red-500 mx-auto mb-6 animate-pulse" />
            <p className="font-['Dancing_Script'] text-3xl md:text-4xl text-pink-700 leading-relaxed mb-6">
              I promise to stand by you through every storm and sunshine...
            </p>
            <p className="font-['Dancing_Script'] text-4xl md:text-5xl text-red-600 font-bold mb-4">
              I LOVE YOU FOREVER AND EVER BAVA ❤️
            </p>
            <p className="font-['Dancing_Script'] text-2xl text-pink-600">
              From your darling 💋
            </p>
          </div>
        </div>
      )}
    </div>
  );
}