import { useState } from "react";
const useArray = <T>(initialArray: T[]) => {
  const [array, setArray] = useState<T[]>(initialArray);
  const push = (item: T) => setArray((prev) => [...prev, item]);
  const removeByIndex = (index: number) =>
    setArray((prev) => prev.filter((_, i) => i !== index));
  const clear = () => setArray([]);
  return { array, push, removeByIndex, clear };
};
export default useArray;
