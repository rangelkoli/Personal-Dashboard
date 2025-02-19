// import { useState, useEffect } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import axios from "axios";

// export function TodoList() {
//   const [todos, setTodos] = useState([]); // Initialize todos as an empty array
//   const [newTodo, setNewTodo] = useState("");

//   useEffect(() => {
//     // Fetch todos from the backend here
//     axios.get("http://localhost:5000/todos").then((response) => {
//       setTodos(response.data.todos);
//     });
//   }, []); // Empty dependency array to run the effect only once

//   const addTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([
//         ...todos,
//         { id: Date.now().toString(), text: newTodo, completed: false },
//       ]);
//       setNewTodo("");
//     }
//   };

//   const toggleTodo = (id: string) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Today's Tasks</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className='flex flex-col sm:flex-row gap-2 mb-4'>
//           <Input
//             type='text'
//             placeholder='Add a new task'
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//             className='flex-grow'
//           />
//           <Button onClick={addTodo} className='w-full sm:w-auto'>
//             Add
//           </Button>
//         </div>
//         <ul className='space-y-2'>
//           {todos.map((todo) => (
//             <li key={todo.id} className='flex items-center'>
//               <Checkbox
//                 id={todo.id}
//                 checked={todo.completed}
//                 onCheckedChange={() => toggleTodo(todo.id)}
//               />
//               <label
//                 htmlFor={todo.id}
//                 className={`ml-2 ${
//                   todo.completed ? "line-through text-muted-foreground" : ""
//                 }`}
//               >
//                 {todo.text}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </CardContent>
//     </Card>
//   );
// }
