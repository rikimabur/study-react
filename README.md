## Some Questions for Interview

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

4. **What is the best way to type component props that extend HTML attributes?**

- You can extend HTML attributes using `React.HTMLAttributes<HTMLElement>` or more specific types like `React.ButtonHTMLAttributes<HTMLButtonElement>` depending on your component.
