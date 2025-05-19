
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { Sprout, ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") as "parent" | "child" || "parent";

  useEffect(() => {
    if (!role || (role !== "parent" && role !== "child")) {
      navigate("/");
    }
  }, [role, navigate]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-sprout-purple/10 p-6">
      <button
        className="absolute top-6 left-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        onClick={handleBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sprout className="h-8 w-8 text-sprout-purple" />
          <h1 className="text-2xl font-bold">Sprout Pay Together</h1>
        </div>
      </div>

      <AuthForm type="login" role={role} />
      
      <div className="mt-8">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a
            href={`/signup?role=${role}`}
            className="text-sprout-purple hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
