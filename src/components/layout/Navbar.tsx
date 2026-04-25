import { useCallback, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Button, {type ButtonVariant} from "../Button.tsx";
import BurgerMenuIcon from "../../assets/icons/burger-menu.svg";
import CloseIcon from "../../assets/icons/close.svg";

type NavItem = {
  name: string;
  to: string;
  variant: ButtonVariant;
  disabled?:boolean;
};

const navItems: NavItem[] = [
  {name: "探索款式", to: "/services", variant: "init" },
  {name: "美甲師", to: "/artists", variant: "base", disabled: true},
  {name: "預約", to: "/booking", variant: "init" },
  {name: "登入", to: "/login", variant: "primary" }
] as const;

const Logo = () => {
  return (<Link
    key="homepage"
    to="/"
    className="cursor-pointer font-bold text-2xl"
  >
    <h1>Nail Salon</h1>
  </Link>);
}

const MobileMenuButton = ({isOpen, onClick}: {
  isOpen: boolean,
  onClick: () => void
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-4">
      <Logo/>
      <div onClick={onClick} className="cursor-pointer">
        {isOpen ?
          <img src={CloseIcon} alt="close-icon" className="w-10 h-10"/>
          : <img src={BurgerMenuIcon} alt="menu-icon" className="w-10 h-10"/>
        }
      </div>
    </div>
  );
};

const MobileOptions = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div className={`border-b border-gray-300 ${isOpen ? "" : "hidden"}`}>
      {navItems.map((item:NavItem) => {
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className="px-2 py-2 cursor-pointer block border-t border-gray-300 hover:bg-gray-200"
          >
            <Button variant="base" disabled={item?.disabled}>
              {item.name}
            </Button>
          </Link>
        )
      })}
    </div>
  );
}

const DesktopNav = () => {
  return (
    <div className="hidden lg:flex gap-6 justify-between items-center p-4">
      <div className="text-2xl cursor-pointer">
        <h1>Nail Salon</h1>
      </div>
      <div className="flex gap-6">
        {navItems.map((item:NavItem)=> {
          return (
            <Link key={item.to} to={item.to}>
              <Button variant={item?.variant} disabled={item?.disabled}>
                {item.name}
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  );
};
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (

    <div ref={modalRef} className="lg:hidden">
      <MobileMenuButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
      <MobileOptions
        isOpen={isOpen}
        onClose={() => setIsOpen(prev => !prev)}
      />
    </div>
  )
}
const Navbar = () => {
  return (
    <>
      <MobileNav/>
      <DesktopNav/>
    </>
  );
};
export default Navbar;