import React, { createContext, useContext, useReducer } from 'react';

// Defina o formato do estado global dos pontos
interface PointsState {
  points: number;
}

// Defina as ações que podem ser despachadas para atualizar os pontos
type Action = { type: 'UPDATE_POINTS'; payload: number };

// Crie o contexto
const PointsContext = createContext<{ state: PointsState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// Defina o provedor que envolve toda a sua aplicação
export const PointsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(pointsReducer, { points: 0 });

  return (
    <PointsContext.Provider value={{ state, dispatch }}>
      {children}
    </PointsContext.Provider>
  );
};

// Crie um hook personalizado para acessar o estado e o despachante de ações
export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints deve ser usado dentro de um PointsProvider');
  }
  return context;
};

// Implemente o reducer para atualizar o estado dos pontos
const pointsReducer = (state: PointsState, action: Action): PointsState => {
  switch (action.type) {
    case 'UPDATE_POINTS':
      return { ...state, points: action.payload };
    default:
      return state;
  }
};