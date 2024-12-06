import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useTodo = () => {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://13.60.12.85/todos", {
                    withCredentials: true,
                });
                setTodos(response.data);
            } catch (err) {
                console.error("Error fetching todos:", err);
            }
        };
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (!todoInput) {
            toast.error("Please enter a todo!");
        }

        if (todoInput.trim()) {
            try {
                const response = await axios.post(
                    "http://13.60.12.85/todos",
                    { text: todoInput },
                    { withCredentials: true }
                );
                setTodos([...todos, response.data]);
                toast.success("Todo added successfully!");
                setTodoInput("");
            } catch (err) {
                console.error("Error adding todo:", err);
            }
        }
    };

    const toggleTodo = async (id) => {
        try {
            const response = await axios.patch(
                `http://13.60.12.85/todos/${id}`,
                {},
                { withCredentials: true }
            );
            setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
        } catch (err) {
            console.error("Error toggling todo:", err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://13.60.12.85/todos/${id}`, {
                withCredentials: true,
            });
            setTodos(todos.filter((todo) => todo._id !== id));
            toast.success("Todo deleted successfully!");
        } catch (err) {
            console.error("Error deleting todo:", err);
        }
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        todoInput,
        setTodoInput,
    };
};

export default useTodo;
