import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ingredient, SignalType, SIGNAL_COLORS, Dish, RECIPES } from '../game/types';
import confetti from 'canvas-confetti';

export function MainKitchen({ onDishCooked }: { onDishCooked: (dish: Dish) => void }) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [potContents, setPotContents] = useState<SignalType[]>([]);
  const [isCooking, setIsCooking] = useState(false);
  const [cookedDish, setCookedDish] = useState<Dish | null>(null);

  // Spawn random ingredients over time
  useEffect(() => {
    const types: SignalType[] = ['WiFi', '5G', 'Meme', 'Quantum', 'Ancient Radio'];
    const interval = setInterval(() => {
      setIngredients(prev => {
        if (prev.length >= 8) return prev; // Max 8 ingredients on screen
        const randomType = types[Math.floor(Math.random() * types.length)];
        return [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          type: randomType,
          x: Math.random() * (window.innerWidth - 80),
          y: Math.random() * 200 + 50,
          isDragging: false,
          color: SIGNAL_COLORS[randomType]
        }];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDragEnd = (ingredient: Ingredient, info: any) => {
    // Basic hit detection for the cooking pot (center bottom)
    const potRect = document.getElementById('cooking-pot')?.getBoundingClientRect();
    if (!potRect) return;

    // Check if pointer is inside pot area
    if (
      info.point.x > potRect.left &&
      info.point.x < potRect.right &&
      info.point.y > potRect.top &&
      info.point.y < potRect.bottom
    ) {
      if (potContents.length < 5) {
        setPotContents([...potContents, ingredient.type]);
        setIngredients(prev => prev.filter(i => i.id !== ingredient.id));
        // haptic feedback
        if (navigator.vibrate) navigator.vibrate(50);
      }
    }
  };

  const cookDish = () => {
    if (potContents.length === 0) return;
    setIsCooking(true);
    
    setTimeout(() => {
      // Evaluate recipe
      let matchingRecipe = RECIPES.find(r => 
        r.combination.length === potContents.length &&
        [...r.combination].sort().join(',') === [...potContents].sort().join(',')
      );

      let newDish: Dish;
      if (matchingRecipe) {
        const isLegendary = potContents.includes('Quantum') && Math.random() > 0.5;
        newDish = {
          id: Math.random().toString(36).substr(2, 9),
          name: matchingRecipe.name + (isLegendary ? ' (Legendary)' : ''),
          ingredients: [...potContents],
          rating: (isLegendary ? 5 : 4) as any,
          score: matchingRecipe.minScore + (isLegendary ? 500 : 100),
          isLegendary
        };
        confetti({
          particleCount: isLegendary ? 200 : 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: [SIGNAL_COLORS['Quantum'], SIGNAL_COLORS['5G'], SIGNAL_COLORS['Meme']]
        });
      } else {
        // Failed / random slop
        newDish = {
          id: Math.random().toString(36).substr(2, 9),
          name: 'Mysterious Slop',
          ingredients: [...potContents],
          rating: Math.max(1, Math.floor(Math.random() * 3)) as any,
          score: 10 + Math.floor(Math.random() * 50),
          isLegendary: false
        };
      }

      setCookedDish(newDish);
      setPotContents([]);
      setIsCooking(false);
      onDishCooked(newDish);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }, 2000);
  };

  return (
    <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
      
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,50,255,0.15)_0%,_transparent_70%)] pointer-events-none" />

      {/* Floating Ingredients */}
      <AnimatePresence>
        {ingredients.map(ing => (
          <motion.div
            key={ing.id}
            drag
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd(ing, info)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, x: ing.x, y: ing.y }}
            exit={{ opacity: 0, scale: 0 }}
            whileDrag={{ scale: 1.2, zIndex: 50, y: ing.y - 40 }}
            className="absolute w-14 h-14 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing font-bold text-xs text-center backdrop-blur-md shadow-lg"
            style={{ 
              backgroundColor: `${ing.color}30`, 
              border: `2px solid ${ing.color}`,
              boxShadow: `0 0 15px ${ing.color}80`,
              touchAction: 'none'
            }}
          >
            {ing.type}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Cooking Pot Area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div 
          id="cooking-pot"
          className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-[8px] flex items-center justify-center pointer-events-auto transition-all duration-300
            ${isCooking ? 'border-pink-500/50 shadow-[0_0_80px_rgba(236,72,153,0.3)]' : 'border-white/5 shadow-[0_0_80px_rgba(120,50,255,0.2)]'}`}
        >
          <div className="absolute inset-0 border-[1px] border-dashed border-white/20 rounded-full"></div>
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-b from-slate-900 to-black flex items-center justify-center border border-white/10 overflow-hidden relative">
            <div className={`absolute w-32 h-32 blur-3xl transition-all duration-300 ${isCooking ? 'bg-pink-500/40 animate-pulse' : 'bg-blue-500/20'}`}></div>
            
            <div className="z-10 flex flex-col items-center">
              {isCooking ? (
                 <div className="text-center z-20">
                   <div className="text-[10px] uppercase tracking-widest text-pink-400 mb-2">Signal Fusion Active</div>
                   <div className="text-2xl sm:text-4xl font-black italic">COOKING...</div>
                   <div className="text-xs text-slate-500 mt-2">Mixing layers</div>
                 </div>
              ) : (
                 <div className="z-10 flex gap-2 flex-wrap justify-center px-4">
                   {potContents.length === 0 && (
                     <div className="text-xs text-slate-500 uppercase tracking-widest">Drop Signals Here</div>
                   )}
                   {potContents.map((type, i) => (
                     <motion.div
                       key={i}
                       initial={{ scale: 0, y: -20 }}
                       animate={{ scale: 1, y: 0 }}
                       className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-[10px] font-bold"
                       style={{ backgroundColor: SIGNAL_COLORS[type], boxShadow: `0 0 10px ${SIGNAL_COLORS[type]}` }}
                     >
                       {type.substring(0, 2)}
                     </motion.div>
                   ))}
                 </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 mt-8 flex gap-4 pointer-events-auto">
          <button 
            onClick={cookDish}
            disabled={potContents.length === 0 || isCooking}
            className={`px-8 py-3 rounded-xl font-bold uppercase tracking-tighter text-lg shadow-lg transition-transform ${
              potContents.length > 0 && !isCooking 
                ? 'bg-pink-600 shadow-pink-600/40 hover:scale-105 active:scale-95 text-white' 
                : 'bg-white/10 border border-white/20 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isCooking ? 'Fusing...' : 'FUSE SIGNALS'}
          </button>
        </div>
      </div>

      {/* Cooked Dish Overlay */}
      <AnimatePresence>
        {cookedDish && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6"
            onClick={() => setCookedDish(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-cosmic-dark border-2 border-neon-yellow p-8 rounded-3xl max-w-sm w-full text-center glow-yellow glow-pink"
            >
              <div className="text-6xl mb-4">{cookedDish.isLegendary ? '🏆' : '🍲'}</div>
              <h2 className="text-2xl font-bold text-neon-yellow mb-2 text-glow-yellow">{cookedDish.name}</h2>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xl ${i < cookedDish.rating ? 'text-yellow-400' : 'text-gray-600'}`}>⭐</span>
                ))}
              </div>
              <p className="text-neon-pink font-mono text-xl mb-6">+{cookedDish.score} PTS</p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold uppercase border border-white/20">
                Continue Cooking
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
