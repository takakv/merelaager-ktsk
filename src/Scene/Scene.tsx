import { createContext, useEffect, useState } from "react";
import useSound from "use-sound";

import { OneHalfContext } from "./contexts";

import QuestionBox from "./QuestionBox.tsx";
import Lifelines from "./Lifelines.tsx";
import AnswerGrid from "./AnswerGrid.tsx";

import "./Scene.scss";

import newSound from "../assets/sounds/std_new_question.mp3";
import thinkSound from "../assets/sounds/std_think.mp3";
import questions from "../assets/qna.json";

const GameContext = createContext(true);

const Scene = () => {
  const [qIndex, setQIndex] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const [startThinkSound, setStartThinkSound] = useState(false);

  // Lifeline stuff
  const [halfLifelineIsUsed, setHalfLifelineIsUsed] = useState(0);
  const [halfLifelineCount, setHalfLifelineCount] = useState(-1);

  const [playNewSound] = useSound(newSound, { interrupt: false });
  const [playThinkSound, thinkSoundExposedData] = useSound(thinkSound, {
    interrupt: true,
    onend: () => {
      // Loop the thinking music.
      setStartThinkSound(true);
    },
  });

  useEffect(() => {
    console.log("Playing 'new question'");
    playNewSound();
    setTimeout(() => {
      setStartThinkSound(true);
    }, 5200);
  }, [playNewSound, qIndex]);

  useEffect(() => {
    if (!startThinkSound) return;
    console.log("Playing 'thinking'");
    playThinkSound();
    setStartThinkSound(false);
  }, [playThinkSound, startThinkSound]);

  const moveForward = (e: KeyboardEvent) => {
    console.log("Attempt moving forward");
    if (e.key === "Enter") {
      window.removeEventListener("keydown", moveForward);
      setQIndex(qIndex + 1);
      setIsFirstClick(true);
    }
  };

  const onClick = () => {
    thinkSoundExposedData.stop();
    setIsFirstClick(false);
    window.addEventListener("keydown", moveForward);
  };

  const oneHalfLifeline = () => {
    if (halfLifelineIsUsed !== 0) return;
    setHalfLifelineIsUsed(1);
    setHalfLifelineCount(0);
  };

  const onHalfLifelineClick = () => {
    setHalfLifelineCount(halfLifelineCount + 1);
  };

  return (
    <OneHalfContext.Provider value={halfLifelineIsUsed}>
      <GameContext.Provider value={isFirstClick}>
        <div className="GameScene">
          <QuestionBox question={questions[qIndex].question} />
          <AnswerGrid
            onClick={() => onClick()}
            questionIndex={qIndex}
            answers={questions[qIndex].answers}
            halfLifelineCount={halfLifelineCount}
            onHalfLifelineClick={onHalfLifelineClick}
          />
          <Lifelines handleHalfClick={oneHalfLifeline} />
        </div>
      </GameContext.Provider>
    </OneHalfContext.Provider>
  );
};

export default Scene;
