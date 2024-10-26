import { useState } from "react";
import Button from "./Button";

export default function BugFinder() {
  const [number, setNumber] = useState(0);
  return <Button type="cancel">{number}</Button>;
}
