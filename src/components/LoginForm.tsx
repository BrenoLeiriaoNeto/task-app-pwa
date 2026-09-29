import { useState} from 'react';
import {
    List,
    ListInput,
    Button,
    Block,
} from 'konsta/react';
import {authLocalService} from '../services/local/authService.ts';
import {loginCloudUser} from "../services/cloud/authCloudService.ts";

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
      if (!email || !password) {
          setError('Preencha todos os campos');
          return;
      }

      setIsLoading(true);
      setError('');

      try {
          const user = await loginCloudUser(email, password);

          authLocalService.saveUserId(user.uid);

      } catch (err: any) {
          console.error(err);
          setError('Credenciais inválidas ou erro de rede.');
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <>
        <List inset>
            <ListInput
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <ListInput
                label="Senha"
                type="password"
                placeholder="*****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </List>

        {error &&
            <Block className="text-red-500 text-sm text-center mb-2">
                {error}
            </Block>
        }

        <Block className="mt-4">
            <Button onClick={handleLogin} className="bg-emerald-600" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
        </Block>
    </>
  );
}

export default LoginForm;
