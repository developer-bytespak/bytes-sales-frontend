"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Logout handling will be implemented here */}
    </div>
  );
}
