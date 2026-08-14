import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"button"> & {
  variant?: keyof typeof variants;
};

const variants = {
  primary: "bg-accent hover:bg-accent/95",
  secondary: "bg-transparent text-accent",
};

export function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: Props) {
  const variantButton = variants[variant];
  return (
    <>
      <button
        className={twMerge(
          `w-full flex items-center justify-center gap-2 p-3 rounded-xl text-[14px] cursor-pointer font-bold disabled:cursor-not-allowed  ${variantButton}`,
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}
