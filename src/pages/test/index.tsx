import useArray from "../../hooks/useArray";
import useFetch from "../../hooks/useFetch";
function Test() {
  return (
    <>
      <h2> Test Hook</h2>
      <div>
        <h3>use Fetch</h3>
        <FetchComponent />
      </div>
      <div>
        <h3>use array</h3>
        <ArrayComponent />
      </div>
    </>
  );
}

interface User {
  id: number;
  name: string;
  email: string;
}
const FetchComponent = () => {
  const { data, loading, error } = useFetch<User>(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h1>{data?.name}</h1>;
};
const ArrayComponent = () => {
  const { array, push, removeByIndex, clear } = useArray<string>([
    "React",
    "TypeScript",
  ]);
  return (
    <div>
      <ul>
        {array.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => removeByIndex(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => push("Next.js")}>Add Next.js</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
};
export default Test;
