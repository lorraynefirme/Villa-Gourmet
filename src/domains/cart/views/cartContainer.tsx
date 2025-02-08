"use client";

import { CartItem } from "@/domains/cart/views/cartItem";
import { useCartContainer } from "@/domains/cart/viewModels/useCartContainer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { motion } from "framer-motion";
import { generateUUID } from "@/utils/generateUUID";

export const CartContainer = () => {
  const {
    cart,
    getTotalPrice,
    getTotalProducts,
    PrimaryButton,
    isCollapsed,
    setIsCollapsed,
  } = useCartContainer();

  return (
    <motion.div
      initial={{ width: 64 }}
      animate={{ width: isCollapsed ? 16 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full bg-slate-400 text-slate-950 p-4 flex flex-col fixed right-0 rounded-sm overflow-y-auto custom-scrollbar"
    >
      <div className="absolute left-1">
        {!isCollapsed && (
          <ChevronRightIcon
            className="cursor-pointer"
            onClick={() => setIsCollapsed(true)}
          />
        )}
        {isCollapsed && (
          <ChevronLeftIcon
            className="cursor-pointer"
            onClick={() => setIsCollapsed(false)}
          />
        )}
      </div>

      {!isCollapsed && (
        <div className="flex flex-col w-full items-end">
          <div className="mt-6">
            {Boolean(cart.length) ? (
              cart.map((item) => (
                <div key={generateUUID()}>
                  <CartItem product={item} />
                </div>
              ))
            ) : (
              <div className="text-sm">carrinho vazio</div>
            )}
          </div>
          <div className="pb-28">
            <p className="font-semibold mt-6 mb-3">
              Total: R$ {getTotalPrice().toFixed(2)}
            </p>
            <div className="flex justify-end mt-3 mr-3">
              {Boolean(getTotalProducts()) && (
                <PrimaryButton>Reservar</PrimaryButton>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
