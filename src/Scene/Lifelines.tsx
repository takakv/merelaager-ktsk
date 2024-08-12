import {useState} from "react";

import removeHalf from "../assets/images/lifelines/remove_half.png";
import askAudience from "../assets/images/lifelines/ask_audience.png";
import phoneCall from "../assets/images/lifelines/phone_call.png";

interface HalfLifelineProps {
    handleHalfClick: () => void;
}

const HalfLifeline = ({handleHalfClick}: HalfLifelineProps) => {
    const [isUsed, setIsUsed] = useState(false);

    const handleClick = () => {
        setIsUsed(true);
        handleHalfClick();
    };

    return (
        <img
            className={isUsed ? "dimmed" : ""}
            src={removeHalf}
            alt="50:50 lifeline"
            onClick={() => handleClick()}
        />
    );
};

interface StdLifelineProps {
    source: string;
    alt: string;
}

const StdLifeline = ({source, alt}: StdLifelineProps) => {
    const [isUsed, setIsUsed] = useState(false);

    const handleClick = () => {
        setIsUsed(true);
    };

    return (
        <img
            className={isUsed ? "dimmed" : ""}
            src={source}
            alt={alt}
            onClick={handleClick}
        />
    );
};

interface LifelinesProps {
    handleHalfClick: () => void;
}

const Lifelines = ({handleHalfClick}: LifelinesProps) => {
    return (
        <div className="Lifelines">
            <HalfLifeline handleHalfClick={handleHalfClick}/>
            <StdLifeline source={askAudience} alt="Ask audience lifeline"/>
            <StdLifeline source={phoneCall} alt="Phone call lifeline"/>
        </div>
    );
};

export default Lifelines;