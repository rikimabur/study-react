## Some interview questions

1. **How do you type `useState` in React?**

- **Primitive values:** `useState<number>()`, `useState<string>()`, etc.
- **Objects & Arrays:** `useState<MyType>()` or `useState<MyType[]>([])`.
- **Union types:** `useState<string | null>()` for handling multiple possible states.

2. **How do you type event handlers in TypeScript?**

- **Mouse Events:** `React.MouseEvent<T>` → Used for `onClick`, `onMouseEnter`, etc.
- **Keyboard Events:** `React.KeyboardEvent<T>` → Used for `onKeyDown`, `onKeyPress`, etc.
- **Form Events:** `React.FormEvent<T>` → Used for `onSubmit`, `onChange`, etc.
- **Change Events:** `React.ChangeEvent<T>` → Used for `onChange` in inputs and selects.

3. **How do you type custom hooks in TypeScript?**

- Use generics (`<T>`) for reusable hooks.
- Type state using `useState<T>()`.
- Type return values explicitly (`[state,setter]`).
- Type function arguments properly.

4. **What is the best way to type component props that extend HTML attributes?**

- Use `ComponentPropsWithoutRef<'element'>` → Extends built-in HTML props without
  ref (Button, link)
- Use `ComponentPropsWithRef<'element'>` → If the component needs ref support (Recommendation: Input, textareas).
- Use intersection types `( & )` → Combine custom props with HTML attributes `HTMLAttributes<T>` (div, selection, span or generic element)

5. **How do you type a React Context API provider with TypeScript??**

- Define a Type for the Context Value → Ensure type safety.
- Create a Context with `createContext<T>()` → Provide default values
- Use a Provider Component → Wrap children and manage state
- Use a Custom Hook `( useContext )` → Enforce type safety.

6. **How do you use TypeScript utility types ( Partial , Pick , Omit ,Record ) in React?**

- Partial<T> → Makes all properties optional.
- Pick<T, K> → Selects specific properties.
- Omit<T, K> → Removes specific properties.
- Record<K, T> → Creates an object with keys K and values T .

7. **What is the difference between <Link> and <NavLink>?**

This is the _[Guide](https://reactrouter.com/start/framework/navigating#navigating)_.

Both them are used in React router for navigation, but they are serve different purposes:
`<Link>`: Used for basic navigation without reloading the page
`<NavLink>`: Extends `<Link>` by allowing styles or class names to be applied dynamically when the link is active.<
