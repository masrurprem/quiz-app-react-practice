import React from "react";
import questions from "./questions";
import { useState } from "react";

function app() {
  // necessary variables
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  //necessary functions
  // # handle answer click
  const handleAnswerClick = (index) => {
    if (isAnswered || isFinished) {
      return;
    }
    setSelectedAnswer(index);
    setIsAnswered(true);
    // check answer and update score
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  // # handle next click
  const handleNextClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };
  // # handle reset button
  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };
  return (
    <>
      <div className="card-container">
        <div className="header">
          <h1>Javascript Quizz App</h1>
          {!isFinished ? (
            <p>
              {currentQuestion + 1}: {questions[currentQuestion].question}
            </p>
          ) : (
            <p>
              Test Done! Score: {score}/ {questions.length}
            </p>
          )}
        </div>

        {!isFinished && (
          <ul className="questions">
            {questions[currentQuestion].options.map((option, index) => {
              let className = "";

              if (isAnswered) {
                if (index === questions[currentQuestion].correctAnswer) {
                  className = "correct";
                } else if (index === selectedAnswer) {
                  className = "incorrect";
                }
              }
              return (
                <li
                  className={className}
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        )}

        {!isFinished ? (
          <button onClick={handleNextClick}>Next Question</button>
        ) : (
          <button onClick={handleReset}>Reset Quiz</button>
        )}
      </div>
    </>
  );
}

export default app;
