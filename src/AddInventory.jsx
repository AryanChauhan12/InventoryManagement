import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AddInventory = () => {
  const location = useLocation();
  


  const editingItem = location.state?.item || null;
  const itemIndex = location.state?.index;

  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.role === "Store Manager") {
      setStatus("Approved");
    }
  }, []);

  
  const initialValues = editingItem || {
    productId: "",
    productName: "",
    vendor: "",
    mrp: "",
    batchNum: "",
    batchDate: "",
    quantity: "",
    status,
  };

  const validationSchema = Yup.object().shape({
    productId: Yup.string().required("Product ID is required"),
    productName: Yup.string().required("Product Name is required"),
    vendor: Yup.string().required("Vendor is required"),
    mrp: Yup.number().typeError("MRP must be a number").required("MRP is required"),
    batchNum: Yup.string().required("Batch Number is required"),
    batchDate: Yup.date().required("Batch Date is required"),
    quantity: Yup.number().typeError("Quantity must be a number").required("Quantity is required"),
  });

  const handleSave = (values, { resetForm }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const finalStatus = currentUser && currentUser.role === "Store Manager" ? "Approved" : "Pending";

    const newInventoryItem = {
      ...values,
      mrp: parseFloat(values.mrp),
      quantity: parseInt(values.quantity),
      status: finalStatus,
    };

    const existingInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    
    if (itemIndex !== undefined) {
      existingInventory[itemIndex] = newInventoryItem;
    } else {
      existingInventory.push(newInventoryItem);
    }

    localStorage.setItem("inventory", JSON.stringify(existingInventory));

    alert("Inventory item saved successfully!");
    resetForm();
  
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2 style={{ color: "#ad5389" }}>{editingItem ? "Edit Inventory" : "Add Inventory"}</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: "10px" }}>
              <label style={{color:"black",fontSize:"17px"}}>Product Id <span style={{color:"red"}}>*</span></label>
              <Field
                as={TextField}
                name="productId"
                fullWidth
                variant="outlined"
                size="small"
                helperText={<ErrorMessage name="productId" component="div" style={{ color: "red" }} />}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{color:"black",fontSize:"17px"}}>Product Name <span style={{color:"red"}}>*</span></label>
              <Field
                as={TextField}
                name="productName"
                fullWidth
                variant="outlined"
                size="small"
                helperText={<ErrorMessage name="productName" component="div" style={{ color: "red" }} />}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{color:"black",fontSize:"17px"}}>Vendor <span style={{color:"red"}}>*</span></label>
              <Field
                as={TextField}
                name="vendor"
                fullWidth
                variant="outlined"
                size="small"
                helperText={<ErrorMessage name="vendor" component="div" style={{ color: "red" }} />}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{color:"black",fontSize:"17px"}}>MRP <span style={{color:"red"}}>*</span></label>
              <Field
                as={TextField}
                name="mrp"
                fullWidth
                variant="outlined"
                size="small"
                helperText={<ErrorMessage name="mrp" component="div" style={{ color: "red" }} />}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{color:"black",fontSize:"17px"}}>Batch Number <span style={{color:"red"}}>*</span></label>
              <Field
                as={TextField}
                name="batchNum"
                fullWidth
                variant="outlined"
                size="small"
                helperText={<ErrorMessage name="batchNum" component="div" style={{ color: "red" }} />}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{color:"black",fontSize:"17px"}}>Batch Date <span style={{color:"red"}}>*</span></label>
              <Field
                as={TextField}
                name="batchDate"
                type="date"
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                helperText={<ErrorMessage name="batchDate" component="div" style={{ color: "red" }} />}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{color:"black",fontSize:"17px"}}>Quantity <span style={{color:"red"}}>*</span></label>
              <Field
                as={TextField}
                name="quantity"
                fullWidth
                variant="outlined"
                size="small"
                helperText={<ErrorMessage name="quantity" component="div" style={{ color: "red" }} />}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{color:"black",fontSize:"17px"}}>Status</label>
              <TextField
                value={status}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                style={{ backgroundColor: "#e0e0e0" }}
              />
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#ad5389", color: "white" }}
              disabled={isSubmitting}
            >
              {editingItem ? "Update" : "Save"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddInventory;
