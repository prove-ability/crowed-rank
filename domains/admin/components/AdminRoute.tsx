import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { supabase } from "domains/common/utils/supabase";

export function AdminRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const session = await supabase.auth.getSession();
      const userId = session.data.session?.user?.id;

      const { data } = await supabase
        .from("admins")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (!data) navigate("/unauthorized");
    };

    verify();
  }, []);

  return <>{children}</>;
}
