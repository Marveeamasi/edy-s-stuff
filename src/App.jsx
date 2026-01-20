import "./style.css";
import { ProductFormWithLibrary } from "./components/ProductFormWithLibrary";
import { ProductFormNoLibrary } from "./components/ProductFormWithNoLibrary";

function App() {

  return (
    <div className="app">
      <h1>Product Creation Application</h1>
      <div className="forms-wrapper">
        <ProductFormNoLibrary />
        <ProductFormWithLibrary />
      </div>
    </div>
  );
}

export default App;
