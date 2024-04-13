import "./Header.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import Drawer from "@mui/material/Drawer";
import { userContext } from "./Mycontext";
import { Delete } from "@mui/icons-material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import LogoutIcon from "@mui/icons-material/Logout";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Header = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const obj = React.useContext(userContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // Total Price
  const total = obj.cartItems.reduce((acc, curr) => {
    acc = acc + curr.total_price;
    return acc;
  }, 0);

  // Delete Cart Item
  const deleteCartItem = (id) => {
    obj.cartItems.splice(id, 1);
    obj.setCartitems([...obj.cartItems]);
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    obj.cartItems.map((i) => {
      if (i.quantity > 1 && i.id === id) {
        i.quantity = i.quantity - 1;
        i.total_price = i.price * i.quantity;
      }
      return 1;
    });
    obj.setCartitems([...obj.cartItems]);
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    obj.cartItems.map((i) => {
      if (i.id === id) {
        i.quantity = i.quantity + 1;
        i.total_price = i.price * i.quantity;
      }
      return 1;
    });
    obj.setCartitems([...obj.cartItems]);
  };

  // Empty Cart
  const emptyCart = () => {
    obj.setCartitems([]);
  };

  // Checkout
  const checkout = () => {
    if (obj.loginFlag) {
      setOpen(true);
      obj.setCartitems([]);
    } else {
      setOpen(true);
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 700 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Displaying the cart Items */}
      <div className="empty_cart_div">
        <h1 className="cart_heading">Your Cart Items</h1>
        <div>
          <Button id="empty" variant="outlined" onClick={emptyCart}>
            Empty Cart
          </Button>
        </div>
      </div>
      <hr />
      {obj.cartItems.length > 0 ? (
        <>
          <div className="cart_item_main">
            <div className="cart_item_heading">
              <h4>Id</h4>
              <h4>Image</h4>
              <h4>Price</h4>
              <h4>Quantity</h4>
              <h4>Total Price</h4>
              <h4>Delete</h4>
            </div>
            {obj.cartItems.map((i, index) => {
              return (
                <>
                  <div className="cart_item_sub" key={i}>
                    <div>{index + 1}</div>
                    <div>
                      <img src={i.images[0]} alt="img" className="cart_image" />
                    </div>
                    <div>{i.price}</div>
                    <div>
                      <Button onClick={() => decreaseQuantity(i.id)}>
                        <ArrowDownwardIcon />
                      </Button>
                      {i.quantity}
                      <Button onClick={() => increaseQuantity(i.id)}>
                        <ArrowUpwardIcon />
                      </Button>
                    </div>
                    <div>{i.total_price}</div>
                    <div>
                      <Button onClick={() => deleteCartItem(index)}>
                        <Delete />
                      </Button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="total_div">
            <h2>Total Price: &#8377; {total}</h2>
            <div>
              <Button id="checkout_btn" variant="contained" onClick={checkout}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <img
              src="https://www.scholarswing.in/resources/images/empty-cart.png"
              alt="img"
            />
            <h3 className="empty-cart">Your Cart is Empty...</h3>
          </div>
        </>
      )}
    </Box>
  );
  let mybutton = document.getElementById("myBtn");
  let mybutton1 = document.getElementById("myBtn1");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
      mybutton1.style.display = "block";
    } else {
      mybutton.style.display = "none";
      mybutton1.style.display = "none";
    }
  }
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  // Logout
  const logout=()=>{
    obj.setLoginFlag(false)
    obj.userInfo('')
  }
  return (
    <>
      <button color="inherit" onClick={toggleDrawer("right", true)} id="myBtn1">
        <Badge badgeContent={obj.cartItems.length} color="primary">
          <ShoppingCartTwoToneIcon />
        </Badge>
      </button>
      <button onClick={topFunction} id="myBtn" title="Go to top">
        <NavigationIcon />
      </button>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar id="app_bar">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Shopping Cart</Link>
            </Typography>
            {obj.loginFlag ? (
              <>
                <Button id="loginText">Welcome {obj.userInfo}</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button color="inherit">Login</Button>
                </Link>
              </>
            )}
            <Button color="inherit" onClick={toggleDrawer("right", true)}>
              <Badge badgeContent={obj.cartItems.length} color="primary">
                <ShoppingCartTwoToneIcon />
              </Badge>
            </Button>
            {obj.loginFlag ? <Button id="logout-btn" onClick={logout}><LogoutIcon/></Button>:""}
            <Drawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
            >
              {list("right")}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {!obj.loginFlag ? (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <h3>Please login first !</h3>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </DialogContentText>
          </DialogContent>
        ) : (
          <DialogContent>
            <h2>Order Confirmation:</h2>
            <DialogContentText id="alert-dialog-slide-description">
              <h3>Thank You , Your order has been successfully placed!</h3>
            </DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
export default Header;
