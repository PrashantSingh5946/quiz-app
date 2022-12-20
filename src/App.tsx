import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import questions from "./helpers/questions.js";
import arrowUrl from "./assets/arrow.png"
function App() {
  const [isQuizRunning, setIsQuizRunning] = useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState(0);
  const nextQuestion = () =>
    questionNo + 1 < questions.length ? setQuestionNo((val) => val + 1) : null;
  const prevQuestion = () =>
    questionNo - 1 >= 0 ? setQuestionNo((val) => val - 1) : null;

  return (
    <div className="App">
      <div className="quiz">
        {isQuizRunning ? (
          <div className="stage">
            <div className="exitContainer">
              <div onClick={()=>{}}><img src={arrowUrl}/></div>
            </div>
            <div className="playground">
              <div className="question">{questions[questionNo].question}</div>
              <hr></hr>
            </div>
            <div className="controls">
              {questionNo!=0 && <button onClick={prevQuestion}>Prev</button>}
              <span className="separator"></span>
              {questionNo!=questions.length-1 && <button onClick={nextQuestion} className="nextQuestion">Next</button>}
              {questionNo===questions.length-1 && <button onClick={()=>{alert("Data Submitted")}} className="submitQuiz">Submit</button>}
            </div>
          </div>
        ) : (
          <>
            <button
              id="startQuiz"
              onClick={() => {
                setIsQuizRunning(true);
              }}
            >
              Start quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
