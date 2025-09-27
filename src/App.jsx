import './App.css';
import React, { Component } from "react";
import ImageScroller from "./ImageScroller";
import { BASEURL, callApi, setSession } from './api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      signedInUser: ""
    };

    this.userRegistration = this.userRegistration.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.signin = this.signin.bind(this);
  }

  images = [
    "/Download1.jpeg",
    "/Food1.jpg",
    "/Foodimage.jpg",
    "/Foodimage1.jpg",
    "/Foodimage2.jpg",
  ];

  show = () => {
    alert("Please sign in to search for recipes🍽.");
  };

  showSignin = () => {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");

    popupHeader.innerHTML = "Login";
    signup.style.display = "none";
    signin.style.display = "block";
    popup.style.display = "block";
    username.value = "";
    password.value = "";
  };

  showSignup = () => {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");

    popupHeader.innerHTML = "Create new Account";
    signup.style.display = "block";
    signin.style.display = "none";
    popup.style.display = "block";
  };

  closeSignin = (event) => {
    if (event.target.id === "popup") {
      let popup = document.getElementById("popup");
      popup.style.display = "none";
    }
  };

  userRegistration() {
    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");

    fullname.style.border = "";
    email.style.border = "";
    signuppassword.style.border = "";
    confirmpassword.style.border = "";

    if (fullname.value === "") {
      fullname.style.border = "2px solid red";
      fullname.focus();
      return;
    }
    if (email.value === "") {
      email.style.border = "2px solid red";
      email.focus();
      return;
    }
    if (signuppassword.value === "") {
      signuppassword.style.border = "2px solid red";
      signuppassword.focus();
      return;
    }
    if (confirmpassword.value === "") {
      confirmpassword.style.border = "2px solid red";
      confirmpassword.focus();
      return;
    }
    if (signuppassword.value !== confirmpassword.value) {
      signuppassword.style.border = "2px solid red";
      signuppassword.focus();
      return;
    }

    var data = JSON.stringify({
      fullname: fullname.value,
      email: email.value,
      password: signuppassword.value
    });

    callApi("POST", BASEURL + "users/signup", data, this.getResponse);
  }

  getResponse(res) {
    let resp = res.split('::');
    alert(resp[1]);
    if (resp[0] === "200") {
      document.getElementById("signup").style.display = "none";
      document.getElementById("signin").style.display = "block";
    }
  }

  forgotPassword() {
    username.style.border = "";
    if (username.value === "") {
      username.style.border = "2px solid red";
      username.focus();
      return;
    }
    let url = BASEURL + "users/forgotpassword/" + username.value;
    callApi("GET", url, "", this.forgotPasswordResponse);
  }

  forgotPasswordResponse(res) {
    let data = res.split('::');
    if (data[0] === "200")
      responseDiv.innerHTML = `<br/><br/><label style='color:blue'>${data[1]}</label>`;
    else
      responseDiv.innerHTML = `<br/><br/><label style='color:red'>${data[1]}</label>`;
  }

  signin() {
    username.style.border = "";
    password.style.border = "";
    responseDiv.innerHTML = "";

    if (username.value === "") {
      username.style.border = "2px solid red";
      username.focus();
      return;
    }
    if (password.value === "") {
      password.style.border = "2px solid red";
      password.focus();
      return;
    }

    let data = JSON.stringify({
      email: username.value,
      password: password.value
    });

    callApi("POST", BASEURL + "users/signin", data, this.signinResponse);
  }

  signinResponse = (res) => {
    let rdata = res.split('::');
    if (rdata[0] === "200") {
      setSession("csrid", rdata[1], 1);
      setSession("username", username.value, 1); // ✅ Save username
      this.setState({ signedInUser: username.value });
      window.location.replace("/dashboard");
    } else {
      responseDiv.innerHTML = `<br/><br/><label style="color:red">${rdata[1]}</label>`;
    }
  };

  render() {
    return (
      <div id="container">
        <div id="popup" onClick={this.closeSignin}>
          <div id="popupWindow">
            <div id="popupHeader">Login</div>
            <div id="signin">
              <label className="usernameLabel">Email*</label>
              <input type="text" id="username" />
              <label className="passwordLabel">Password*</label>
              <input type="password" id="password" />
              <div className="forgotpassword">
                Forgot <label onClick={this.forgotPassword}>Password?</label>
              </div>
              <button className="signinButton" onClick={this.signin}>Sign In</button>
              <div className="div1" id='responseDiv'></div>
              <div className="div2">
                Don't have an account? <label onClick={this.showSignup}>SIGN UP NOW</label>
              </div>
            </div>
            <div id='signup'>
              <label>Full Name*</label>
              <input type='text' id='fullname' />
              <label>Email*</label>
              <input type='text' id='email' />
              <label>Password*</label>
              <input type='password' id='signuppassword' />
              <label>Confirm Password*</label>
              <input type='password' id='confirmpassword' />
              <button onClick={this.userRegistration}>Register</button>
              <div>Already have an account? <span onClick={this.showSignin}>SIGN IN</span></div>
            </div>
          </div>
        </div>

        <div id="header">
          <img className="logo" src="/logo.png" alt="" />
          <div className="glow">Food Recipe</div>
          {this.state.signedInUser ? (
            <div className="signedinUser">
              <img className="signinIcon" src="/user1.jpg" alt="" />
              <label className="signinText">
                {this.state.signedInUser}
              </label>
            </div>
          ) : (
            <>
              <img className="signinIcon" src="/user1.jpg" alt="" onClick={this.showSignin} />
              <label className="signinText" onClick={this.showSignin}>
                Sign In
              </label>
            </>
          )}
        </div>

        <div id="content">
          <div className="text1">INDIA'S #1 FOOD RECIPE APP</div>
          <div className="text2">Welcome To Food Recipe<span className='msa'> App! 🍽</span> </div>
          <div className="text3">
            Discover, save, and share delicious recipes with<span className='msa'> a community of food lovers.</span>
          </div>
          <div className="searchBar">
            <input type="text" className="searchText" placeholder='Search by "recipes"' />
            <input type="text" className="searchLocation" placeholder='Search by "location"' />
            <button className="searchButton" onClick={this.show}>
              Search Recipes
            </button>
          </div>
        </div>

        <div id='pageconti'>
          <div className="flex justify-center items-center h-screen bg-gray-200">
            <ImageScroller images={this.images} speed="10s" />
          </div>
          <label className="copyrightText">Copyright @ 2025. All rights reserved.</label>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img className="socialmediaIcon" src="/facebook.png" alt="" /></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img className="socialmediaIcon" src="/twitter.png" alt="" /></a>
          <img className="socialmediaIcon" src="/linkedin.png" alt="" />
        </div>
      </div>
    );
  }
}

export default App;
