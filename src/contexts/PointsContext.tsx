import React, { createContext, useContext, useReducer } from 'react';

interface PointsState {
  points: number;
}

type Action = { type: 'UPDATE_POINTS'; payload: number };

const PointsContext = createContext<{ state: PointsState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const PointsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(pointsReducer, { points: 0 });

  return (
    <PointsContext.Provider value={{ state, dispatch }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints deve ser usado dentro de um PointsProvider');
  }
  return context;
};

const pointsReducer = (state: PointsState, action: Action): PointsState => {
  switch (action.type) {
    case 'UPDATE_POINTS':
      return { ...state, points: action.payload };
    default:
      return state;
  }
};