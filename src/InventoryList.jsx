import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";
import nodata from "../src/image/nodata.png"

const InventoryList = () => {
  const [pendingInventory, setPendingInventory] = useState([]);

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    const pendingItems = storedInventory.filter((item) => item.status === "Pending");
    setPendingInventory(pendingItems);
  }, []);

  const handleApprove = (index) => {
    const updatedInventory = [...pendingInventory];
    updatedInventory[index].status = "Approved";

    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    const allInventory = storedInventory.map((item) =>
      item.productId === pendingInventory[index].productId ? { ...item, status: "Approved" } : item
    );
    localStorage.setItem("inventory", JSON.stringify(allInventory));
    setPendingInventory(updatedInventory.filter(item => item.status === "Pending"));
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#ad5389", textAlign: "center" }}>
        Pending Inventory List
      </Typography>
      <br/>
      <br/>
      {pendingInventory.length > 0 ? (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Product</strong></TableCell>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Vendor</strong></TableCell>
                <TableCell><strong>MRP</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Batch</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingInventory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>₹{item.mrp}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {item.batchNum} ({item.batchDate})
                  </TableCell>
                  <TableCell>
                  <Button
                   variant="contained"
                  sx={{
                  backgroundColor: "#ad5389",
                  color: "#fff",
                  "&:hover": {
                  backgroundColor: "#9c4b79", 
                  },
                  }}                   
                  onClick={() => handleApprove(index)}
                  >
                  Approve
                   </Button>
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
          No pending items to display.
        </Typography>
      </Box>
      )}
    </Box>
  );
};

export default InventoryList;
