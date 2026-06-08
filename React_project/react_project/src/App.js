import { DateTime } from "./components/Lab1/Lab1_task1_1";
import { StocksTable } from "./components/Lab1/Lab1_task2";
import { TodoList } from "./components/introduce/ToDo";
import { Chessboard } from "./components/Lab1/Lab1_task3";
import { Clock } from "./components/Lab2/Lab2_1";
import { JobMenu } from "./components/Lab2/Lab2_2,";
import { EmailForm } from "./components/Lab3/Lab3_1";
import { ProductCatalog } from "./components/Lab3/Lab3_2";
import { ToDoList } from "./components/Lab4/Lab4";
import { ContactForm } from "./components/Lab5/Lab5";

function App() {
  return (
    <>
      <h1>Hello, world!</h1>

      {/*-------INTRODUCE---------- */}

      { <TodoList /> }      

      {/* -------LAB1---------- */}

      { <DateTime/> }
      { <StocksTable/> }
      { <Chessboard/> }
      
      {/* -------LAB2---------- */}
      
      <h2>Часы (24h, UTC+3)</h2>
      <Clock format="24" timezone="+3:00" />
      <h2>Часы (12h, UTC-4)</h2>
      <Clock format="12" timezone="-4:00" />

      <JobMenu/>

      {/* ------LAB3----------- */}

      <EmailForm />
      <ProductCatalog />

      {/* ------LAB4----------- */}

      <ToDoList/>

      {/* ------LAB5----------- */}

      <ContactForm/>
    </>
  );
}

export default App;
