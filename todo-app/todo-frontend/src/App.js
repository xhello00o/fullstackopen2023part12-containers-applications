import './App.css';
import TodoView from './Todos/TodoView'

function App() {

  console.log(process.env.NODE_ENV,'node_env')
  
  return (
    <div className="App">
      <TodoView />
    </div>
  );
}

export default App;
