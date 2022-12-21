import { useState, createContext } from "react";
import "./App.css";
import data from "./helpers/questions.js";
import arrowUrl from "./assets/arrow.png";
import Options from "./components/Options";

export const QuizContext = createContext({
  isQuizRunning: false,
  questionNo: 0,
  state: [...data],
  setState: () => {},
});
function App() {
  const [isQuizRunning, setIsQuizRunning] = useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState<number>(0);
  const [state, setState] = useState(data);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function reset() {
    setState(data);
    setIsQuizRunning(false);
    setIsSubmitted(false);
  }

  const nextQuestion = () =>
    questionNo + 1 < state.length ? setQuestionNo((val) => val + 1) : null;
  const prevQuestion = () =>
    questionNo - 1 >= 0 ? setQuestionNo((val) => val - 1) : null;

  return (
    <div className="App">
      <QuizContext.Provider
        value={{ isQuizRunning, questionNo, state, setState }}
      >
        {!isSubmitted ? (
          <div className="quiz">
            {isQuizRunning ? (
              <div className="stage">
                <div className="exitContainer">
                  <div
                    onClick={() => {
                      reset();
                    }}
                  >
                    <img src={arrowUrl} />
                  </div>
                </div>
                <div className="playground">
                  <div className="question">{state[questionNo].question}</div>
                  <hr></hr>
                  <Options questionNo={questionNo} />
                </div>
                <div className="controls">
                  {questionNo != 0 && (
                    <button onClick={prevQuestion}>Prev</button>
                  )}
                  <span className="separator"></span>
                  {questionNo != state.length - 1 && (
                    <button onClick={nextQuestion} className="nextQuestion">
                      Next
                    </button>
                  )}
                  {questionNo === state.length - 1 && (
                    <button
                      onClick={() => {
                        setIsSubmitted(true);
                      }}
                      className="submitQuiz"
                    >
                      Submit
                    </button>
                  )}
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
        ) : (
          <div className="summary">
            <h2 className="heading">Your responses are</h2>
            {state.map((question, index) => (
              <div key={index} onClick={(e)=>{e.preventDefault();}}>
                <div>{question.question}</div>
              <Options  questionNo={index}></Options>
              <hr/>
              </div>
            ))}
            <div>
              <button style={{background:"red",color:"white"}}onClick={reset}>Reset</button>
            </div>
          </div>
        )}
      </QuizContext.Provider>
    </div>
  );
}

export default App;
