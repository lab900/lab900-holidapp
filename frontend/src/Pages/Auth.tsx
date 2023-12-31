import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@carbon/react";

export const Auth = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <div
      className="login"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <video width="200px" height="700px" autoPlay loop muted>
        <source src="dancing.mp4" type="video/mp4"/>
    </video>
      <div className="login__container" style={{marginLeft: '20px'}}>
        <h1 style={{ marginBottom: "10px" }}>Lab900 - Holidays</h1>
        <Button onClick={signInWithGoogle}>Login with Google</Button>
      </div>
    </div>
  );
};
