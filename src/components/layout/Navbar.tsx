import {useState} from "react";
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
  isOpen
}: {
  isOpen: boolean
}) => {
  return (
    <div className={`border-b border-gray-300 ${isOpen ? "" : "hidden"}`}>
      {navItems.map((item:NavItem) => {
        return (
          <Link
            key={item.to}
            to={item.to}
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
  return (
    <div className="lg:hidden">
      <MobileMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}/>
      <MobileOptions isOpen={isOpen}/>
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