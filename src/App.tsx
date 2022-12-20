import { useState, createContext } from "react";
import "./App.css";
import data from "./helpers/questions.js";
import arrowUrl from "./assets/arrow.png"
import Options from "./components/Options";

export const QuizContext = createContext({isQuizRunning:false,questionNo:0,state:[...data],setState:()=>{}});
function App() {
  const [isQuizRunning, setIsQuizRunning] = useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState<number>(0);
  const [state,setState] = useState(data);

  
  const nextQuestion = () =>
    questionNo + 1 < state.length ? setQuestionNo((val) => val + 1) : null;
  const prevQuestion = () =>
    questionNo - 1 >= 0 ? setQuestionNo((val) => val - 1) : null;

  return (
    <div className="App">
      <QuizContext.Provider value={{isQuizRunning,questionNo,state,setState}}>

      
      <div className="quiz">
        {isQuizRunning ? (
          <div className="stage">
            <div className="exitContainer">
              <div onClick={()=>{}}><img src={arrowUrl}/></div>
            </div>
            <div className="playground">
              <div className="question">{state[questionNo].question}</div>
              <hr></hr>
              <Options questionNo={questionNo}/>
            </div>
            <div className="controls">
              {questionNo!=0 && <button onClick={prevQuestion}>Prev</button>}
              <span className="separator"></span>
              {questionNo!=state.length-1 && <button onClick={nextQuestion} className="nextQuestion">Next</button>}
              {questionNo===state.length-1 && <button onClick={()=>{alert("Data Submitted")}} className="submitQuiz">Submit</button>}
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
      </QuizContext.Provider>
    </div>
  );
}

export default App;
