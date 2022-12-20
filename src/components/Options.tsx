import React from 'react'
import questions from "../helpers/questions";

type OptionProps = {
    questionNo:number,
}

export default function Options(props:OptionProps) {
  return (
    <div className='answers'>
        {
            questions[props.questionNo].questiontype=="Radio" && <>{questions[props.questionNo].questionoption.map((option)=><div><input type={"radio"} name="group" /><span>{option.optionvalue}</span></div>)}</>
        }
        {
            questions[props.questionNo].questiontype=="Checkbox" && <>{questions[props.questionNo].questionoption.map((option)=><div><input type={"checkbox"} name="group" /><span>{option.optionvalue}</span></div>)}</>
        }
        {
            questions[props.questionNo].questiontype=="Textarea" && <>{questions[props.questionNo].questionoption.map((option)=><textarea></textarea>)}</>
        }
        {
            questions[props.questionNo].questiontype=="Date" && <>{questions[props.questionNo].questionoption.map((option)=><div><input type={"date"}></input></div>)}</>
        }
        
    </div>
  )
}
