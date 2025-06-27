import { useReducer } from "react"

function generatingSecretNumber() {
    return Math.trunc(Math.random() * 100)
}

function funcGame(state, action) {
    if (action.type === "UPDATE_PLAYER_GUESS"){
        return {...state, playerGuess: action.payload}
    }
    if (action.type === "NEW_GAME") {
        return {
            ...state,
            newGameButtonDisabled: true,
            inputReadOnly: false,
            guessButtonDisabled: false,
            feedback: "Start the game now. Good luck guessing it",
            numTrials: 10,
            secretNumber: generatingSecretNumber(),
            playerGuess: ""
        }
    }

    const numTrials = state.numTrials - 1;
    if (numTrials === 0) {
        return {
            ...state,
            newGameButtonDisabled: false,
            inputReadOnly: true,
            guessButtonDisabled: true,
            feedback: `You lost. The secret number was ${secretNumber}`,
            numTrials: numTrials
        } 
    }

    if (action.type === 'PLAYER_GUESS') {
        const playerGuess = Number(action.payload)
        if (playerGuess === state.secretNumber) {
            return {
            ...state,
            newGameButtonDisabled: false,
            inputReadOnly: true,
            guessButtonDisabled: true,
            feedback: `You win. Your score is ${state.numTrials * 10}%`,
        }
        }
    if (playerGuess > state.secretNumber){
            return {
            ...state,
            feedback: `${playerGuess} is greater than the secret number`,
            numTrials: numTrials,
        }
    }   
    
        if (playerGuess < state.secretNumber){
            return {
            ...state,
            feedback: `${playerGuess} is less than the secret number`,
            numTrials: numTrials,
        }
    }  
    }
}

function Game() {
    const [state, dispatch] = useReducer(funcGame, {
        newGameButtonDisabled: false,
        inputReadOnly: true,
        guessButtonDisabled: true,
        feedback: null,
        numTrials: 10,
        secretNumber: null,
        playerGuess: ""
    });
  return (
    <div className="game-container">
        <header className="game-header">
            <h2 className="game-main-instruction">
                Guess a number between 0 and 100
            </h2>
            <button disabled={state.newGameButtonDisabled} onClick={() => {
                dispatch({type: "NEW_GAME"})
                }}>
                new game
            </button>
        </header>

        <form action="" className="game-form">
            <h2 className="trials-count game-guide">
                {state.numTrials} trials remaining
            </h2>
            <input
            type="number"
            placeholder="00"
            readOnly={state.inputReadOnly}
            value={state.playerGuess}
            onChange={(e) => dispatch({ type: "UPDATE_PLAYER_GUESS", payload: e.target.value})}
            />
            {state.feedback && <h2 className="game-result game-guide">{state.feedback}</h2>}
            <button type="button" disabled={state.guessButtonDisabled} onClick={() => dispatch({
                type: 'PLAYER_GUESS', payload: state.playerGuess})}>
                Guess Number
            </button>
        </form>
    </div>
  )
}

export default Game