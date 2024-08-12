import { useEffect, useState } from "react";

import AnswerBox from "./AnswerBox";

interface AnswerGridProps {
  questionIndex: number;
  answers: string[];
  halfLifelineCount: number;
  onHalfLifelineClick: () => void;
  onClick: () => void;
}

// All answers are hidden.
const initialState = [false, false, false, false];

const AnswerGrid = ({
  questionIndex,
  answers,
  halfLifelineCount,
  onHalfLifelineClick,
  onClick,
}: AnswerGridProps) => {
  const [visibleStates, setVisibleStates] = useState(initialState);

  // When a new question comes, hide all answers.
  useEffect(() => {
    setVisibleStates(initialState);
  }, [questionIndex]);

  // Reveal answers one by one.
  useEffect(() => {
    const falseIndex = visibleStates.findIndex((el) => !el);

    const revealNext = () => {
      const nextVisibleStates = visibleStates.map((b, i) => {
        if (i === falseIndex) return true;
        return b;
      });
      setVisibleStates(nextVisibleStates);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") revealNext();
    };

    if (falseIndex !== -1) window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visibleStates]);

  return (
    <div className="AnswerGrid">
      {Array.from({ length: 4 }, (_, k) => (
        <AnswerBox
          halfLifelineCount={halfLifelineCount}
          onHalfLifelineClick={onHalfLifelineClick}
          onClick={() => onClick()}
          key={k}
          questionIndex={questionIndex}
          index={k}
          answer={answers[k]}
          isVisible={visibleStates[k]}
        />
      ))}
    </div>
  );
};

export default AnswerGrid;
