import { useEffect, useState } from "react";
import apiClient, { AxiosError, CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const { request, cancel } = userService.getAllUsers();
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await request;
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
        setLoading(false);
      }
    };
    fetchUsers();

    return () => {
      cancel();
    };
  }, []);

  const deleteUser = async (user: User) => {
    // restore when error
    const originalUsers = [...users];

    // Update the UI
    setUsers(users.filter((u) => u.id !== user.id));

    // Call the Server to persist the changes
    try {
      await apiClient.delete("/users/" + user.id);
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
      const res = await apiClient.post("/users", newUser);
      //update local state with server response
      setUsers([res.data, ...users]);
    } catch (err) {
      setError((err as AxiosError).message);
      // Revert to original state if request fails
      setUsers(originalUsers);
    }
  };

  const updateUser = async (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    // update UI
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    try {
      await apiClient.patch("/users/" + user.id, updatedUser);
    } catch (err) {
      setError((err as AxiosError).message);
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
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
