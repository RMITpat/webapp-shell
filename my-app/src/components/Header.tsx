import { Button, Group } from "@mantine/core";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/page2");
  };
  return (
    <h1
      style={{
        border: "2px solid #000000",
        width: "100%",
        boxSizing: "border-box",
        height: "80px",
        backgroundColor: "white",
        margin: "0",
        padding: "16px",
        fontSize: "40px",
        //position: "fixed",
      }}
    >
      Shipping Calculator
    </h1>
  );
}
