import React, { useState } from 'react';
import { Web3Provider } from './components/Web3Provider';
import { MainKitchen } from './components/MainKitchen';
import { Web3Widgets } from './components/Web3Widgets';
import { Dish } from './game/types';
import { ChefHat, ListTodo, Trophy, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useSendTransaction } from 'wagmi';

function GameContent() {
  const [totalScore, setTotalScore] = useState(0);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [activeTab, setActiveTab] = useState<'kitchen' | 'recipes' | 'leaderboard'>('kitchen');

  const { address, isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const handleDishCooked = (dish: Dish) => {
    setDishes(prev => [dish, ...prev].slice(0, 50));
    setTotalScore(prev => prev + dish.score);
  };

  const sendGMTransaction = () => {
    try {
      sendTransaction({
        to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
        value: 0n,
        // Optional tracking data could be here if required
      });
    } catch (e) {
      console.error(e);
      alert('Transaction failed. See console.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#05050D] text-white p-4 sm:p-8 font-sans relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Header */}
      <header className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between px-8 py-6 z-10 border-b border-white/10 bg-black/40 backdrop-blur-md rounded-2xl mb-8">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className="w-12 h-12 bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-400 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)]">
            <ChefHat className="w-8 h-8 font-black" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              Signal Chef
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-pink-400 font-bold mt-1">
              Cosmic Kitchen v1.0
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {isConnected && (
            <button 
              onClick={sendGMTransaction}
              className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
            >
              <Sun size={14} /> Say GM
            </button>
          )}

          <div className="text-right">
            <div className="text-[10px] uppercase text-slate-400 font-semibold mb-1">Reputation Score</div>
            <p className="text-2xl font-bold text-[#E8A020] shadow-[#E8A020]/50 drop-shadow-md">{totalScore}</p>
          </div>
          <div className="h-12 w-px bg-white/10 hidden sm:block"></div>
          <div className="text-right hidden sm:block">
            <div className="text-[10px] uppercase text-slate-400 font-semibold mb-1">Total Signals</div>
            <p className="text-2xl font-bold text-white">{dishes.length}</p>
          </div>
        </div>
      </header>

        {/* Main Content Area */}
        <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center relative z-10">
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center sm:flex-nowrap bg-black/50 p-1 rounded-full border border-white/10 mb-6 backdrop-blur-md shadow-lg">
            <button
              onClick={() => setActiveTab('kitchen')}
              className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 rounded-full font-bold text-[10px] sm:text-sm tracking-widest uppercase transition-all ${
                activeTab === 'kitchen' 
                  ? 'bg-pink-600/20 text-pink-400 border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ChefHat size={16} /> <span className="hidden sm:inline">Kitchen</span><span className="sm:hidden">Cook</span>
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 rounded-full font-bold text-[10px] sm:text-sm tracking-widest uppercase transition-all ${
                activeTab === 'recipes' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ListTodo size={16} /> Recipes
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 rounded-full font-bold text-[10px] sm:text-sm tracking-widest uppercase transition-all ${
                activeTab === 'leaderboard' 
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy size={16} /> Rank
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'kitchen' ? (
              <motion.div 
                key="kitchen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <MainKitchen onDishCooked={handleDishCooked} />
              </motion.div>
            ) : activeTab === 'recipes' ? (
              <motion.div 
                key="recipes"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-[70vh] bg-black/40 border border-white/5 rounded-3xl p-6 overflow-y-auto"
              >
                <h2 className="text-xl font-black italic mb-6 text-pink-400">DISCOVERED DISHES ({dishes.length})</h2>
                {dishes.length === 0 ? (
                  <p className="text-slate-500 text-center mt-10 text-sm font-medium uppercase tracking-widest">No dishes cooked yet. Head to the kitchen!</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {dishes.map(dish => (
                      <div key={dish.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center group hover:bg-white/10 transition-colors">
                        <div>
                          <p className={`font-black tracking-tight text-lg ${dish.isLegendary ? 'text-yellow-400 italic' : 'text-white'}`}>
                            {dish.name}
                          </p>
                          <div className="flex text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-1">
                            {dish.ingredients.join(' + ')}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-pink-400 italic">+{dish.score} PTS</p>
                          <p className="text-xs text-yellow-400 opacity-80">{'⭐'.repeat(dish.rating)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="leaderboard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-[70vh] bg-black/40 border border-white/5 rounded-3xl p-6 overflow-y-auto"
              >
                <h2 className="text-xl font-black italic mb-6 text-blue-400">ON-CHAIN TOP CHEFS</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { addr: "0x12..34", score: 15400, legendary: 12 },
                    { addr: "0xab..cd", score: 12050, legendary: 8 },
                    { addr: "You", score: totalScore, legendary: dishes.filter(d => d.isLegendary).length },
                    { addr: "0x45..67", score: 8900, legendary: 4 },
                  ].sort((a,b) => b.score - a.score).map((chef, idx) => (
                    <div key={idx} className={`bg-white/5 border ${chef.addr === 'You' ? 'border-blue-500/50 block shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-white/10'} p-4 rounded-2xl flex items-center gap-4`}>
                      <div className={`font-black text-2xl w-8 text-center italic ${idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-orange-400' : 'text-slate-600'}`}>
                        #{idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold tracking-wider ${chef.addr === 'You' ? 'text-white' : 'text-slate-300'}`}>
                          {chef.addr}
                        </p>
                        <p className="text-[10px] font-bold uppercase text-slate-500 mt-1">Legendary Dishes: {chef.legendary}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-yellow-400 italic">{chef.score} PTS</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="w-full mt-8 self-stretch bg-black/80 border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between p-4 text-[10px] font-medium tracking-wider text-slate-500 z-20 shadow-lg">
          <div className="flex gap-6 uppercase items-center w-full justify-between sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span> 
              Base Mainnet
            </div>
            <div>Builder: <span className="text-white italic">bc_gt6nfpi5</span></div>
          </div>
          
          <div className="hidden sm:flex gap-4 uppercase mt-4 sm:mt-0">
            <span className="text-white/40">Privacy</span>
            <span className="text-white/40">Terms</span>
            <span className="text-white/80 font-bold tracking-widest">© 2026 Signal Chef Agency</span>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Web3Widgets totalScore={totalScore} />
          </div>
        </footer>
      </div>
  );
}

export default function App() {
  return (
    <Web3Provider>
      <GameContent />
    </Web3Provider>
  );
}
