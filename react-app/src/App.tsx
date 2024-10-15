import axios, { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );
        {
          setUsers(res.data);
          setLoading(false);
        }
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        setLoading(false);
      }
    };
    fetchUsers();

    return () => controller.abort();
  }, []);

  const deleteUser = async (user: User) => {
    // restore when error
    const originalUsers = [...users];

    // Update the UI
    setUsers(users.filter((u) => u.id !== user.id));

    // Call the Server to persist the changes
    try {
      const res = await axios.delete(
        "https://jsonplaceholder.typicode.com/users/" + user.id
      );
    } catch (err) {
      setError((err as AxiosError).message);
      setUsers(originalUsers);
    }
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
