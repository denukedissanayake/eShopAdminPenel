import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode, { JwtPayload } from "jwt-decode";

import "./login.css";
import { loginAdmin } from './data/login';
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { user, setUser } = useAuth();
  const navigation = useNavigate()

  const login = async () => {
    const { data } = await loginAdmin(email, password);

    if (data.accesToken) {
      const userDetails = jwtDecode<JwtPayload>(data.accesToken);
      setUser({
        ...userDetails
      })
      navigation("/");
    } else {
      setError(true);
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-page">
        <div className="login-page-item">
          <label className="login-page-item-label">Enter Email</label>
          <input
            className="login-page-item-input"
            type='email'
            placeholder='Email'
            onInput={(e: React.KeyboardEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="login-page-item">
          <label className="login-page-item-label">Enter Password</label>
          <input
            className="login-page-item-input"
            type='password'
            placeholder='Password'
            onInput={(e: React.KeyboardEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button
          disabled={!email || !password}
          className="login-page-item-button"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login