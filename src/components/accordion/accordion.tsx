import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface AccordionProps {
  title: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export const Accordion = ({
  title,
  show,
  setShow,
  children,
}: PropsWithChildren<AccordionProps>) => {
  return (
    <div className="border-slate-500 border-b-2 py-2">
      <div className="flex align-center gap-3">
        <h6 className="font-semibold mb-2">{title}</h6>
        <div className="cursor-pointer" onClick={() => setShow(!show)}>
          <KeyboardArrowDownIcon />
        </div>
      </div>
      {show && children}
    </div>
  );
};
