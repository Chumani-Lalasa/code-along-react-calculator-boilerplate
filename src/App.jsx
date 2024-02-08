import { useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const initialState = {
  input:"",
  result:"",
  calculatingStatus:true
}
const reducer = (state,action) => {
  switch(action.type){
    case "ADD_INPUT":
      if(state.input==="" && "+/*-".includes(action.payload)){
        return state
      }else if(
          "+/*-".includes(state.input.slice(-1)) && 
          "+/*-".includes(action.payload)
          ){
        return {
          ...state,
          input: state.input.slice(0,-1) + action.payload,
        };
      }else{
        return {
            ...state,
            input:state.input + action.payload,
            calculatingStatus: true,
          };
      }
    case "CLEAR":
      return initialState
    case "DELETE":
      return {...state,input:state.input.slice(0,-1)};
    case "CALCULATE":
      if(state.input=="") return state;
      try{
        return{
          ...state,
          calculatingStatus: false,
          result: eval(state.input).toString(),
          input:"",
        }
      }catch(errror){
        return {...state, input: "Error", calculatingStatus:true};
      }
    case "DELETE":
      return {
        ...state,
        input: state.input.slice(0,-1),
        calculatingStatus: true,
      };
    default:
      return state;
  }
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  const handleClick = (btnValue) => {
    if(btnValue == "="){
      dispatch({type:"CALCULATE"});
    }else if(btnValue == "AC"){
      dispatch({type:"CLEAR"})
    }else if(btnValue == "Del"){
      dispatch({type:"DELETE"});
    }else{
      dispatch({type:"ADD_INPUT", payload: btnValue});
    }
  };
  return (
    <>
    <h1>Calculator App</h1>
    <div>
      <input 
        type="text"
        placeholder='0'
        readOnly
        value={state.calculatingStatus ? state.input : state.result}
        className='inputBox'
         />
    </div>
    <div className='mainContainer'>
    <div className='numbersContainer'>
      {[0,1,2,3,4,5,6,7,8,9].map((number) => (
        <button key={number} onClick={() => handleClick(number)}>{number}</button>
      ))}
    </div>
    <div className='operatorsContainer'>
      <button onClick={() => handleClick(".")}>.</button>
      <button onClick={() => handleClick("+")}>+</button>
      <button onClick={() => handleClick("-")}>-</button>
      <button onClick={() => handleClick("*")}>*</button>
      <button onClick={() => handleClick("/")}>/</button>
      <button onClick={() => handleClick("=")}>=</button>
    </div>
    <div className='clearContainer'>
      <button onClick={() => handleClick("Del")}>Del</button>
      <button onClick={() => handleClick("AC")}>AC</button>
      </div>
    </div>
    
    
    </>
  )
}

export default App
