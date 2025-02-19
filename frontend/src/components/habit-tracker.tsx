import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

interface HabitProps {
  created_at: string;
  days: number[];
  id: number;
  name: string;
  updated_at: string;
  user_id: number;
  month: number;
  year: number;
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
    setFilteredHabits(
      newHabits.filter((habit) => habit.month === currentMonth.getMonth())
    );
  };
  const [currentMonth, setcurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setcurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
    setFilteredHabits(
      habits.filter((habit) => habit.month === currentMonth.getMonth())
    );
    console.log(
      habits.filter((habit) => habit.month === currentMonth.getMonth())
    );
  };

  const nextMonth = () => {
    setcurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
    setFilteredHabits(
      habits.filter((habit) => habit.month === currentMonth.getMonth())
    );
  };

  const [filteredHabits, setFilteredHabits] = useState<HabitProps[]>([]);
  const [habitName, setHabitName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handleNewHabitMonthChange = (date: Date | null) => {
    if (date) {
      setSelectedMonth(date);
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  async function addNewHabit() {
    const res = await axios.post("http://127.0.0.1:5000/habits/add_habit/", {
      user_id: 1,
      name: habitName,
      days: Array(31).fill(0),
      month: selectedMonth.getMonth(),
      year: selectedMonth.getFullYear(),
    });
    setHabits([
      ...habits,
      {
        id: habits.length + 1,
        name: habitName,
        days: Array(31).fill(0),
        user_id: 1,
        month: selectedMonth.getMonth(),
        year: selectedMonth.getFullYear(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    setHabitName("");
    if (res.status === 201) {
      setDialogOpen(false);
    }
  }

  return (
    <Card className='md:p-4 gap-2 '>
      <CardHeader>
        <Dialog open={dialogOpen}>
          <DialogTrigger asChild className='w-64 '>
            <Button variant='outline' onClick={() => setDialogOpen(true)}>
              Add New Habit
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>New Habit</DialogTitle>
              <DialogDescription>
                Add a new habit to track for the month
              </DialogDescription>
            </DialogHeader>

            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input
                  id='name'
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4 w-full'>
                <Label htmlFor='month' className='text-right'>
                  Month
                </Label>
                <DatePicker
                  id='month'
                  selected={selectedMonth}
                  onChange={(date: Date) => handleNewHabitMonthChange(date)}
                  className='col-span-3 bg-gray-900 p-2 rounded-md '
                  showMonthYearPicker
                  dateFormat='MM/yyyy'
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' onClick={addNewHabit}>
                Add Habit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <CardTitle className='flex justify-between items-center'>
          <Button variant='outline' size='icon' onClick={prevMonth}>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <span className=' font-bold text-3xl'>
            {currentMonth.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </span>
          <Button variant='outline' size='icon' onClick={nextMonth}>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredHabits.map((habit) => (
          <div key={habit.id} className='mb-4'>
            <Habit
              key={habit.id}
              days={habit.days}
              setFilteredHabits={setFilteredHabits}
              name={habit.name}
              id={habit.id}
              handleHabitChanged={handleHabitChanged}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const Habit = ({
  days,
  setFilteredHabits,
  name,
  id,
  handleHabitChanged,
}: {
  days: number[];
  setFilteredHabits: (habits: HabitProps[]) => void;
  name: string;
  id: number;
  handleHabitChanged: (habit: {
    id: number;
    name: string;
    days: number[];
    user_id: number;
  }) => void;
}) => {
  setFilteredHabits;
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
