import './App.css'
import Die from './components/Die'
import { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)

  useEffect(()=>{
    const allHeld = dice.every((die)=> true === die.isHeld)
    let sameVal = false
    if(allHeld){
      sameVal= dice.every((die)=> dice[0].value === die.value)
    }
    
    if(sameVal && allHeld){
      setTenzies(true)
    }
  },[dice])
  
  const dieElements = dice.map(die => {
    return <Die 
    value={die.value}
    key={die.id}
    isHeld={die.isHeld}
    holdDice={()=> holdDice(die.id)}
    />
  })

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
  }
  }

  function allNewDice(){
    const dieArray = []
    for(let i=0;i<10;i++){
      dieArray.push(generateNewDie())
    }
    //Array.from({length: 10}, ()=> Math.floor(Math.random()*6)+1)
    return dieArray
  }

  function rollDice(){
    if(tenzies){
      setDice(allNewDice)
      setTenzies(false)
    }
    else{
      setDice(prevDice => prevDice.map(die=>{
      return die.isHeld ? die : generateNewDie()
      }))
    }
    
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map(die=>{
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
    
  }

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die--grid'>{dieElements}</div>
      <button onClick={rollDice} className='game--button'>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
