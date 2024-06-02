import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { EmailInput, PasswordInput } from "@/components/Input";
import Text from "@/components/Text";
import { ChangeEvent, useState } from "react";

const AuthForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setError] = useState<{ passwordMismatch: string | null }>({
    passwordMismatch: null,
  });

  const passwordsMatch = () => {
    if (form.password === "" || form.confirmPassword === "") return;
    const passwordsMatchResult = form.password === form.confirmPassword;
    setError((prev) => ({
      ...prev,
      passwordMismatch: passwordsMatchResult ? null : "Passwords do not match",
    }));
    return passwordsMatchResult;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.id === "password" || e.target.id === "confirmPassword") {
      passwordsMatch();
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitted");
  };

  return (
    <>
      <Heading level={1} className="px-6 py-8 mb-4">
        Sign up
      </Heading>
      <form
        className="px-6 flex flex-col gap-4 w-full max-w-[66ch] shrink-0"
        onSubmit={handleOnSubmit}
      >
        <EmailInput
          id="email"
          label="Email"
          className="grow-1"
          value={form.email}
          onChange={(e) => handleOnChange(e as ChangeEvent<HTMLInputElement>)}
          required
        />
        <PasswordInput
          id="password"
          label="Password"
          className={`grow-1 ${errors.passwordMismatch ? "border-red-500" : ""}`}
          value={form.password}
          onChange={(e) => handleOnChange(e as ChangeEvent<HTMLInputElement>)}
          onBlur={handleOnBlur}
          required
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm password"
          className={`grow-1 ${errors.passwordMismatch ? "border-red-500" : ""}`}
          value={form.confirmPassword}
          onChange={(e) => handleOnChange(e as ChangeEvent<HTMLInputElement>)}
          onBlur={handleOnBlur}
          required
        />
        {errors.passwordMismatch && (
          <Text role="status">{errors.passwordMismatch}</Text>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default AuthForm;
