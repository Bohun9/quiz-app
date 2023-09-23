import "./QuizContent.css";

export default function QuizContent({ data, onChange, selected, finished }) {
    if (data === null) {
        return;
    }

    function distinguishStyle(key) {
        if (!finished) {
            return {};
        }
        if (data.correct_answers[key + "_correct"] === "true") {
            return { backgroundColor: "#CDFFD0" };
        } else if (selected === key) {
            return { backgroundColor: "#FF9090" };
        }
    }

    let quizAnswers = Object.entries(data.answers).map(([key, value]) => {
        return (
            <li className="quiz-answer" key={key}>
                <label>
                    {" "}
                    <input
                        type="radio"
                        name="answer"
                        value={key}
                        onChange={onChange}
                        checked={selected === key}
                        disabled={finished}
                    />{" "}
                    <span style={distinguishStyle(key)}>{value}</span>
                </label>
            </li>
        );
    });

    return (
        <div className="quiz-content-container">
            <div className="quiz-question">{data.question}</div>
            <ul className="quiz-answer-options">{quizAnswers}</ul>
        </div>
    );
}
