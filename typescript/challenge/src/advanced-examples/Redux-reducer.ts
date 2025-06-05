type Action = 
  | { type: 'INCREMENT'; payload: { by: number } }
  | { type: 'DECREMENT'; payload: { by: number } }
  | { type: 'RESET' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREMENT': 
      return state + action.payload.by;
    case 'DECREMENT':
      return state - action.payload.by;
    case 'RESET':
      return 0;
  }
}