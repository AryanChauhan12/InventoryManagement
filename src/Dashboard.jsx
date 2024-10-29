import { useNavigate } from "react-router-dom";
import add from "../src/image/add.png";
import approve from "../src/image/approve.png";
import backgroundImage from "../src/image/bgimage.png"; 
import list from "../src/image/list.png"
import { AppRoutes } from "./AppRoutes";

const Dashboard = () => {
  const navigate = useNavigate();

  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    margin: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.2s",
    width: "200px",
    height: "200px",
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
        flexWrap: "wrap",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{ ...cardStyle, backgroundColor: "#f8f9fa" }}
        onClick={() => handleCardClick(AppRoutes.ADDINVENTORY)}
      >
        <img src={add} alt="add" height={100} />
        <h3 style={{color:"#ad5389"}}>Add Inventory</h3>
      </div>

      <div
        style={{ ...cardStyle, backgroundColor: "#e9ecef" }}
        onClick={() => handleCardClick(AppRoutes.INVENTORYLIST)}
      >
        <img src={approve} alt="approve" height={100} />
        <h3 style={{color:"#ad5389"}}>Approve Inventory</h3>
      </div>

      <div
        style={{ ...cardStyle, backgroundColor: "#e9ecef" }}
        onClick={() => handleCardClick(AppRoutes.LIST)}
      >
        <img src={list} alt="approve" height={100} />
        <h3 style={{color:"#ad5389"}}> Inventory List</h3>
      </div>
    </div>
  );
};

export default Dashboard;
