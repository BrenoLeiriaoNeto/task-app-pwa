import {useState} from "react";
import {Block, Button, Link, Navbar, Page, Popup} from "konsta/react";

interface QuestionnairePageProps {
    onBack: () => void;
}

const questions = [
    {
        question: "O início da computação",
        answer: "A história começa bem antes das telas, com calculadoras mecânicas e máquinas de tear programáveis." +
            " O grande salto ocorreu durante a Segunda Guerra Mundial com gigantes como o ENIAC e os trabalhos de criptografia de Alan Turing." +
            " Eram máquinas que ocupavam salas inteiras, funcionavam à base de válvulas e cartões perfurados, e focavam puramente em poder de cálculo bruto." +
            " A \"usabilidade\" era inexistente: apenas matemáticos e engenheiros altamente treinados conseguiam operá-los.",
    },
    {
        question: "A internet e comunicação",
        answer: "Nascida como ARPANET durante a Guerra Fria para interligar bases militares e universidades, a rede revolucionou a forma como o mundo se conecta." +
            " Nos anos 90, a criação da World Wide Web (WWW) tornou a internet visual e acessível ao público." +
            " O modelo de comunicação migrou das cartas e telefones fixos para os e-mails, evoluindo rapidamente para mensageiros instantâneos e, hoje, redes sociais onipresentes." +
            " A internet pulverizou barreiras geográficas e estabeleceu a comunicação global em tempo real como o padrão da sociedade.",
    },
    {
        question: "A influência da Apple na evolução e usabilidade das máquinas",
        answer: "A Apple foi a principal responsável por tirar o computador dos laboratórios e colocá-lo na casa das pessoas comuns." +
            " Com o lançamento do Macintosh em 1984, popularizou-se o uso do mouse e da interface gráfica comercialmente." +
            " A filosofia de Steve Jobs era que a tecnologia precisava ser intuitiva e centrada no ser humano." +
            " Em 2007, a Apple repetiu a revolução com o iPhone, abolindo teclados físicos em favor do \"multi-touch\", tornando a navegação através de toques e gestos o novo padrão da indústria.",
    },
    {
        question: "GUI e Modelos Mentais",
        answer: "GUI (Graphical User Interface, ou Interface Gráfica do Usuário) foi o que substituiu as antigas telas pretas de código (onde você precisava digitar comandos complexos)." +
            " Para que o público geral entendesse como usar um computador sem manuais extensos, os designers utilizaram modelos mentais — metáforas do mundo físico." +
            " É por isso que o sistema possui uma \"Área de Trabalho\", onde os arquivos são guardados em \"Pastas\" e o que não serve mais vai para a \"Lixeira\"." +
            " Isso reduziu drasticamente a carga cognitiva, permitindo que a intuição guiasse o uso.",
    },
    {
        question: "A importância de UX e UI para o usuário",
        answer: "UI (User Interface) diz respeito à superfície visual: botões, cores, tipografia e layout da tela." +
            " Já a UX (User Experience) trata da jornada e da sensação do usuário: o aplicativo resolve o problema dele sem frustrações?" +
            " É rápido e lógico? Juntos, eles determinam o sucesso ou fracasso de um produto digital." +
            " Uma plataforma com visual incrível (boa UI) mas com fluxos confusos e lentos (má UX) fará o usuário abandonar o uso rapidamente.",
    },
    {
        question: "A importância de aplicativos de simples uso no século XXI",
        answer: "Vivemos na era da economia da atenção. Com a vida acelerada e o excesso de informações, aplicativos de uso simples (como Uber, iFood ou WhatsApp) dominam porque removem qualquer atrito entre o usuário e o objetivo final." +
            " A regra moderna é: se um aplicativo precisa de um longo tutorial para ser utilizado, ele falhou em seu design." +
            " A simplicidade economiza o recurso mais valioso da atualidade, que é o tempo do usuário.",
    },
    {
        question: "A evolução da usabilidade nos últimos 10 anos",
        answer: "Na última década, o foco de desenvolvimento migrou definitivamente de \"Desktop First\" para \"Mobile First\" (fazer primeiro para o celular)." +
            " A usabilidade abandonou menus densos e cliques precisos em favor da navegação por gestos (arrastar, rolar infinitamente)." +
            " Além disso, houve um avanço gigantesco na acessibilidade (modo escuro, leitores de tela nativos) e na invisibilidade da interface," +
            " com a integração fluida de comandos de voz (Siri, Alexa) e biometria (FaceID) para agilizar o acesso.",
    },
    {
        question: "A evolução de uso de aplicativos móveis nos últimos 10 anos",
        answer: "Há dez anos, os aplicativos móveis eram vistos predominantemente como ferramentas de entretenimento casual, redes sociais básicas e utilitários limitados." +
            " Hoje, o smartphone se tornou o controle remoto da vida moderna. Os apps evoluíram para sistemas ecossistêmicos (os \"Super Apps\", que centralizam banco, compras, transporte e chat)." +
            " O celular substituiu fisicamente a carteira, o mapa, o banco e a câmera fotográfica, criando um cenário de hiperdependência tecnológica.",
    },
];

export default function QuestionnairePage({ onBack }: QuestionnairePageProps) {
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);

    const selectedQuestion =
        selectedQuestionIndex !== null ? questions[selectedQuestionIndex] : null;

    return (
        <Page className="bg-neutral-900 text-white">
            <Navbar
                title="Questionário"
                left={
                    <Link onClick={onBack} className="text-emerald-500 font-medium">
                        Voltar
                    </Link>
                }
            />

            <Block className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-xl px-4">
                    {questions.map((item, index) => (
                        <Button
                            key={item.question}
                            onClick={() => setSelectedQuestionIndex(index)}
                            className="min-h-20 bg-emerald-600 text-white normal-case leading-snug"
                        >
                            {item.question}
                        </Button>
                    ))}
                </div>
            </Block>

            <Popup
                opened={selectedQuestion !== null}
                onBackdropClick={() => setSelectedQuestionIndex(null)}
            >
                <Page className="bg-neutral-900 text-white">
                    <Navbar
                        title="Resposta"
                        right={
                            <Link
                                onClick={() => setSelectedQuestionIndex(null)}
                                className="text-emerald-500 font-medium"
                            >
                                Fechar
                            </Link>
                        }
                    />

                    {selectedQuestion && (
                        <Block className="space-y-4">
                            <h2 className="text-xl font-bold text-white">
                                {selectedQuestion.question}
                            </h2>

                            <p className="text-neutral-300 leading-relaxed">
                                {selectedQuestion.answer}
                            </p>
                        </Block>
                    )}
                </Page>
            </Popup>
        </Page>
    );
}