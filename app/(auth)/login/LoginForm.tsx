"use client";

import { useActionState, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { GoArrowRight, GoEye, GoEyeClosed } from "react-icons/go";
import { login, type LoginState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0066FF] text-[15px] font-medium text-white shadow-[0_10px_30px_-12px_rgba(0,102,255,0.7)] transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#0057db] hover:shadow-[0_14px_34px_-12px_rgba(0,102,255,0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {pending ? (
        <>
          <span
            aria-hidden
            className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
          Memproses…
        </>
      ) : (
        <>Masuk</>
      )}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {});
  const [showPassword, setShowPassword] = useState(false);
  const emailId = useId();
  const passwordId = useId();
  const errorId = useId();

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {state.error ? (
        <div
          id={errorId}
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-[#D92D20]/25 bg-[#D92D20]/8 px-4 py-3 text-[13.5px] leading-snug text-[#912018]"
        >
          <span
            aria-hidden
            className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#D92D20] text-[10px] font-bold text-white"
          >
            !
          </span>
          {state.error}
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <label
          htmlFor={emailId}
          className="text-[13px] font-medium text-[#0E1116]"
        >
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoFocus
          required
          defaultValue={state.email}
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? errorId : undefined}
          placeholder="nama@webacsl.com"
          className="h-12 rounded-xl border border-[#0E1116]/14 bg-white px-4 text-[15px] text-[#0E1116] shadow-[0_1px_2px_rgba(14,17,22,0.04)] transition-[border-color,box-shadow] duration-200 ease-out placeholder:text-[#0E1116]/35 hover:border-[#0E1116]/24 focus:border-[#0066FF] focus:outline-none focus:ring-4 focus:ring-[#0066FF]/12"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <label
            htmlFor={passwordId}
            className="text-[13px] font-medium text-[#0E1116]"
          >
            Kata sandi
          </label>
          <a
            href="#"
            className="text-[12.5px] font-medium text-[#0066FF] underline-offset-2 transition-colors duration-200 hover:text-[#0057db] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
          >
            Lupa sandi?
          </a>
        </div>
        <div className="relative flex items-center">
          <input
            id={passwordId}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? errorId : undefined}
            placeholder="••••••••"
            className="h-12 w-full rounded-xl border border-[#0E1116]/14 bg-white pl-4 pr-11 text-[15px] text-[#0E1116] shadow-[0_1px_2px_rgba(14,17,22,0.04)] transition-[border-color,box-shadow] duration-200 ease-out placeholder:text-[#0E1116]/35 hover:border-[#0E1116]/24 focus:border-[#0066FF] focus:outline-none focus:ring-4 focus:ring-[#0066FF]/12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 text-[#0E1116]/35 hover:text-[#0E1116]/60 transition-colors focus:outline-none"
            aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
          >
            {showPassword ? <GoEyeClosed className="size-5" /> : <GoEye className="size-5" />}
          </button>
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
