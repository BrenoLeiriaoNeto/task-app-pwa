import { useState, useActionState, type ChangeEvent } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  List,
  ListInput,
  Button,
  Preloader,
} from 'konsta/react';
import { loginUser } from '../services/local/authService.ts';
import { localDb, type User } from '../storage/indexedDb/dexieConfig.ts';

interface LoginFormProps {
  onSuccess?: (user: User) => void;
}

interface ActionState {
  error: string | null;
}

const initialActionState: ActionState = {
  error: null,
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Reactive queries via dexie-react-hooks
  const savedUsers = useLiveQuery(() => localDb.users.toArray(), []);
  const matchedUser = useLiveQuery(
    () => (email.trim() ? localDb.users.where('email').equals(email.trim().toLowerCase()).first() : undefined),
    [email]
  );

  // React 19 useActionState for form action handling and pending state
  const [state, formAction, isPending] = useActionState(
    async (_prevState: ActionState, formData: FormData): Promise<ActionState> => {
      const formEmail = ((formData.get('email') as string) || email).trim();
      const formPassword = (formData.get('password') as string) || password;

      if (!formEmail || !formPassword) {
        return { error: 'Please provide both email and password.' };
      }

      try {
        const user = await loginUser(formEmail, formPassword);

        if (!user) {
          return { error: 'Invalid email or password. Please try again.' };
        }

        if (onSuccess) {
          onSuccess(user);
        }

        return { error: null };
      } catch (err) {
        console.error('Login error:', err);
        return { error: 'An unexpected error occurred during login. Please try again.' };
      }
    },
    initialActionState
  );

  const handleSelectAccount = (selectedEmail: string) => {
    setEmail(selectedEmail);
  };

  return (
    <form action={formAction} className="w-full space-y-6">
      <List strongIos insetIos className="my-0!">
        <ListInput
          label="Email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onInput={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          clearButton={email.length > 0}
          onClear={() => setEmail('')}
          required
          autoComplete="email"
          disabled={isPending}
          info={matchedUser ? `Account found: ${matchedUser.name}` : undefined}
        />
        <ListInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onInput={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          clearButton={password.length > 0}
          onClear={() => setPassword('')}
          required
          autoComplete="current-password"
          disabled={isPending}
        />
      </List>

      {/* Saved Accounts Quick Select (Dexie live query) */}
      {savedUsers && savedUsers.length > 0 && !email && (
        <div className="px-4">
          <div className="text-xs text-neutral-400 mb-2 font-medium">Quick sign-in:</div>
          <div className="flex flex-wrap gap-2">
            {savedUsers.slice(0, 3).map((savedUser) => (
              <button
                key={savedUser.id}
                type="button"
                onClick={() => handleSelectAccount(savedUser.email)}
                className="text-xs px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>{savedUser.name}</span>
                <span className="text-neutral-400 text-2xs">({savedUser.email})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {state.error && (
        <div
          role="alert"
          className="px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-medium text-center transition-all animate-fade-in"
        >
          {state.error}
        </div>
      )}

      <div className="px-4 pt-2">
        <Button
          large
          rounded
          type="submit"
          disabled={isPending || !email || !password}
          className="w-full font-semibold shadow-lg shadow-blue-500/20 active:scale-[0.99] transition-transform"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Preloader className="k-color-white" />
              <span>Signing In...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
