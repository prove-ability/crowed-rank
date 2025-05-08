import { useState } from "react";
import { supabase } from "domains/common/utils/supabase";

export function MagicLinkLogin() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) setMessage(error.message);
    else setMessage("📩 이메일로 로그인 링크를 보냈습니다.");

    setLoading(false);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "전송 중..." : "로그인 링크 받기"}
      </button>
      <p>{message}</p>
    </div>
  );
}
