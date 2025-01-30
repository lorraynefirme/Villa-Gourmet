"use client";

import { CartItem } from "@/app/_domains/cart/_views/cartItem";
import { userCart } from "@/app/_domains/cart/_viewModels/userCart";
import { useState } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { motion } from "framer-motion";
import { generateUUID } from "@/functions/generateUUID";

export const Cart = () => {
  const { cart, getTotalPrice, getTotalProducts, PrimaryButton } = userCart();
  const [isCollapsed, setIsCollapsed] = useState(false);


  if (!cart.length) return <div>Carrinho Vazio</div>;

  return (
    <motion.div
    initial={{ width: 64 }}
    animate={{ width: isCollapsed ? 16 : 240 }} 
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="h-full bg-slate-400 text-slate-950 p-4 flex flex-col fixed right-0 rounded-sm"
  >
    <div className="absolute left-1">
    {!isCollapsed && <ChevronRightIcon  className="cursor-pointer" onClick={() =>setIsCollapsed(true)} />}
    {isCollapsed && <ChevronLeftIcon className="cursor-pointer" onClick={() =>setIsCollapsed(false)} />}
    </div>
     
    {!isCollapsed && <>
     <div className="mt-6">
        {cart.map((item) => (
          <div key={generateUUID()}>
            <CartItem product={item} />
          </div>
        ))}
      </div>
      <div className="fixed bottom-20">
        <p className="font-semibold mt-6 mb-3">
          Total: R$ {getTotalPrice().toFixed(2)}
        </p>
        <div className="flex justify-end mt-3 mr-3">
          {Boolean(getTotalProducts()) && <PrimaryButton>Reservar</PrimaryButton>}
        </div>
      </div>
      </>}
    </motion.div>
  );
};
