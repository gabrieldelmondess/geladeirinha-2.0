import React, { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../geli/lib/supabase";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Erro no Cadastro:", error);
        return;
      }

      console.log("Cadastro Realizado:", data);
      router.push("/login"); 
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
      </div>
      )
    }