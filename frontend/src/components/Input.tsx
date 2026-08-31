import { twMerge } from "tailwind-merge";

type Props = React.ComponentProps<"input"> & {
  label?: string;
  id: string;
};

type InputTextarea = React.ComponentProps<"textarea"> & {
  label: string;
  id: string;
};

type InputSelect = React.ComponentProps<"select"> & {
  name: string;
  id: string;
};

type InputOption = React.ComponentProps<"option">;

export function Input({ label, id, className, children, ...rest }: Props) {
  return (
    <fieldset className="w-full">
      <div className="flex justify-between mb-1.5">
        <label
          className="uppercase text-muted-foreground text-[12px] "
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
          `w-full bg-secondary py-3 px-11 rounded-xl border-2 border-[#2E2E32] text-white focus:outline-0 focus:border-accent hover:border-accent placeholder:text-[#3F3F47]`,
          className,
        )}
        {...rest}
      />
    </fieldset>
  );
}

export function Textarea({
  label,
  id,
  className,
  children,
  ...rest
}: InputTextarea) {
  return (
    <fieldset className="w-full">
      <div className="flex justify-between mb-1.5">
        <div className="flex gap-1 items-center">
          <label
            className="uppercase text-muted-foreground text-[12px] "
            htmlFor={id}
          >
            {label}
          </label>
          {children}
        </div>
      </div>
      <textarea
        id={id}
        className={twMerge(
          `w-full bg-secondary py-3 px-11 rounded-xl border-2 border-[#2E2E32] text-white focus:outline-0 focus:border-accent hover:border-accent placeholder:text-[#3F3F47]`,
          className,
        )}
        {...rest}
      />
    </fieldset>
  );
}

export function Select({
  name,
  id,
  className,
  children,
  ...rest
}: InputSelect) {
  return (
    <select
      name={name}
      id={id}
      className={twMerge(
        `w-full bg-secondary py-3 px-11 rounded-xl border-2 border-[#2E2E32] text-white focus:outline-0 focus:border-accent hover:border-accent placeholder:text-[#3F3F47]`,
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
}

export function Option({ children, className, value, ...rest }: InputOption) {
  return (
    <option
      value={value}
      className={twMerge(
        `w-full bg-secondary py-3 px-11 rounded-xl border-2 border-[#2E2E32] text-white focus:outline-0 focus:border-accent hover:border-accent placeholder:text-[#3F3F47]`,
        className,
      )}
      {...rest}
    >
      {children}
    </option>
  );
}

type PropsDifficulty = React.ComponentProps<"input"> & {
  name: string;
  id: string;
  variant: keyof typeof variants;
};

const variants = {
  beginner:
    "peer-checked:border-[#00D492] peer-checked:bg-[#00D492]/10 peer-checked:text-[#00D492]",
  intermediary:
    "peer-checked:border-[#FFB900] peer-checked:bg-[#FFB900]/10 peer-checked:text-[#FFB900]",
  advanced:
    "peer-checked:border-[#FF6467] peer-checked:bg-[#FF6467]/10 peer-checked:text-[#FF6467]",
};

export function InputDifficulty({
  name,
  id,
  children,
  variant,
}: PropsDifficulty) {
  const variantColor = variants[variant];

  return (
    <li className="flex-1">
      <input id={id} type="radio" name={name} className="peer sr-only"></input>
      <label
        className={`block w-full p-3 bg-card border border-[#252526] rounded-xl text-muted-foreground ${variantColor}`}
        htmlFor={id}
      >
        {children}
      </label>
    </li>
  );
}
