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

  const addUser = async () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mark" };

    setUsers([newUser, ...users]);

    //update the server
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );

      //update local state with server response
      setUsers([res.data, ...users]);
      // ({data: savedUser }) => setUsers([savedUser, ...users])
      // alias to property
    } catch (err) {
      setError((err as AxiosError).message);
      // Revert to original state if request fails
      setUsers(originalUsers);
    }
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="mb-3 btn btn-primary" onClick={addUser}>
        Add User
      </button>
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
