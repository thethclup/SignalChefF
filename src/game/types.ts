export type SignalType = 'WiFi' | '5G' | 'Meme' | 'Quantum' | 'Ancient Radio';
export type DishRating = 1 | 2 | 3 | 4 | 5;

export interface Ingredient {
  id: string;
  type: SignalType;
  x: number;
  y: number;
  isDragging: boolean;
  color: string;
}

export interface Dish {
  id: string;
  name: string;
  ingredients: SignalType[];
  rating: DishRating;
  score: number;
  isLegendary: boolean;
}

export const SIGNAL_COLORS: Record<SignalType, string> = {
  'WiFi': '#00F0FF',
  '5G': '#39FF14',
  'Meme': '#FFEA00',
  'Quantum': '#B235FF',
  'Ancient Radio': '#FF2E93',
};

// Recipe Book
export const RECIPES = [
  { name: 'Signal Soup', combination: ['WiFi', 'WiFi', 'Ancient Radio'], minScore: 100 },
  { name: 'Viral Curry', combination: ['Meme', 'Meme', '5G'], minScore: 200 },
  { name: 'Neon Sushi', combination: ['Quantum', 'WiFi', '5G'], minScore: 300 },
  { name: 'Data Stew', combination: ['5G', '5G', '5G'], minScore: 150 },
  { name: 'Hype Burger', combination: ['Meme', 'Meme', 'Meme', 'Quantum'], minScore: 400 },
  { name: 'Quantum Singularity', combination: ['Quantum', 'Quantum', 'Quantum', 'Ancient Radio'], minScore: 1000 },
];
