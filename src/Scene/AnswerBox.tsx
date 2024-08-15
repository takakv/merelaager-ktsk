import { useEffect, useState } from "react";
import useSound from "use-sound";

import correctSound from "../assets/sounds/correct.mp3";
import incorrectSound from "../assets/sounds/incorrect.mp3";
import answerBox from "../assets/images/answer_box.png";

interface AnswerBoxProps {
  questionIndex: number;
  isCorrect: boolean;
  answerIndex: number;
  answer: string;
  isVisible: boolean;
  halfLifelineCount: number;
  onHalfLifelineClick: () => void;
  onClick: () => void;
}

const AnswerBox = ({
  questionIndex,
  isCorrect,
  answerIndex,
  answer,
  isVisible,
  halfLifelineCount,
  onHalfLifelineClick,
  onClick,
}: AnswerBoxProps) => {
  const [playLoseSound] = useSound(incorrectSound);
  const [playWinSound] = useSound(correctSound);

  const [className, setClassName] = useState("");
  useEffect(() => {
    setClassName("AnswerBox");
  }, [questionIndex]);

  const handleOnClick = () => {
    if (halfLifelineCount === 0 || halfLifelineCount === 1) {
      onHalfLifelineClick();
      setClassName(`${className} dimmed`);
      return;
    }
    onClick();

    if (isCorrect) {
      setClassName(`${className} correct`);
      playWinSound();
    } else {
      setClassName(`${className} incorrect`);
      playLoseSound();
    }
  };

  return (
    <div className={className} onClick={() => handleOnClick()}>
      <span>{String.fromCharCode("A".charCodeAt(0) + answerIndex)}</span>
      <p className="answer">{isVisible ? answer : ""}</p>
      <img src={answerBox} alt="Vastus kast" />
    </div>
  );
};

export default AnswerBox;
