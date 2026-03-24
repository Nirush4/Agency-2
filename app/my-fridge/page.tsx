'use client';

import { useState, useMemo } from 'react';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const INGREDIENT_GROUPS = {
  Vegetables: ['Tomatoes', 'Onions', 'Garlic', 'Carrots', 'Potatoes'],
  Proteins: ['Chicken', 'Eggs', 'Cheese'],
  Pantry: ['Rice', 'Pasta', 'Bread', 'Olive Oil', 'Salt', 'Pepper'],
  Dairy: ['Milk'],
};

const ALL_INGREDIENTS = Object.values(INGREDIENT_GROUPS).flat();

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function MyFridge() {
  const [selected, setSelected] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);

  const filtered = useMemo(() => {
    return ALL_INGREDIENTS.filter((i) =>
      i.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 6);
  }, [input]);

  const addIngredient = (item: string) => {
    const formatted =
      item.trim().charAt(0).toUpperCase() + item.trim().slice(1);
    if (!formatted) return;
    if (!selected.includes(formatted)) {
      setSelected((prev) => [...prev, formatted]);
    }
  };

  const removeIngredient = (item: string) => {
    setSelected((prev) => prev.filter((i) => i !== item));
  };

  // 💾 Optional: persist to Supabase
  /*
  useEffect(() => {
    const save = async () => {
      await supabase.from('fridge').upsert({
        user_id: 'USER_ID',
        items: selected,
      });
    };
    save();
  }, [selected]);
  */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='min-h-screen bg-[#0a0d0c] text-[#f5f5f3] flex'
    >
      <div className='hidden lg:flex w-1/2 relative overflow-hidden'>
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className='absolute inset-0'
        >
          <Image
            src='/fridge.png'
            alt='ingredients'
            fill
            className='object-cover'
          />
        </motion.div>

        <div className='absolute inset-0 bg-gradient-to-r from-[#0a0d0c] via-transparent' />
      </div>

      <div className='flex-1 flex justify-center px-6 py-16'>
        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className='w-full max-w-md'
        >
          <motion.div variants={item} className='mb-10'>
            <h1 className='text-4xl font-semibold tracking-tight'>
              Your fridge
            </h1>

            <p className='text-sm text-[#8f968c] mt-2'>
              {selected.length === 0
                ? "Start by adding what's in your fridge"
                : selected.length < 3
                ? 'Add a few more for better recipes'
                : "You're ready to cook 🍳"}
            </p>
          </motion.div>

          <motion.div variants={item} className='relative'>
            <motion.input
              animate={{
                scale: focused ? 1.02 : 1,
                boxShadow: focused
                  ? '0 0 0 1px rgba(255,255,255,0.2)'
                  : '0 0 0 0px rgba(0,0,0,0)',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className='w-full rounded-2xl bg-[#141816] border border-[#262e2a] px-5 py-4 text-sm outline-none transition'
              placeholder='Add ingredient...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addIngredient(input);
                  setInput('');
                }
              }}
            />

            <AnimatePresence>
              {input && filtered.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className='absolute mt-2 w-full bg-[#141816] border border-[#262e2a] rounded-xl shadow-xl overflow-hidden z-10'
                >
                  {filtered.map((item) => (
                    <motion.button
                      whileHover={{ x: 4 }}
                      key={item}
                      onClick={() => {
                        addIngredient(item);
                        setInput('');
                      }}
                      className='w-full text-left px-4 py-2 text-sm hover:bg-[#1b221f]'
                    >
                      {item}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div layout className='mt-6 flex flex-wrap gap-2'>
            <AnimatePresence>
              {selected.map((item) => (
                <motion.div
                  layout
                  key={item}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  whileHover={{ scale: 1.08 }}
                  className='flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-sm backdrop-blur'
                >
                  {item}
                  <button onClick={() => removeIngredient(item)}>
                    <X size={14} className='hover:text-white' />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className='mt-10 space-y-6'>
            {Object.entries(INGREDIENT_GROUPS).map(([group, items]) => (
              <motion.div key={group} variants={item}>
                <p className='text-xs uppercase tracking-wider text-[#6f776d] mb-3'>
                  {group}
                </p>

                <div className='flex flex-wrap gap-2'>
                  {items.map((item) => (
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      key={item}
                      onClick={() => addIngredient(item)}
                      className='flex items-center gap-2 rounded-full bg-[#141816] border border-[#262e2a] px-3 py-1.5 text-sm'
                    >
                      <Plus size={12} />
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={item} className='mt-12'>
            <motion.button
              animate={
                selected.length > 0 ? { scale: [1, 1.03, 1] } : { scale: 1 }
              }
              transition={{
                repeat: selected.length > 0 ? Infinity : 0,
                duration: 1.5,
              }}
              disabled={selected.length === 0}
              className='w-full rounded-2xl bg-white text-black py-4 text-sm font-medium shadow-lg shadow-white/10 disabled:opacity-30'
            >
              {selected.length > 0
                ? `Find recipes (${selected.length})`
                : 'Add ingredients to continue'}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
