import { useEffect, useState } from "react";
import useSound from "use-sound";
import { useQuestionStatus } from "./questions";

import correctSound from "../assets/sounds/correct.mp3";
import incorrectSound from "../assets/sounds/incorrect.mp3";
import answerBox from "../assets/images/answer_box.png";

interface AnswerBoxProps {
  questionIndex: number;
  index: number;
  answer: string;
  isVisible: boolean;
  halfLifelineCount: number;
  onHalfLifelineClick: () => void;
  onClick: () => void;
}

const AnswerBox = ({
  questionIndex,
  index,
  answer,
  isVisible,
  halfLifelineCount,
  onHalfLifelineClick,
  onClick,
}: AnswerBoxProps) => {
  const [playLoseSound] = useSound(incorrectSound);
  const [playWinSound] = useSound(correctSound);

  const [className, setClassName] = useState("");

  const isCorrect = useQuestionStatus(questionIndex, index);

  useEffect(() => {
    setClassName("AnswerBox");
  }, [questionIndex]);

  const handleOnClick = () => {
    if (halfLifelineCount === 0 || halfLifelineCount === 1) {
      onHalfLifelineClick();
      setClassName(`${className} dimmed`);
      return;
    }
    if (isCorrect === -1) return;
    onClick();

    if (isCorrect === 1) {
      setClassName(`${className} correct`);
      playWinSound();
    } else if (isCorrect === 0) {
      setClassName(`${className} incorrect`);
      playLoseSound();
    }
  };

  return (
    <div className={className} onClick={() => handleOnClick()}>
      <span>{String.fromCharCode("A".charCodeAt(0) + index)}</span>
      <p className="answer">{isVisible ? answer : ""}</p>
      <img src={answerBox} alt="Vastus kast" />
    </div>
  );
};

export default AnswerBox;
