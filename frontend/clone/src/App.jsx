import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  return (
    <div className="container">
      <header className="header">
        <Header />
      </header>
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main">
        <Main />
      </main>
    </div>
  );
}

export default App;
