'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';

const QUICK_INGREDIENTS = [
  'Tomatoes',
  'Onions',
  'Garlic',
  'Chicken',
  'Pasta',
  'Rice',
  'Eggs',
  'Milk',
  'Cheese',
  'Bread',
  'Potatoes',
  'Carrots',
  'Olive Oil',
  'Salt',
  'Pepper',
];

export default function MyFridge() {
  const [selected, setSelected] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addIngredient = (item: string) => {
    const formatted = item.trim();
    if (!formatted) return;
    if (!selected.includes(formatted)) {
      setSelected([...selected, formatted]);
    }
  };

  const removeIngredient = (item: string) => {
    setSelected(selected.filter((i) => i !== item));
  };

  return (
    <div className='min-h-screen bg-[#0a0d0c] text-[#f5f5f3] flex'>
      <div className='hidden lg:flex w-1/2 relative overflow-hidden'>
        <Image
          src='https://images.unsplash.com/photo-1721613877687-c9099b698faa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='ingredients'
          fill
          className='object-cover opacity-100'
        />
      </div>

      <div className='flex-1 flex justify-center px-6 py-16'>
        <div className='w-full max-w-md'>
          <div className='mb-10'>
            <h1 className='text-4xl font-semibold tracking-tight'>
              Your fridge
            </h1>
            <p className='text-sm text-[#8f968c] mt-2'>
              Build meals from what you already have.
            </p>
          </div>

          <div className='relative'>
            <input
              className='w-full rounded-2xl bg-[#141816] border border-[#262e2a] px-5 py-4 text-sm outline-none focus:border-white/30 transition'
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
          </div>

          {selected.length > 0 && (
            <div className='mt-6 flex flex-wrap gap-2'>
              {selected.map((item) => (
                <div
                  key={item}
                  className='flex items-center gap-2 rounded-full bg-[#181f1c] border border-[#2c3531] px-3 py-1.5 text-sm hover:bg-[#202824] transition'
                >
                  {item}
                  <button onClick={() => removeIngredient(item)}>
                    <X size={14} className='text-[#6f776d] hover:text-white' />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className='mt-10'>
            <div className='flex items-center justify-between mb-3'>
              <p className='text-xs uppercase tracking-wider text-[#6f776d]'>
                Ingredients
              </p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {QUICK_INGREDIENTS.map((item) => (
                <button
                  key={item}
                  onClick={() => addIngredient(item)}
                  className='flex items-center cursor-pointer gap-2 rounded-full bg-[#141816] border border-[#262e2a] px-3 py-1.5 text-sm hover:bg-[#1b221f] transition'
                >
                  <Plus size={12} />
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className='mt-12'>
            <button
              disabled={selected.length === 0}
              className='w-full rounded-2xl bg-white text-black py-4 text-sm font-medium transition hover:opacity-90 active:scale-[0.98] disabled:opacity-30'
            >
              {selected.length > 0
                ? `Find recipes (${selected.length})`
                : 'Add ingredients to continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
