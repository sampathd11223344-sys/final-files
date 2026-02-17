import { useState } from "react";
import { Heart, X } from "lucide-react";
import { Button } from "../components/ui/button";

interface ProposalButtonProps {
  onAccept: () => void;
}

export function ProposalButton({ onAccept }: ProposalButtonProps) {
  const [showProposal, setShowProposal] = useState(false);
  const [bounceCount, setBounceCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [canAccept, setCanAccept] = useState(false);

  const handleSurpriseClick = () => {
    setShowProposal(true);
  };

  const handleYesClick = () => {
    if (bounceCount < 5) {
      setBounceCount(bounceCount + 1);
      if (bounceCount === 4) {
        setCanAccept(true);
      }
    } else if (canAccept) {
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setTimeout(() => {
      onAccept();
    }, 500);
  };

  return (
    <div className="w-full max-w-lg">
      {!showProposal ? (
        <div className="text-center">
          <p className="font-['Dancing_Script'] text-2xl text-pink-700 mb-8">
            Are you ready for the final surprise?
          </p>
          <Button
            onClick={handleSurpriseClick}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-10 py-6 text-xl font-bold shadow-lg shadow-pink-300/50 hover:shadow-pink-400/70 transition-all hover:scale-105 animate-pulse"
          >
            CLICK FOR FINAL SURPRISE 💝
          </Button>
        </div>
      ) : (
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl text-center">
          <Heart className="w-16 h-16 text-red-500 fill-red-500 mx-auto mb-6 animate-pulse" />
          <h2 className="font-['Dancing_Script'] text-4xl md:text-5xl text-pink-700 mb-8">
            Will You Be My Valentine? ❤️
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleYesClick}
              className={`bg-pink-500 hover:bg-pink-600 text-white rounded-full px-10 py-4 text-xl font-bold shadow-lg transition-all ${
                bounceCount > 0 && bounceCount < 5
                  ? "animate-bounce"
                  : canAccept
                  ? "ring-4 ring-pink-400 ring-offset-2"
                  : ""
              }`}
            >
              YES 💖
            </Button>
            <Button
              disabled
              className="bg-gray-200 text-gray-400 rounded-full px-10 py-4 text-xl font-bold cursor-not-allowed"
            >
              NO 🙈
            </Button>
          </div>

          {bounceCount > 0 && bounceCount < 5 && (
            <p className="text-pink-500 mt-4 font-medium">
              Click {5 - bounceCount} more times! 💕
            </p>
          )}

          {canAccept && !showPopup && (
            <p className="text-pink-600 mt-4 font-medium animate-pulse">
              Click YES one more time! 💗
            </p>
          )}
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 rounded-3xl p-8 md:p-12 shadow-2xl max-w-md text-center animate-in fade-in zoom-in duration-500">
            <Heart className="w-20 h-20 text-red-500 fill-red-500 mx-auto mb-6 animate-pulse" />
            <h3 className="font-['Dancing_Script'] text-3xl text-pink-700 mb-4">
              You Made Me So Happy! 💕
            </h3>
            <p className="text-pink-600 text-lg mb-6 leading-relaxed">
              I knew you'd say yes! You're the best thing that ever happened to me. 
              I can't wait to spend forever with you!
            </p>
            <Button
              onClick={handlePopupClose}
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-3 font-medium"
            >
              Continue to Forever 💝
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}