import questionBox from "../assets/images/question_box.png";

interface QuestionBoxProps {
    question: string;
}

const QuestionBox = ({question}: QuestionBoxProps) => {
    return (
        <div className="QuestionBox">
            <h1>{question}</h1>
            <img src={questionBox} alt="Küsimuse kast"/>
        </div>
    );
};

export default QuestionBox;