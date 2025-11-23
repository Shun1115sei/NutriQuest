import { useEffect, useState } from "react";
import Splash from "~/components/splash";
import Dashboard2 from "./dashboard2";

export default function Page() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashFadingOut, setsplashFadingOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setsplashFadingOut(true), 2200); // Start fade after 1s
    const timer2 = setTimeout(() => setSplashVisible(false), 3000); // Remove from DOM after fade
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Option 1: If Splash accepts className prop
  return (
    <>
      {splashVisible ? (
        <div className={`transition-opacity duration-800 ${splashFadingOut ? "opacity-0" : "opacity-100"}`}>
          <Splash />
        </div>
      ) : null}
      <div className={`transition-opacity duration-800 ${splashFadingOut ? "opacity-100" : "opacity-0"}`}>
        <Dashboard2 />
      </div>
    </>
  )
}

