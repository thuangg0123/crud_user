import "./App.css";
import FormAddNew from "./Components/FormAddNew";
import SearchUser from "./Components/SearchUser";
import Table from "./Components/Table";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <SearchUser />
      <FormAddNew />
      <Table />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
