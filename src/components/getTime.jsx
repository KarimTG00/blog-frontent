import { ReceiptRussianRubleIcon } from "lucide-react";
import { useEffect } from "react";
import { getTime } from "./date";

export default function Time(el) {
  useEffect(() => {
    const Interval = setInterval(() => {
      getTime(el.createdAt);
    }, 1000);
    return () => clearInterval(Interval);
  });
  return <div></div>;
}
