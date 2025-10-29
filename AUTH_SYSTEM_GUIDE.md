# Auth System with Context API and React Hook Form

This document explains the authentication system implementation using Context API and React Hook Form.

## Architecture Overview

The authentication system consists of several key components:

1. **AuthContext** (`contexts/AuthContext.tsx`) - Provides authentication state and methods
2. **UserProvider** (`contexts/UserProvider.tsx`) - Wraps all providers
3. **useAuth Hook** (`hooks/useAuth.ts`) - Exports the auth hook for use throughout the app
4. **UserForm Component** (`components/forms/UserForm.tsx`) - React Hook Form component for user data

## Installation

The following packages have been installed:

```bash
npm install react-hook-form @hookform/resolvers zod
```

## File Structure

```
contexts/
  ├── AuthContext.tsx      # Main auth context with state management
  └── UserProvider.tsx      # Provider wrapper for all contexts

components/
  └── forms/
      └── UserForm.tsx     # React Hook Form component

types/
  └── user.ts              # TypeScript types matching Prisma schema

hooks/
  └── useAuth.ts           # Re-exported auth hook
```

## Usage

### 1. Accessing User Data

Use the `useAuth` hook to access user data anywhere in your components:

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;
  
  return <div>Welcome, {user.name}!</div>;
}
```

### 2. Using the UserForm Component

The `UserForm` component uses React Hook Form with Zod validation:

```typescript
import { UserForm } from '@/components/forms/UserForm';
import { UserFormData } from '@/types/user';

function EditProfilePage() {
  const handleSubmit = async (data: UserFormData) => {
    // Handle form submission
    console.log('Form data:', data);
  };

  return (
    <UserForm
      onSubmit={handleSubmit}
      defaultValues={{
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'agent',
        // ... other fields
      }}
    />
  );
}
```

### 3. Updating User Data

Update user data through the auth context:

```typescript
const { updateUser } = useAuth();

const handleUpdate = async () => {
  await updateUser({
    name: 'New Name',
    role: 'admin',
    // ... other fields
  });
};
```

## User Types

The user types match your Prisma schema:

```typescript
export type UserRole = 'agent' | 'admin';
export type AgentStatus = 'BREAK' | 'ON_CALL' | 'OFFLINE' | 'AVAILABLE';

export interface User {
  id: string;
  name: string;
  email: string;
  googleId?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  agent_status?: AgentStatus | null;
  agent_extension?: string | null;
  is_active: boolean;
  last_login_at?: Date | null;
  refreshToken?: string | null;
  refresh_token_expires_at?: Date | null;
}
```

## AuthContext API

The `AuthContext` provides the following properties and methods:

### Properties

- `user: User | null` - Current user object
- `isAuthenticated: boolean` - Whether user is authenticated
- `isLoading: boolean` - Whether auth state is loading

### Methods

- `setUser(user: User | null)` - Update the current user
- `login(email: string, password?: string)` - Login a user
- `logout()` - Logout the current user
- `updateUser(data: Partial<UserFormData>)` - Update user data

## Form Validation

The `UserForm` component uses Zod for validation. The schema validates:

- **name**: Minimum 2 characters
- **email**: Valid email format
- **googleId**: Optional string
- **role**: Either 'agent' or 'admin'
- **agent_status**: Optional status enum
- **agent_extension**: Optional string
- **is_active**: Boolean (defaults to true)

## Integration with NextAuth

The auth context integrates with NextAuth's `SessionProvider`. When a user logs in through NextAuth, their session data is mapped to the User type in the context.

## Example Pages

### Profile Page

The profile page (`app/dashboard/profile/page.tsx`) demonstrates:
- Accessing user data from the context
- Displaying user information
- Showing agent status

### Edit Profile Page

The edit profile page (`app/profile/edit/page.tsx`) demonstrates:
- Using the UserForm component
- Updating user data through the context
- Handling form submission

## Customization

### Adding More Form Fields

To add more fields to the form, update:

1. The `UserFormSchema` in `components/forms/UserForm.tsx`
2. The `UserFormData` type in `types/user.ts`
3. Add the input field to the form component

### Custom Validation

Modify the Zod schema in `UserForm.tsx` to add custom validation rules:

```typescript
const userFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  // Add more validation rules
});
```

## Best Practices

1. **Always check loading state**: Wait for `isLoading` to be `false` before rendering user data
2. **Handle authentication**: Check `isAuthenticated` before accessing user data
3. **Use TypeScript**: Leverage the provided types for type safety
4. **Error handling**: Always wrap async operations in try-catch blocks
5. **Consistent naming**: Use consistent naming conventions across the codebase

## Troubleshooting

### User data is null

Ensure the `AuthProvider` is wrapping your components in the layout:

```typescript
// app/layout.tsx
<UserProvider>
  {children}
</UserProvider>
```

### Form validation errors

Check that your Zod schema matches the form fields and that all required fields are properly registered with `{...register('fieldName')}`

### Context not found error

Make sure you're importing `useAuth` from the correct location:

```typescript
import { useAuth } from '@/contexts/AuthContext';
```

