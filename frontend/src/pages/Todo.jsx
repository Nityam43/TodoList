import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Todo = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("/todo");
      setTodos(res.data.todos);
    } catch (error) {
      alert("Unauthorized - login again");
      navigate("/login");
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return;

    try {
      await axios.post("/todo/add", { task });
      setTask("");
      fetchTodos();
    } catch (error) {
      console.error("Add todo error:", error);
      const message = error.response?.data?.message || "Failed to add todo";
      alert(message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Delete todo error:", error);
      alert("Failed to delete todo");
    }
  };

  const toggleDone = async (id, done) => {
    try {
      await axios.patch(`/todo/${id}`, { done: !done });
      fetchTodos();
    } catch (error) {
      console.error("Toggle todo error:", error);
      alert("Failed to update todo");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#1E2939] min-h-screen py-10">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex justify-end">
          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center text-white">My Todos</h2>
        <div className="flex gap-2 text-white">
          <input
            className="border flex-1 p-2 rounded text-white"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((t) => (
            <li
              key={t._id}
              className="border p-2 flex items-center justify-between bg-white rounded"
            >
              <div
                onClick={() => toggleDone(t._id, t.done)}
                className={`flex-1 cursor-pointer ${
                  t.done ? "line-through text-gray-400" : ""
                }`}
              >
                {t.task}
              </div>
              <button
                onClick={() => deleteTodo(t._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
