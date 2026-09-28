import { Block, Checkbox, List, ListItem, Navbar, Page } from "konsta/react";
import { NetworkStatusBadge } from "../components/NetworkStatusBadge";
import { useLiveQuery } from "dexie-react-hooks";
import { getTasks, updateTaskStatus } from "../services/local/taskService";

interface TasksPageProps {
  userId: string;
}

export default function TasksPage({ userId }: TasksPageProps) {
  const tasks = useLiveQuery(async () =>  await getTasks(userId), [userId]);

  const handleToggleCompleted = async (taskId: string) => {
    try {
      await updateTaskStatus(taskId, 'completed');
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  }

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
      {!tasks || tasks.length === 0 ? (
        <Block className="text-center mt-12 text-zinc-500 dark:text-zinc-400">
          <p className="text-lg font-medium mb-1">Tudo limpo por aqui!</p>
          <p className="text-sm">Toque no botão abaixo para criar uma nova tarefa.</p>
        </Block>
      ) : (
          <List>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                title={
                  <span className={task.status === 'completed'
                    ? 'line-through text-zinc-400' : ''}>
                    {task.title}
                    </span>
                }
                text={task.description}
                media={
                  <Checkbox
                }
              />
            ))}
        </List>
      )}

    </Page>
  )
}
