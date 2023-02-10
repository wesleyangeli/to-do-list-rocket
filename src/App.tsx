import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import { ClipboardText, PlusCircle, Trash } from "phosphor-react";
import { v4 as uuid4 } from "uuid";

interface Tarefas {
  id: string;
  descricao: string;
  concluida: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Tarefas[]>([]);
  const [writeTask, setWriteTask] = useState("");
  const [count, setCount] = useState({
    concluidos: 0,
    criadas: 0,
  });

  function handleWriteTask(event: ChangeEvent<HTMLInputElement>) {
    setWriteTask(event.target.value);
  }

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (writeTask) {
      const novaTarefa: Tarefas = {
        id: uuid4(),
        descricao: writeTask,
        concluida: false,
      };

      setTasks([...tasks, novaTarefa]);

      setCount((prevCount) => ({
        ...prevCount,
        criadas: prevCount.criadas + 1,
      }));
      setWriteTask("");
    }
  }

  function handleConcluded(taskId: string) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, concluida: !task.concluida } : task
      )
    );
  }

  function handleDeleteTask(taskId: string) {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setCount((prevCount) => ({
      ...prevCount,
      criadas: prevCount.criadas - 1,
    }));
  }

  function countCompletedTasks(tasks: Tarefas[]) {
    return tasks.reduce((count, task) => {
      return task.concluida ? count + 1 : count;
    }, 0);
  }

  return (
    <>
      <Header></Header>
      <div className={styles.wrapper}>
        <main>
          <form onSubmit={handleAddTask}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Adicione uma nova tarefa"
                value={writeTask}
                onChange={handleWriteTask}
              />
              <button type="submit">
                Criar <PlusCircle size={20} />
              </button>
            </div>
          </form>
          <section className={styles.info}>
            <div className={styles.criadas}>
              <p>
                Tarefas Criadas<span>{count.criadas}</span>
              </p>
            </div>
            <div className={styles.concluidas}>
              <p>
                Concluídas
                <span>
                  {countCompletedTasks(tasks)} de {count.criadas}
                </span>
              </p>
            </div>
          </section>
          <section>
            {!count.criadas ? (
              <div className={styles.emptyTasks}>
                <ClipboardText size={56} />
                <p className={styles.emptyTasksText}>
                  Você ainda não tem tarefas cadastradas
                </p>
                <p className={styles.emptyTasksText}>
                  Crie tarefas e organize seus itens a fazer
                </p>
              </div>
            ) : (
              <ul className={styles.tarefas}>
                {tasks.map(({ id, concluida, descricao }) => (
                  <li key={id} className={styles.tarefa}>
                    <input
                      type="checkbox"
                      id={id}
                      onChange={() => handleConcluded(id)}
                      checked={concluida}
                    />
                    <p
                      style={
                        concluida
                          ? { textDecoration: "line-through" }
                          : { textDecoration: "none" }
                      }
                    >
                      {descricao}
                    </p>
                    <span
                      className={styles.delete}
                      id={id}
                      onClick={() => handleDeleteTask(id)}
                    >
                      <Trash className={styles.svg} size={20} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
