import { Page, Block } from 'konsta/react';
import LoginForm from '../components/LoginForm.tsx';
import type { User } from '../storage/indexedDb/dexieConfig.ts';

interface LoginPageProps {
  onLoginSuccess?: (user: User) => void;
}

export const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  return (
    <Page className="bg-neutral-900 text-white min-h-screen flex flex-col justify-center">
      <div className="w-full max-w-sm mx-auto px-4 py-8 flex flex-col justify-center">
        {/* Header with App Logo and Brand Title */}
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <div className="relative mb-3">
            <img
              src="/Logo-dark-512x512.png"
              alt="Application Logo"
              className="w-72 h-72 object-contain rounded-2xl shadow-2xl drop-shadow-lg ring-1 ring-white/10"
              width="512"
              height="512"
            />
          </div>
          <h1 className="philosopher-bold text-3xl font-bold tracking-tight text-white mb-1">
            Bem-vindo(a)
          </h1>
          <p className="text-sm text-neutral-400 font-normal">
            Sign in to continue to your workspace
          </p>
        </div>

        {/* Login Form */}
        <Block className="px-0! py-0! my-0!">
          <LoginForm onSuccess={onLoginSuccess} />
        </Block>
      </div>
    </Page>
  );
};

export default LoginPage;
