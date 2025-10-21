
'use client';

import { LoginForm } from '@/components/auth/client';

export default function Login() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">
            Sign in or create an account to continue
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
