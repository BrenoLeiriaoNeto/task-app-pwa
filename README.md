# TaskApp PWA

Aplicativo simples de gerenciamento de tarefas, desenvolvido como projeto de aprendizado sobre Progressive Web Apps. O foco está em praticar recursos de PWA funcionais, como instalação, uso offline, atualização do service worker e sincronização em segundo plano.

## Funcionalidades

- Criar, editar, concluir e excluir tarefas, com descrição e data/horário opcionais.
- Consultar tarefas concluídas no dia e um resumo de tarefas no perfil.
- Salvar tarefas primeiro no IndexedDB do dispositivo e sincronizá-las com o Firestore quando houver conexão.
- Criar conta e entrar com e-mail e senha usando Firebase Authentication.
- Instalar o app quando o navegador oferecer suporte e exibir o estado de instalação.
- Usar o app-shell em modo offline após ele ter sido carregado e armazenado em cache pelo service worker.
- Receber avisos quando o app estiver disponível offline ou quando uma atualização puder ser aplicada.
- Alternar entre tema claro e escuro.
- Acessar um questionário sobre computação, internet e usabilidade.

## Tecnologias

- React 19, TypeScript e Vite
- Tailwind CSS 4 e Konsta UI
- Dexie e IndexedDB para dados locais
- Firebase Authentication, Cloud Firestore e Analytics
- `vite-plugin-pwa` e Workbox para o manifesto e o service worker

## Requisitos

- [Bun](https://bun.sh/) instalado
- Um projeto Firebase com Authentication (provedor e-mail/senha) e Cloud Firestore habilitados para usar contas e sincronização na nuvem

A configuração do Firebase está no código em `src/storage/firebase/firebaseConfig.ts` e também no service worker em `src/sw.ts`. Ao conectar outro projeto Firebase, atualize os dois locais e configure regras do Firestore que protejam os dados por usuário. A configuração web do Firebase não substitui as regras de segurança do banco.

## Executar localmente

```bash
bun install
bun run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador. Para usar autenticação e sincronização, o projeto Firebase configurado precisa estar acessível.

## Comandos

```bash
bun run dev      # inicia o servidor de desenvolvimento
bun run build    # verifica os tipos e gera a versão de produção
bun run preview  # serve localmente a versão de produção
bun run lint     # executa o Oxlint
```

## Testar os recursos de PWA

Gere a versão de produção com `bun run build` e sirva-a por `bun run preview`. Abra o endereço local em um navegador compatível para testar instalação, cache offline e atualização. Service workers e instalação exigem um contexto seguro: `localhost` funciona para desenvolvimento; em outros ambientes, use HTTPS.

A oferta de instalação depende do navegador e do dispositivo. A sincronização em segundo plano também depende do suporte do navegador; o app tenta usar a Background Sync API e possui um fallback por mensagem ao service worker. As tarefas são mantidas localmente quando não há conexão, mas login/cadastro e sincronização com o Firebase precisam de rede. O cache offline cobre o app-shell, não transforma os serviços remotos do Firebase em serviços offline.
