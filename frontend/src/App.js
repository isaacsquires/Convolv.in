import './App.css';
import Store from './Store'
import ModelTable from './components/modelTable/modelTable';
import TopBar
 from './components/topBar/topBar';
function App() {
  return (
    <div className="App">
      <Store>
        <TopBar />
        <ModelTable />
      </Store>
    </div>
  );
}

export default App;
