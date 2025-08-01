import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    window.location.replace("/dashboard/");
  }, []);

  return null; // Or a loader/spinner/message if you want
}