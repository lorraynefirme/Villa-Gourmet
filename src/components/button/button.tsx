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
    <Button {...props} type={type} className="bg-amber-500 px-4 py-2 rounded-lg  flex items-center justify-center ">
      {children}
    </Button>
  );
};

export const SecondaryButton = ({ children, type, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      type={type}
      className="bg-slate-400 px-4 py-2 rounded-lg hover:bg-gray-300  lex items-center justify-center "
    >
      {children}
    </Button>
  );
};

export const SecondaryRoundedButton = ({children,type,...props}: ButtonProps) => {
  return (
    <Button
      {...props}
      type={type}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
    >
      {children}
    </Button>
  );
};

interface ButtonType {
  type: "primary" | "secondary" | "secondaryRounded";
}

export const ButtonFactory = ({ type }: ButtonType) => {
  switch (type) {
    case "primary":
      return PrimaryButton;
    case "secondary":
      return SecondaryButton;
    case "secondaryRounded":
      return SecondaryRoundedButton;
    default:
      throw new Error("Invalid button type");
  }
};
