import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"input"> & {
  label: string;
  id: string;
};

export function Input({ label, id, className, ...rest }: Props) {
  return (
    <>
      <label className="uppercase text-muted-foreground text-[12px]" htmlFor={id}>{label}</label>
      <input
      type="text"
      id={id}
        className={twMerge(
          `w-full bg-secondary py-3 px-11 rounded-xl`,
          className,
        )}
        {...rest}
      />
    </>
  );
}
