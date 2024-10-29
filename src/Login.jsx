import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AppRoutes } from "./AppRoutes";
import loginImage from "../src/image/login.png";
import { InputAdornment, TextField } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values, { setSubmitting, setFieldError }) => {
    const { username, password } = values;

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert(`Login successful! Welcome, ${user.role}`);
      if (user.role === "Department Manager") {
        navigate(AppRoutes.ADDINVENTORY);
      } else if (user.role === "Store Manager") {
        navigate(AppRoutes.DASHBOARD);
      } else {
        alert("You are logged in, but don't have access to specific pages.");
      }
    } else {
      setFieldError("username", "Invalid username or password.");
      setFieldError("password", "Invalid username or password.");
    }
    setSubmitting(false);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: `url(${loginImage})`, 
      backgroundSize: "cover",
      backgroundPosition: "center", 
    }}>
      <div style={{
        maxWidth: "400px",
        padding: "50px",
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        borderRadius: "15px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{color:"#ad5389"}}>Login</h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={{ marginBottom: "10px" }}>
                <label style={{color:"black",fontSize:"20px"}}>Username<span style={{color:"red"}}>*</span></label>
                <Field
                  as={TextField}
                  size="small"
                  type="text"
                  name="username"
                  helperText={ <ErrorMessage name="username" component="div" style={{ color: "red" }} />}
                  style={{ width: "100%",  marginTop: "5px",borderRadius:"7px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                />
                
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{color:"black",fontSize:"20px"}}>Password<span style={{color:"red"}}>*</span></label>
                <Field
                  as={TextField}
                  size="small"
                  type="password"
                  name="password"
                  helperText={ <ErrorMessage name="password" component="div" style={{ color: "red" }} />}
                  style={{ width: "100%", marginTop: "5px",borderRadius:"7px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                />
                <ErrorMessage name="password" component="div" style={{ color: "red" }} />
              </div>
              <br/>
              <button type="submit" disabled={isSubmitting} style={{ paddingLeft: "10px", width: "100%", backgroundColor:"#ad5389" ,color:"white" }}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
