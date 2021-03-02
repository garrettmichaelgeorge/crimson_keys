export default function synthReducer (state, action) {
  switch (action.type) {
    case 'SET_CURRENT_NOTE':
      return {
        ...state,
        currentNote: action.payload
      }
    case 'DELETE_NOTE':
      const remainingNotes = state.notes.filter(note => note.id !== action.payload)

      return {
        ...state,
        notes: remainingNotes
      }
    default:
      return state
  }
}
