import { useContext } from "react";
import { QuizContext } from "../App";
import { question } from "../helpers/questions";
type props = {
  questionNo: number;
};

export default function Options({ questionNo }: props) {

  function mcqHandler(index: number) {
    let newState:[question] = JSON.parse(JSON.stringify(state));
    newState[questionNo].questionoption.forEach((element) => {
      element.selected = false;
    });
    newState[questionNo].questionoption[index].selected = true;
    setState(newState);
  }

  function checkboxHandler(index:number){
    let newState:[question] = JSON.parse(JSON.stringify(state));
    newState[questionNo].questionoption[index].selected=!newState[questionNo].questionoption[index].selected;
    setState(newState);

}

function dateHandler(val:string){
    let newState:[question] = JSON.parse(JSON.stringify(state));
    newState[questionNo].questionoption[0].optionvalue=val;
    setState(newState);

}

function textareaHandler(val:string){
    let newState:[question] = JSON.parse(JSON.stringify(state));
    newState[questionNo].questionoption[0].optionvalue=val;
    setState(newState);
}


  const { state, setState } = useContext(QuizContext);

  return (
    <div className="answers">
      {state[questionNo].questiontype == "Radio" && (
        <>
          {state[questionNo].questionoption.map((option, index) => (
            <div key={option.optionid}>
              <input
                onChange={(e) => {
                  mcqHandler(index);
                }}
                type={"radio"}
                name="group"
                checked={option.selected}
              />
              <span>{option.optionvalue}</span>
            </div>
          ))}
        </>
      )}
      {state[questionNo].questiontype == "Checkbox" && (
        <>
          {state[questionNo].questionoption.map((option,index) => (
            <div key={option.optionid}>
              <input type={"checkbox"} name="group" checked={option.selected} onChange={(e)=>{checkboxHandler(index)}}/>
              <span>{option.optionvalue}</span>
            </div>
          ))}
        </>
      )}
      {state[questionNo].questiontype == "Textarea" && (
        <>
          {state[questionNo].questionoption.map((option) => (
            <textarea key={option.optionid} onChange={(e)=>textareaHandler(e.target.value)} value={option.optionvalue}></textarea>
          ))}
        </>
      )}
      {state[questionNo].questiontype == "Date" && (
        <>
          {state[questionNo].questionoption.map((option) => (
            <div key={option.optionid}>
              <input type={"date"} onChange={(e)=> dateHandler(e.target.value)} value={option.optionvalue}></input>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
