// src/hooks/useRole.jsx
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import axios from 'axios';

const useRole = () => {
  const { user, loading } = useAuth();

  const { data: role = 'user', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;