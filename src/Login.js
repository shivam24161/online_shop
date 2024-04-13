import { Button } from "@mui/material";
import { useContext, useState } from "react";
import "./Login.css";
import { userContext } from "./Mycontext";
import { Navigate } from "react-router-dom";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const obj = useContext(userContext);
  const userLogin = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/users");
    const result = await response.json();
    result.map((i) => {
      if (i.email === email && i.password === pass) {
        obj.setLoginFlag(true);
        obj.setUserInfo(i.name);
      } else {
        setMsg("Invalid login details...");
        setOpen(true);
      }
      return 1;
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      {obj.loginFlag && <Navigate to="/" replace={true} />}
      <div className="login-div">
        <p className="para">Email:</p>
        <input
          type="text"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="para">Password:</p>
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <p className="para">
          <Button variant="outlined" onClick={userLogin}>
            Login
          </Button>
        </p>
        <p>Note: Use following details for login which are mentioned in API</p>
        <p>email-john@mail.com && password-changeme</p>
        <p>email-maria@mail.com && password-12345</p>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
    </>
  );
};

export default Login;
