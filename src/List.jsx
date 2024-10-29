import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import nodata from "../src/image/nodata.png";

const List = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All"); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    setInventory(storedInventory);
    setFilteredInventory(storedInventory);
  }, []);

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredInventory(inventory);
    } else {
      const filteredItems = inventory.filter(item => item.status === statusFilter);
      setFilteredInventory(filteredItems);
    }
  }, [statusFilter, inventory]);

  const handleDelete = (index) => {
    const updatedInventory = [...inventory];
    updatedInventory.splice(index, 1);
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
    setInventory(updatedInventory);
    alert("Item deleted successfully!");
  };

  const handleEdit = (index) => {
    const selectedItem = inventory[index];
    navigate("/AddInventory", { state: { item: selectedItem, index } });
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#ad5389", textAlign: "center" }}>
        Inventory List
      </Typography>
       <br/>
      <Box sx={{ display: "flex" }}>
        <FormControl  fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            fullWidth
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredInventory.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>MRP</TableCell>
                <TableCell>Batch</TableCell> 
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInventory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>{item.mrp}</TableCell>
                  <TableCell>{`${item.batchNum} (${item.batchDate})`}</TableCell> 
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell align="center">
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}> 
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#ad5389", color: "white" }}
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh", 
        }}
      >
        <img src={nodata} alt="No data" style={{  marginBottom: "16px" }} />
        <Typography variant="body1" color="textSecondary" align="center">
          No  items to display.
        </Typography>
      </Box>
      )}
    </Box>
  );
};

export default List;
