import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearProgress } from "../utils/api";

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions, answers } = location.state || {};

    const correctAnswers = questions.filter((q, i) => q.correct_answer === answers[i]).length;

    useEffect(() => {
        clearProgress(); 
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Result</h1>
            <p>{`Total Questions: ${questions.length}`}</p>
            <p>{`Correct Answers: ${correctAnswers}`}</p>
            <p>{`Incorrect Answers: ${questions.length - correctAnswers}`}</p>
            <p>{`Total Attempted: ${answers.length}`}</p>
            <button onClick={() => navigate("/")} style={{ padding: "10px 20px" }}>
                Restart
            </button>
        </div>
    );
};

export default Result;
