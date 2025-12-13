// src/hooks/useRole.jsx
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading: isRoleLoading } = useQuery({
        queryKey: [user?.email, 'role'],
        enabled: !loading && !!user?.email, // ইউজার লোড হওয়ার পর কল হবে
        queryFn: async () => {
            // 🔥 axios এর বদলে axiosSecure ব্যবহার করুন
            const res = await axiosSecure.get(`/users/role/${user?.email}`);
            return res.data.role;
        }
    });

    return [role, isRoleLoading];
};

export default useRole;