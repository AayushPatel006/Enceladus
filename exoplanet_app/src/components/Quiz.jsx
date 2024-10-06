import React, { useState, useEffect } from 'react';
import './ExoplanetQuiz.css'; // Create this CSS file for styling

const ExoplanetQuiz = ({questions}) => {
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
    setCurrentQuestion(0); // Reset to the first question
    setScore(0); // Reset the score
    setFinished(false); // Mark the quiz as not finished
    setSelectedAnswer(null); // Clear any selected answers
    localStorage.removeItem('exoplanetQuizScore'); // Clear the saved score in localStorage
  };

  return (
    <div style={styles.quizContainer}>
      <div style={styles.scrollableContent}>
        {finished ? (
          <div className="result">
            <h2>Your score: {score} / {questions.length}</h2>
            <button onClick={restartQuiz}>Restart Quiz</button>
          </div>
        ) : (
          <div>
            <h4>{questions[currentQuestion].question}</h4>
            <div className="options" style={styles.h4container}>
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
              <button onClick={nextQuestion} >Next</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
  
const styles = {
  quizContainer: {
    fontSize: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    height: '50vh',
    overflow: 'hidden', // Disable scrolling for the full container
  },
  scrollableContent: {
    overflowY: 'auto',
    maxHeight: '50vh',   // Adjust based on your desired scrollable area
    padding: '5px',
  },
  h4container: {
    paddingTop: '2px',
    paddingBottom: '2px'
  }
};

export default ExoplanetQuiz;
