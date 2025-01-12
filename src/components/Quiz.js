import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestions, saveProgress, loadProgress } from "../utils/api";

const Quiz = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        const savedProgress = loadProgress();
        if (
            savedProgress &&
            Array.isArray(savedProgress.questions) &&
            savedProgress.questions.length > 0 &&
            typeof savedProgress.currentQuestion === "number" &&
            savedProgress.timeLeft > 0
        ) {
            setQuestions(savedProgress.questions);
            setCurrentQuestion(savedProgress.currentQuestion);
            setAnswers(savedProgress.answers);
            setTimeLeft(savedProgress.timeLeft);
        } else {
            fetchQuestions(5, "multiple")
                .then((data) => {
                    if (data && data.length > 0) {
                        const shuffledQuestions = data.map((question) => {
                            const options = [...question.incorrect_answers, question.correct_answer];
                            return { ...question, options: options.sort(() => Math.random() - 0.5) };
                        });
                        setQuestions(shuffledQuestions);
                    } else {
                        console.error("No questions fetched.");
                    }
                })
                .catch((error) => console.error("Error fetching questions:", error));
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/result", { state: { questions, answers } });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); 
    }, [navigate, questions, answers]);


    const handleAnswer = (answer) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers, answer];
            saveProgress({
                questions,
                currentQuestion: currentQuestion + 1,
                answers: updatedAnswers,
                timeLeft,
            });

            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                navigate("/result", { state: { questions, answers: updatedAnswers } });
            }
            return updatedAnswers;
        });
    };

    if (!questions.length || currentQuestion >= questions.length) {
        return <h1>Loading...</h1>;
    }

    const { question, options } = questions[currentQuestion];

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Quiz</h1>
            <h2>{`Time Left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}</h2>
            <h3>{`Question ${currentQuestion + 1} / ${questions.length}`}</h3>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    style={{ display: "block", margin: "10px auto", padding: "10px 20px" }}
                    dangerouslySetInnerHTML={{ __html: option }}
                />
            ))}
        </div>
    );
};

export default Quiz;
