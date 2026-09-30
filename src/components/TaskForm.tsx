import {useEffect, useState} from "react";
import {Block, Button, Link, List, ListInput, Sheet, Toolbar} from "konsta/react";

interface TaskFormData {
    id?: string;
    title: string;
    description: string;
}

interface TaskFormProps {
    opened: boolean;
    onClose: () => void;
    initialData?: TaskFormData | null;
    onSubmit: (data: { title: string; description: string; id?: string }) => void;
}

export function TaskForm({opened, onClose, initialData, onSubmit}: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (opened) {
            setTitle(initialData?.title || '');
            setDescription(initialData?.description || '');
            setError('');
        }
    }, [opened, initialData]);

    const handleSubmit = () => {
        if (!title.trim()) {
            setError('Título da tarefa é obrigatório');
            return;
        }

        onSubmit({
            title: title.trim(),
            description: description.trim(),
            id: initialData?.id
        });
        onClose();
    };

    return (
        <Sheet
            className="pb-safe"
            opened={opened}
            onBackdropClick={onClose}
        >
            <Toolbar top className="z-50">
                <div className="left font-semibold text-lg px-4">
                    {initialData ? "Editar tarefa" : "Nova tarefa"}
                </div>
                <div className="right">
                    <Link
                        onClick={onClose}
                        className="text-emerald-600 font-medium"
                    >
                        Fechar
                    </Link>
                </div>
            </Toolbar>

                <List className="my-2">
                    <ListInput
                        label="Título"
                        type="text"
                        placeholder="O que precisa ser feito?"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (error) setError('');
                        }}
                    />
                    <ListInput
                        label="Descrição"
                        type="textarea"
                        placeholder="Descreva o que precisa ser feito"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        inputClassName="h-24 resize-none"
                    />
                </List>

                {error && (
                    <Block className="text-red-500 text-sm mt-0 mb-4 px-4">
                        {error}
                    </Block>
                )}

                <Block className="mt-4">
                    <Button onClick={handleSubmit} className="bg-emerald-600">
                        Salvar tarefa
                    </Button>
                </Block>
        </Sheet>
    )
}