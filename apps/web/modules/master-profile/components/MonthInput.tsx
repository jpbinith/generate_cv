import type { InputHTMLAttributes, MouseEvent } from "react";

type MonthInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

function openMonthPicker(event: MouseEvent<HTMLInputElement>) {
  const input = event.currentTarget;

  try {
    input.showPicker?.();
  } catch {
    // Ignore browsers that expose the method but disallow programmatic opening.
  }
}

export function MonthInput({ onClick, ...props }: MonthInputProps) {
  function handleClick(event: MouseEvent<HTMLInputElement>) {
    onClick?.(event);
    openMonthPicker(event);
  }

  return <input {...props} onClick={handleClick} type="month" />;
}
