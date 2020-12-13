const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANE',
    data: {
      content, 
      id: getId(),
      votes: 0
    }
  }
}

const sortedAnecdotes = anecdotesAtStart.sort((a, b) => a.votes - b.votes)
const initialState = sortedAnecdotes.map(asObject)

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case "VOTE":
    const id = action.data.id
    const aneToChange = state.find(el => el.id === id)
    const newAne = {
      ...aneToChange,
      votes: aneToChange.votes + 1
    }

    const anecdotes = state.map(ane => ane.id !== id ? ane : newAne)
    return anecdotes.sort((a, b) => b.votes - a.votes)

  case "NEW_ANE":
    return [...state, action.data]
  
  default:
    return state
  }
}

export default reducer