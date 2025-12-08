import useAuth from "../../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Welcome, {user?.displayName || "User"}!</h1>
      <p className="mt-4 text-xl">This is your dashboard</p>
    </div>
  );
};

export default UserDashboard;