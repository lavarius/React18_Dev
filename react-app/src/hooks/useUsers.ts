import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import { AxiosError, CanceledError } from "../services/api-client";

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      const { request, cancel } = userService.getAll<User>();
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

    return { users, error, isLoading, setUsers, setError };
}

export default useUsers;