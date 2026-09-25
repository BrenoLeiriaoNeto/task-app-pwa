import { Navbar, Page } from "konsta/react";
import { NetworkStatusBadge } from "../components/NetworkStatusBadge";

interface TasksPageProps {
  userId?: string;
}

export default function TasksPage({ userId }: TasksPageProps) {
  return (
    <Page>
      <Navbar
        title="Minhas Tarefas"
        right={
          <div className="flex items-center mr-2">
            <NetworkStatusBadge userId={userId} />
          </div>
        }
      />
      <div>conteudo da lista...</div>
    </Page>
  )
}
