import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PlayArrow } from "@mui/icons-material";

import FancyButton from "../components/ui/FancyButton";
import ButtonText from "../components/ui/ButtonText";

export default function Home() {
  const [signedIn, setSignedIn] = useState("Loading");

  let navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) setSignedIn(user);
      else setSignedIn("signedOut");
    });
  }, []);

  if (signedIn === "Loading") {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  } else if (signedIn === "signedOut") {
    return (
      <div>
        <h3>You must sign in</h3>
        <FancyButton onClick={() => navigate("/account")}>Sign In</FancyButton>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Welcome, {signedIn.displayName}</h3>
        <FancyButton onClick={() => navigate("/game")}>
          <ButtonText Icon={PlayArrow} Name="Play Game" />
        </FancyButton>
      </div>
    );
  }
}
