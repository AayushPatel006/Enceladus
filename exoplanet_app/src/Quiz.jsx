import React, { useState, useEffect } from 'react';
import './ExoplanetQuiz.css'; // Create this CSS file for styling

const questions = [
  {
    question: "What exoplanet has a year that is 20 Earth days long?",
    options: ["KELT-6 b", "Tau Ceti", "Beta Pictoris b", "KELT-20 b"],
    answer: "Tau Ceti"
  },
  {
    question: "What rocky world has a year that is 18.8 Earth days long?",
    options: ["TRAPPIST-1 h", "KELT-19 A b", "HD 40307 c", "Proxima Centauri b"],
    answer: "TRAPPIST-1 h"
  },
  {
    question: "What gas giant was discovered in 2006?",
    options: ["KELT-6 c", "HD 10647 b", "Beta Pictoris b", "KELT-20 b"],
    answer: "HD 10647 b"
  },
  {
    question: "What exoplanet is 0.3 away from its star?",
    options: ["Kepler-1229 b", "Tau Ceti g", "TRAPPIST-1 e", "KELT-6 b"],
    answer: "Kepler-1229 b"
  },
  {
    question: "What super Earth is in a five planet system?",
    options: ["Kepler-62 f", "Tau Ceti f", "KELT-20 b", "Proxima Centauri b"],
    answer: "Kepler-62 f"
  }
];

const ExoplanetQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const savedScore = localStorage.getItem('exoplanetQuizScore');
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
  }, []);

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
      localStorage.setItem('exoplanetQuizScore', score + 1);
    }
    setSelectedAnswer(option);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
    localStorage.removeItem('exoplanetQuizScore');
  };

  return (
    <div className="quiz-container">
      <h1>Exoplanet Quiz</h1>
      {finished ? (
        <div className="result">
          <h2>Your score: {score} / {questions.length}</h2>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`option ${selectedAnswer === option ? (option === questions[currentQuestion].answer ? 'correct' : 'incorrect') : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <button onClick={nextQuestion}>Next</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExoplanetQuiz;
