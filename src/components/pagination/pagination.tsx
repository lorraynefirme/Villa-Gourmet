import { ButtonFactory } from "@/components/button/button";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
  }
  
  export const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
    const SecondaryRoundedButton = ButtonFactory({ type: "secondaryRounded" });
    
    return (
      <div className="flex gap-4 mt-4">
        <SecondaryRoundedButton
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeftIcon fontSize="small"/>
        </SecondaryRoundedButton>
  
        <span className="text-lg">Página {page} de {totalPages}</span>
  
        <SecondaryRoundedButton
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          <ChevronRightIcon fontSize="small"/>
        </SecondaryRoundedButton>
      </div>
    );
  }
