import React, { useState } from "react";

interface HabitProps {
  created_at: string;
  days: number[];
  id: number;
  name: string;
  updated_at: string;
  user_id: number;
}
interface HabitChanged {
  id: number;
  name: string;
  days: number[];
  user_id: number;
}

const HabitTrackerComponent = ({
  habits,
  setHabits,
}: {
  habits: HabitProps[];
  setHabits: (habits: HabitProps[]) => void;
}) => {
  const handleHabitChanged = (habit: {
    id: number;
    name: string;
    days: number[];
    user_id: number;
  }) => {
    const newHabits = habits.map((h) =>
      h.id === habit.id ? { ...h, days: habit.days } : h
    );
    setHabits(newHabits);
  };

  return (
    <div className='md:p-4 gap-2'>
      {habits.map((habit) => (
        <div key={habit.id} className='mb-4'>
          <Habit
            key={habit.id}
            days={habit.days}
            setHabits={setHabits}
            name={habit.name}
            id={habit.id}
            handleHabitChanged={handleHabitChanged}
          />
        </div>
      ))}
    </div>
  );
};

const Habit = ({
  days,
  setHabits,
  name,
  id,
  handleHabitChanged,
}: {
  days: number[];
  setHabits: (habits: HabitProps[]) => void;
  name: string;
  id: number;
  handleHabitChanged: (habit: {
    id: number;
    name: string;
    days: number[];
    user_id: number;
  }) => void;
}) => {
  return (
    <div className='grid grid-cols-5 gap-4 border p-4 h-full border-gray-200 rounded-xl sm:p-2 md:p-4'>
      <div className='md:col-span-1 text-center h-full align-middle justify-center flex flex-col text-xl font-semibold'>
        {name}
      </div>
      <div className='col-span-4'>
        <div className='grid grid-cols-10 grid-rows-3 gap-1'>
          {days.map((day, index) => (
            <div
              key={index}
              className={`border border-gray-200 rounded
              cursor-pointer 
               sm:p1 md:p-4 text-center ${
                 day === 0
                   ? ""
                   : day === 1
                   ? "bg-green-400 text-black"
                   : "bg-red-400 text-black"
               }`}
              onClick={() => {
                handleHabitChanged({
                  id,
                  name,
                  days: days.map((d, i) => (i === index ? (d + 1) % 3 : d)),
                  user_id: 1,
                });
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HabitTrackerComponent;
