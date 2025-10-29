"use client";

import { UserForm } from '@/components/forms/UserForm';
import { useAuth } from '@/contexts/AuthContext';
import { UserFormData } from '@/types/user';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: UserFormData) => {
    await updateUser(data);
    router.push('/dashboard/profile');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to edit your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            <p className="mt-1 text-sm text-gray-600">
              Update your profile information
            </p>
          </div>
          <div className="px-6 py-5">
            <UserForm
              onSubmit={handleSubmit}
              defaultValues={{
                name: user.name,
                email: user.email,
                googleId: user.googleId || undefined,
                role: user.role,
                agent_status: user.agent_status || undefined,
                agent_extension: user.agent_extension || undefined,
                is_active: user.is_active,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

