import {Page, Block, Link} from 'konsta/react';
import LoginForm from '../components/LoginForm.tsx';
import {useState} from "react";
import RegisterForm from "../components/RegisterForm.tsx";

export const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const toggleTab = () => {
    setActiveTab((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <Page className="bg-neutral-900 text-white min-h-screen flex flex-col justify-center">
      <div className="w-full max-w-sm mx-auto px-4 py-8 flex flex-col justify-center">
        {/* Header with App Logo and Brand Title */}
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <div className="relative mb-3">
            <img
              src="/Logo-dark-512px.png"
              alt="Application Logo"
              className="w-72 h-72 object-contain rounded-2xl shadow-2xl drop-shadow-lg ring-1 ring-white/10"
              width="512"
              height="512"
            />
          </div>
          <h1 className="philosopher-bold text-3xl font-bold tracking-tight text-white mb-1">
            {activeTab === 'login' ? 'Bem-vindo(a)' : 'Crie sua conta'}
          </h1>
          <p className="text-sm text-neutral-400 font-normal">
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
        </Block>
      </div>
    </Page>
  );
};

export default LoginPage;
