import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get("status");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border rounded-xl p-8 max-w-md text-center space-y-4">
        {status === "success" ? (
          <>
            <h2 className="text-green-600 font-bold text-xl">
              Email verified successfully ✅
            </h2>
            <p className="text-sm text-muted-foreground">
              You can now login to your account.
            </p>
            <Button onClick={() => navigate("/auth")}>
              Go to Login
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-red-600 font-bold text-xl">
              Verification failed ❌
            </h2>
            <p className="text-sm text-muted-foreground">
              The verification link is invalid or expired.
            </p>
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Back to Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
