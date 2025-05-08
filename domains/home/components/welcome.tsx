import { useEffect } from "react";

import { AdminLogin } from "domains/admin/components";
import { supabase } from "domains/common/utils";

export function Welcome() {
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;

      const { data, error } = await supabase
        .from("admins")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (!data) {
        alert("관리자만 접근할 수 있습니다");
        // 이동 차단 or 로그아웃 처리
      } else {
        console.log("✅ 관리자입니다");
      }
    };

    checkAdmin();
  }, []);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <AdminLogin />
    </main>
  );
}
