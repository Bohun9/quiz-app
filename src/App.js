import "./App.css";
import { useState, useEffect } from "react";

import Header from "./components/header/Header";
import ControlBar from "./components/control_bar/ControlBar";
import QuizContent from "./components/quiz_content/QuizContent";
import PopUp from "./components/popup/PopUp";

const NUM_QUESTIONS = 6;
const QUIZ_API_ENDPOINT = "https://quizapi.io/api/v1/questions";

async function fetchQuiz(numQuestions) {
    const token = process.env.REACT_APP_API_KEY;
    const response = await fetch(
        QUIZ_API_ENDPOINT +
            "?" +
            new URLSearchParams({
                limit: numQuestions,
            }),
        {
            method: "GET",
            headers: {
                "X-Api-Key": token,
            },
        }
    );
    const data = await response.json();
    console.log("data: ", data);
    return data;
}

function App() {
    const [fetchData, setFetchData] = useState(true);
    const [quizData, setQuizData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);

    const currentQuestion = quizData ? quizData[currentIndex] : null;
    const selectedAnswer = userAnswers ? userAnswers[currentIndex] : null;

    useEffect(() => {
        if (!fetchData) {
            return;
        }
        fetchQuiz(NUM_QUESTIONS).then((data) => {
            // remove fake answers
            for (let i = 0; i < NUM_QUESTIONS; i++) {
                data[i].answers = Object.fromEntries(
                    Object.entries(data[i].answers).filter(
                        ([_, value]) => value !== null
                    )
                );
            }

            setFetchData(false);
            setQuizData(data);
            setCurrentIndex(0);
            setUserAnswers(
                Array.from(Array(NUM_QUESTIONS).keys()).fill("answer_a")
            );
            setShowPopUp(false);
            setQuizFinished(false);
        });
    }, [fetchData]);

    const onChange = (e) => {
        console.log(`change on question ${currentIndex}: ${e.target.value}`);
        let newUserAnswers = userAnswers.slice();
        newUserAnswers[currentIndex] = e.target.value;
        setUserAnswers(newUserAnswers);
    };

    return (
        <>
            <Header />
            <ControlBar
                onClickSwitches={Array.from(Array(NUM_QUESTIONS).keys()).map(
                    (x) => () => setCurrentIndex(x)
                )}
                onClickSpecial={
                    quizFinished
                        ? () => setFetchData(true)
                        : () => setShowPopUp(true)
                }
                textSpecial={quizFinished ? "Start new quiz" : "Submit"}
                currentIndex={currentIndex}
            />
            <QuizContent
                data={currentQuestion}
                onChange={onChange}
                selected={selectedAnswer}
                finished={quizFinished}
            />
            <PopUp
                open={showPopUp}
                onYes={() => {
                    setQuizFinished(true);
                    setShowPopUp(false);
                }}
                onNo={() => setShowPopUp(false)}
            >
                <p>Are you sure you want to submit?</p>
            </PopUp>
        </>
    );
}

export default App;
