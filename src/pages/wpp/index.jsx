import { useEffect } from "react";

function Wpp() {
  useEffect(() => {
    window.location.href =
      "https://api.whatsapp.com/send/?phone=5511996865057&text=Gostaria%20de%20uma%20solu%C3%A7%C3%A3o&type=phone_number&app_absent=0";
  }, []);

  return null;
}

export default Wpp;
