// import React from 'react';
// import { Button } from '@/components/ui/button';
import Cart from "@/components/Cart";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-section py-0 flex justify-between items-center">
        <Link to="/" className="text-xl font-medium">
          Aroma <span className="text-product"> store</span>
        </Link>
        <div className="flex items-center gap-2">
          {/* <Link to="/admin">
            <Button variant="ghost" size="sm">
              Админ
            </Button>
          </Link> */}
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
