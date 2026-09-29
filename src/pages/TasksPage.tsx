import {Block, Checkbox, Fab, Link, List, ListItem, Navbar, Page} from "konsta/react";
import {NetworkStatusBadge} from "../components/NetworkStatusBadge";
import {useLiveQuery} from "dexie-react-hooks";
import {useState} from "react";
import {taskService} from "../services/local/taskService.ts";
import {TaskStatus} from "../storage/indexedDb/dexieConfig.ts";
import {TaskForm} from "../components/TaskForm.tsx";
import {ThemeToggle} from "../components/ThemeToggle.tsx";
import {logoutCloudUser} from "../services/cloud/authCloudService.ts";

interface TasksPageProps {
  userId: string;
}

export default function TasksPage({ userId }: TasksPageProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<{
        id: string;
        title: string;
        description: string;
    } | null>(null);

    const tasks = useLiveQuery(
        () => taskService.getAllActiveTasks(userId), [userId]);

    const handleToggleCompleted = async (taskId: string, currentStatus: TaskStatus) => {
        await taskService.toggleTaskStatus(taskId, currentStatus);
    };

    const handleSaveTask = async (data: {
        title: string;
        description: string;
        id?: string;
    }) => {
        try {
            if (data.id) {
                await taskService.updateTask(data.id, {
                    title: data.title,
                    description: data.description,
                });
            } else {
                await taskService.createTask({
                    title: data.title,
                    description: data.description,
                    userId,
                    status: TaskStatus.PENDING
                });
            }
        } catch (error) {
            console.error('Erro ao salvar a tarefa:', error);
        }
    };

    const openNewTaskForm = () => {
        setTaskToEdit(null);
        setIsFormOpen(true);
    };

    const openEditTaskForm = (task: any) => {
        setTaskToEdit({
            id: task.id,
            title: task.title,
            description: task.description || '',
        });

        setIsFormOpen(true);
    }


  return (
      <Page>
          <Navbar
            title="Minhas Tarefas"
            left={
              <Link
                  onClick={() => logoutCloudUser()}
                  className="text-red-500 font-medium"
              >
                  Sair
              </Link>
            }
            right={
              <div className="flex items-center mr-2">
                  <NetworkStatusBadge userId={userId} />
                  <ThemeToggle />
              </div>
            }
          />

          {!tasks || tasks.length === 0 ? (
              <Block className="text-center mt-12 text-zinc-500 dark:text-zinc-400">
                  <p className="text-lg font-medium mb-1">Tudo limpo por aqui</p>
                  <p className="text-sm">Toque no botão abaixo para criar uma tarefa.</p>
              </Block>
          ) : (
              <List>
                  {tasks.map((task) => (
                      <ListItem
                        key={task.id}
                        title={
                            <span className={task.status === TaskStatus.COMPLETED
                                ? 'line-through text-zinc-400' : ''}>
                                {task.title}
                            </span>
                        }
                        text={task.description}
                        onClick={() => openEditTaskForm(task)}
                        className="cursor-pointer"
                        media={
                          <div onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                checked={task.status === TaskStatus.COMPLETED}
                                onChange={() => handleToggleCompleted(task.id, task.status)}
                              />
                          </div>
                        }
                        after={
                          !task.synced && (
                                <span className="text-2xs bg-amber-100 text-amber-700
                                px-1.5 pt-0.5 rounded-sm shrink-0">
                                    Pendente
                                </span>
                            )
                        }
                      />
                  ))}
              </List>
          )}

          <Fab
            className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-50 bg-emerald-600"
            onClick={openNewTaskForm}
          >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
          </Fab>

          <TaskForm
              opened={isFormOpen}
              onClose={() => setIsFormOpen(false)}
              initialData={taskToEdit}
              onSubmit={handleSaveTask}
          />
      </Page>
  );
}
