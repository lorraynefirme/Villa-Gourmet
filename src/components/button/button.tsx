import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, type, ...props }: ButtonProps) => {
  return (
    <button {...props} type={type}>
      {children}
    </button>
  );
};

export const PrimaryButton = ({ children, type, ...props }: ButtonProps) => {
  return (
    <Button {...props} type={type} className="bg-pink-400 px-4 py-2 rounded-lg">
      {children}
    </Button>
  );
};

export const SecondaryButton = ({ children, type, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      type={type}
      className="bg-slate-400 px-4 py-2 rounded-lg"
    >
      {children}
    </Button>
  );
};

interface ButtonType {
  type: "primary" | "secondary";
}

export const ButtonFactory = ({ type }: ButtonType) => {
  switch (type) {
    case "primary":
      return PrimaryButton;
    case "secondary":
      return SecondaryButton;
    default:
      throw new Error("Invalid button type");
  }
};
