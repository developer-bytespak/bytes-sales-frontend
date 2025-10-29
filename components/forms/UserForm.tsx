"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserFormData, UserRole, AgentStatus } from '@/types/user';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

// Zod validation schema
const userFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  googleId: z.string().optional(),
  role: z.enum(['agent', 'admin']),
  agent_status: z.enum(['BREAK', 'ON_CALL', 'OFFLINE', 'AVAILABLE']).optional(),
  agent_extension: z.string().optional(),
  is_active: z.boolean(),
});

type UserFormSchemaType = z.infer<typeof userFormSchema>;

interface UserFormProps {
  onSubmit?: (data: UserFormData) => void;
  defaultValues?: Partial<UserFormData>;
}

export function UserForm({ onSubmit, defaultValues }: UserFormProps) {
  const { user, updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserFormSchemaType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultValues || {
      name: user?.name || '',
      email: user?.email || '',
      googleId: user?.googleId || undefined,
      role: (user?.role as UserRole) || 'agent',
      agent_status: user?.agent_status || undefined,
      agent_extension: user?.agent_extension || undefined,
      is_active: user?.is_active ?? true,
    },
  });

  const onFormSubmit = async (data: UserFormSchemaType) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Call the onSubmit prop if provided
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Otherwise update the user through the auth context
        await updateUser(data);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {submitError}
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Google ID Field */}
      <div>
        <label htmlFor="googleId" className="block text-sm font-medium text-gray-700 mb-2">
          Google ID
        </label>
        <input
          id="googleId"
          type="text"
          {...register('googleId')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Google ID (optional)"
        />
        {errors.googleId && (
          <p className="mt-1 text-sm text-red-600">{errors.googleId.message}</p>
        )}
      </div>

      {/* Role Field */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
          Role *
        </label>
        <select
          id="role"
          {...register('role')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      {/* Agent Status Field */}
      <div>
        <label htmlFor="agent_status" className="block text-sm font-medium text-gray-700 mb-2">
          Agent Status
        </label>
        <select
          id="agent_status"
          {...register('agent_status')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Select status</option>
          <option value="BREAK">Break</option>
          <option value="ON_CALL">On Call</option>
          <option value="OFFLINE">Offline</option>
          <option value="AVAILABLE">Available</option>
        </select>
        {errors.agent_status && (
          <p className="mt-1 text-sm text-red-600">{errors.agent_status.message}</p>
        )}
      </div>

      {/* Agent Extension Field */}
      <div>
        <label htmlFor="agent_extension" className="block text-sm font-medium text-gray-700 mb-2">
          Agent Extension
        </label>
        <input
          id="agent_extension"
          type="text"
          {...register('agent_extension')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Extension number (optional)"
        />
        {errors.agent_extension && (
          <p className="mt-1 text-sm text-red-600">{errors.agent_extension.message}</p>
        )}
      </div>

      {/* Is Active Field */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('is_active')}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">
            User is active
          </span>
        </label>
        {errors.is_active && (
          <p className="mt-1 text-sm text-red-600">{errors.is_active.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

