"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    setState(/^\S+@\S+\.\S+$/.test(email) ? "done" : "error");
  };

  return (
    <div className='flex flex-col gap-4 border border-divider bg-oat/60 p-6 sm:flex-row sm:items-center sm:justify-between'>
      <div>
        <p className='font-display text-xl'>The Thursday note</p>
        <p className='font-body text-sm text-ink/60'>
          One short email when a new run is ready. Never more than that.
        </p>
      </div>
      {state === "done" ? (
        <p
          className='step-in font-display text-lg italic text-moss'
          role='status'
        >
          Thank you. This is a demo, so nothing was sent.
        </p>
      ) : (
        <form
          onSubmit={submit}
          noValidate
          className='flex w-full flex-col gap-2 sm:w-auto'
        >
          <div className='flex gap-2'>
            <label htmlFor='nl-email' className='sr-only'>
              Email address
            </label>
            <input
              id='nl-email'
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setState("idle");
              }}
              placeholder='you@example.com'
              aria-invalid={state === "error"}
              className='w-full border border-ink/25 bg-plaster px-4 py-2.5 font-body text-sm outline-none focus:border-rust sm:w-64'
            />
            <button
              type='submit'
              className='bg-ink px-5 py-2.5 font-body text-sm text-plaster transition-colors hover:bg-rust'
            >
              Subscribe
            </button>
          </div>
          {state === "error" ? (
            <p className='font-body text-xs text-rust-deep' role='alert'>
              Please enter a valid email.
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
