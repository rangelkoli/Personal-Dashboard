import { FinanceOverview } from "@/components/finance-overview";
import { MotivationalQuote } from "@/components/motivational-quotes";
import TodoList from "./TodoList";
function Home() {
  return (
    <div className='p-4 md:p-6 space-y-6 max-w-7xl mx-auto'>
      {/* <h1 className='text-2xl md:text-3xl font-bold mb-6'>
        Personal Dashboard
      </h1> */}
      <MotivationalQuote />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        <div className='md:col-span-3'>
          <TodoList />
        </div>
        <div className='md:col-span-2'></div>
        <div>
          <FinanceOverview />
        </div>
        <div className='md:col-span-2'></div>
      </div>
    </div>
  );
}

export default Home;
