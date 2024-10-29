import  { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import { AppRoutes } from "./AppRoutes";
import AddInventory from "./AddInventory";
import Dashboard from "./Dashboard";
import InventoryList from "./InventoryList";
import List from "./List";

const App = () => {
  useEffect(() => {
    // Initialize users in local storage if not already present
    const initialUsers = [
      { username: "deptManager", password: "dept123", role: "Department Manager" },
      { username: "storeManager", password: "store123", role: "Store Manager" },
    ];

    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(initialUsers));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.HOME} element={<Login />} />
        <Route path={AppRoutes.ADDINVENTORY} element={<AddInventory />} />
        <Route path={AppRoutes.INVENTORYLIST} element={<InventoryList />} />
        <Route path={AppRoutes.DASHBOARD} element={<Dashboard/>}/>
        <Route path={AppRoutes.LIST} element={<List/>}/>
      </Routes>
    </Router>
  );
};

export default App;
