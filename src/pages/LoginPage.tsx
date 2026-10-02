import {Page, Block, Link, Button} from 'konsta/react';
import LoginForm from '../components/LoginForm.tsx';
import {useState} from "react";
import RegisterForm from "../components/RegisterForm.tsx";
import {ThemeToggle} from "../components/ThemeToggle.tsx";
import {useTheme} from "../hooks/useTheme.ts";

interface LoginPageProps {
  onOpenQuestionnaire: () => void;
}

export const LoginPage = ({ onOpenQuestionnaire }: LoginPageProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const { isDark } = useTheme();

  const toggleTab = () => {
    setActiveTab((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <Page className="bg-zinc-100 dark:bg-neutral-900 text-zinc-900 dark:text-white min-h-screen flex flex-col justify-center relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm mx-auto px-4 py-8 flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <div className="relative mb-3">
            <img
              src={isDark ? "/Logo-dark-512px.png" : "/Logo-light-512px.png"}
              alt="Application Logo"
              className="w-72 h-72 object-contain rounded-2xl shadow-2xl drop-shadow-lg ring-1 ring-zinc-200 dark:ring-white/10"
              width="512"
              height="512"
            />
          </div>
          <h1 className="philosopher-bold text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">
            {activeTab === 'login' ? 'Bem-vindo(a)' : 'Crie sua conta'}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-neutral-400 font-normal">
            {activeTab === 'login' ?
            'Entre para acessar suas tarefas' : 'Preencha seus dados para começar'}
          </p>
        </div>

        <Block className="px-0! py-0! my-0!">
          {activeTab === 'login' ? <LoginForm/> : <RegisterForm/>}
        </Block>

        <Block className="text-center mt-6">
          <Link
              onClick={toggleTab}
              className="text-emerald-500 font-medium text-sm cursor-pointer hover:text-emerald-400 transition-colors"
          >
            {activeTab === 'login'
                ? 'Não possui uma conta? Cadastre-se!'
                : 'Já possui uma conta? Faça login!'}
          </Link>
          <Button
              outline
              onClick={onOpenQuestionnaire}
              className="mt-4 border-emerald-500 text-emerald-500"
          >
            Questionário
          </Button>
        </Block>
      </div>
    </Page>
  );
};

export default LoginPage;
