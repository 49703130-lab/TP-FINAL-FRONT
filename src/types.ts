export type Figurita = {
  id: number;
  nombre: string;
  emoji: string;
};

// cuántas copias EXTRA (repetidas) tenés de cada figurita: { [id]: cantidad }
export type Repetidas = Record<number, number>;
