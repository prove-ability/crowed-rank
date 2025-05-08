import { useState } from "react";
import { supabase } from "domains/common/utils/supabase";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        type="password"
      />
      <button onClick={handleLogin} disabled={loading}>
        로그인
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
