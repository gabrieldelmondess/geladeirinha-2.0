import React, { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
  
    const handleLogin = async () => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
  
        if (error) {
          console.error("Login error:", error);
          return;
        }
  
        console.log("Login successful:", data);
        router.push("/"); // Replace with your home page route
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
  
    return (
      <div>
        <h1>Login</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };
  
  export default LoginPage;