// src/components/forms/LoginForm.tsx
import { Button } from '@/components/ui/button'; // Shadcn Button
import { Input } from '@/components/ui/input'; // Shadcn Input
import { Label } from '@/components/ui/label'; // Shadcn Label
import { useForm } from '@tanstack/react-form';
import React from 'react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data (e.g., call authentication API)
      console.log('Login form submitted:', value);
      alert(`Attempting login for: ${value.email}`);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className='space-y-4 p-6 border rounded-lg shadow-sm w-80 bg-white dark:bg-gray-800'>
      <form.Field
        name='email'
        validators={{
          onChange: loginSchema.shape.email,
        }}
        children={(field) => (
          <div>
            <Label htmlFor={field.name}>Email</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
              type='email'
              placeholder='you@example.com'
            />
            {field.state.meta.isTouched && field.state.meta.errors ? (
              <p className='text-red-500 text-sm mt-1'>
                {field.state.meta.errors.map((err) => err?.message).join(', ')}
              </p>
            ) : null}
          </div>
        )}
      />
      <form.Field
        name='password'
        validators={{
          onChange: loginSchema.shape.password,
        }}
        children={(field) => (
          <div>
            <Label htmlFor={field.name}>Password</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
              type='password'
              placeholder='Enter your password'
            />
            {field.state.meta.isTouched && field.state.meta.errors ? (
              <p className='text-red-500 text-sm mt-1'>
                {field.state.meta.errors.map((err) => err?.message).join(', ')}
              </p>
            ) : null}
          </div>
        )}
      />
      <Button type='submit' disabled={!form.state.isValid}>
        Submit
      </Button>
    </form>
  );
}

export default LoginForm;
