import { useState} from 'react';
import {
    List,
    ListInput,
    Button,
    Block,
} from 'konsta/react';
import {authLocalService} from '../services/local/authService.ts';
import {registerCloudUser} from "../services/cloud/authCloudService.ts";

export function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password) {
            setError('Preencha todos os campos');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const user = await registerCloudUser(email, password);

            authLocalService.saveUserId(user.uid);

        } catch (err: any) {
            console.error(err);
            setError('Erro ao criar conta. Verifique seus dados ou conexão.');
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
                <Button onClick={handleRegister} className="bg-emerald-600" disabled={isLoading}>
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
            </Block>
        </>
    );
}

export default RegisterForm;
