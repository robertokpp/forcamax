import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"input"> & {
  label: string;
  id: string;
};

export function Input({ label, id, className, children, ...rest }: Props) {
  return (
    <fieldset className="w-full">
      <div className="flex justify-between mb-1.5">
        <label
          className="uppercase text-muted-foreground text-[12px]"
          htmlFor={id}
        >
          {label}
        </label>
        {children}
      </div>
      <input
        type="text"
        id={id}
        className={twMerge(
          `w-full bg-secondary py-3 px-11 rounded-xl border-2 border-[#2E2E32] text-white`,
          className,
        )}
        {...rest}
      />
    </fieldset>
  );
}
