import { useFormStatus } from "react-dom";

function Register() {
  return <>Register</>;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "submitting..." : "save"}
    </button>
  );
};

// const SubmitForm = () => {
//   const { saveUser } = useFormStatus();
//   return (
//     <form action={saveUser}>
//       <SubmitButton />
//     </form>
//   );
// };
export default Register;
