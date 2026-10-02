import {Block, Checkbox, Fab, Link, List, ListItem, Navbar, Page} from "konsta/react";
import {NetworkStatusBadge} from "../components/NetworkStatusBadge";
import {useLiveQuery} from "dexie-react-hooks";
import {useState} from "react";
import {taskService} from "../services/local/taskService.ts";
import {type Task, TaskStatus} from "../storage/indexedDb/dexieConfig.ts";
import {TaskForm} from "../components/TaskForm.tsx";
import {ThemeToggle} from "../components/ThemeToggle.tsx";

interface TasksPageProps {
  userId: string;
  onOpenProfile: () => void;
}

export default function TasksPage({ userId, onOpenProfile }: TasksPageProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<{
        id: string;
        title: string;
        description: string;
        dueDate?: string;
    } | null>(null);

    const tasks = useLiveQuery(
        () => taskService.getAllActiveTasks(userId), [userId]);

    const handleToggleCompleted = async (taskId: string, currentStatus: TaskStatus) => {
        await taskService.toggleTaskStatus(taskId, currentStatus);
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            await taskService.softDelete(taskId);
        } catch (error) {
            console.error('Erro ao excluir a tarefa:', error);
        }
    };

    const handleSaveTask = async (data: {
        title: string;
        description: string;
        dueDate?: string;
        id?: string;
    }) => {
        try {
            if (data.id) {
                await taskService.updateTask(data.id, {
                    title: data.title,
                    description: data.description,
                    dueDate: data.dueDate,
                });
            } else {
                await taskService.createTask({
                    title: data.title,
                    description: data.description,
                    dueDate: data.dueDate,
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

    const openEditTaskForm = (task: Task) => {
        setTaskToEdit({
            id: task.id,
            title: task.title,
            description: task.description || '',
            dueDate: task.dueDate || '',
        });

        setIsFormOpen(true);
    };

    const isSameDay = (dateStr?: string, targetDate = new Date()) => {
        if (!dateStr) return false;
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return false;
        return (
            d.getDate() === targetDate.getDate() &&
            d.getMonth() === targetDate.getMonth() &&
            d.getFullYear() === targetDate.getFullYear()
        );
    };

    const completedTodayTasks = (tasks || []).filter(
        (task) =>
            task.status === TaskStatus.COMPLETED &&
            (isSameDay(task.dueDate) || isSameDay(task.updated_at) || isSameDay(task.created_at))
    );

    const formatDateTime = (dateStr?: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

  return (
      <Page className="relative">
          <Navbar
            title="Minhas Tarefas"
            left={
              <Link
                  onClick={onOpenProfile}
                  className="text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer"
              >
                  Perfil
              </Link>
            }
            right={
              <div>
                  <ThemeToggle />
              </div>
            }
          />

          <div className="flex items-center justify-end mx-4 mt-3 mb-1">
              <NetworkStatusBadge userId={userId} />
          </div>

          <div className="mx-4 mt-2 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                      </span>
                      <div>
                          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                              Tarefas Feitas Hoje
                          </h2>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {completedTodayTasks.length === 0
                                  ? "Nenhuma tarefa concluída hoje"
                                  : completedTodayTasks.length === 1
                                      ? "1 tarefa concluída hoje"
                                      : `${completedTodayTasks.length} tarefas concluídas hoje`}
                          </p>
                      </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                      {completedTodayTasks.length} {completedTodayTasks.length === 1 ? 'feita' : 'feitas'}
                  </span>
              </div>

              {completedTodayTasks.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                      {completedTodayTasks.map((task) => (
                          <div
                              key={`done-${task.id}`}
                              className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-100 dark:border-zinc-700/60 text-xs"
                          >
                              <div className="flex items-center gap-2 truncate">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate line-through">
                                      {task.title}
                                  </span>
                              </div>
                              {task.dueDate && (
                                  <span className="text-2xs text-zinc-400 dark:text-zinc-500 shrink-0 ml-2">
                                      {new Date(task.dueDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                              )}
                          </div>
                      ))}
                  </div>
              )}
          </div>

          <div className="my-4 mx-4 border-t border-zinc-200 dark:border-zinc-800" />

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
                        className={`cursor-pointer transition-all duration-150 border-l-[3px] ${
                            task.status === TaskStatus.COMPLETED
                                ? 'opacity-60 hover:opacity-90 border-l-transparent bg-zinc-50/50 dark:bg-zinc-900/30'
                                : 'opacity-100 border-l-emerald-500 dark:border-l-emerald-400'
                        }`}
                        title={
                            <div className="flex items-center gap-2 philosopher-regular">
                                <span className={task.status === TaskStatus.COMPLETED
                                    ? 'line-through text-zinc-400 dark:text-zinc-500'
                                    : 'font-medium text-zinc-900 dark:text-zinc-100'}>
                                    {task.title}
                                </span>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        void handleDeleteTask(task.id);
                                    }}
                                    className="text-zinc-400 hover:text-red-500 transition-colors p-0.5 rounded cursor-pointer"
                                    title="Excluir tarefa"
                                    aria-label="Excluir tarefa"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        }
                        subtitle={
                            task.dueDate ? (
                                <span className={`text-xs flex items-center gap-1 mt-0.5 ${
                                    task.status === TaskStatus.COMPLETED
                                        ? 'text-zinc-400 dark:text-zinc-500 line-through'
                                        : 'text-zinc-500 dark:text-zinc-400'
                                }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    {formatDateTime(task.dueDate)}
                                </span>
                            ) : undefined
                        }
                        text={task.description ? (
                            <span className={task.status === TaskStatus.COMPLETED
                            ? 'text-zinc-400 dark:text-zinc-500 text-xs'
                            : 'text-zinc-600 dark:text-zinc-300 text-xs'
                            }>
                                {task.description}
                            </span>
                        ) : undefined}
                        onClick={() => openEditTaskForm(task)}
                        media={
                          <div onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                checked={task.status === TaskStatus.COMPLETED}
                                onChange={() => { void handleToggleCompleted(task.id, task.status); }}
                              />
                          </div>
                        }
                        after={
                            <span className={`text-2xs px-1.5 pt-0.5 rounded-sm shrink-0 ${
                                !task.synced
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                            }`}>
                                {!task.synced ? 'Não sincronizada' : 'Sincronizada'}
                            </span>
                        }
                      />
                  ))}
              </List>
          )}

          <Fab
            className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-40 bg-emerald-600"
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
