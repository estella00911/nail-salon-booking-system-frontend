import { useState } from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import FaceBookIcon from "../../assets/icons/facebook.svg?react";
// @ts-ignore
import InstagramIcon from "../../assets/icons/instagram.svg?react";
import ChevronIcon from "../../assets/icons/chevron-down.svg";
import StarIcon from "../../assets/icons/star.svg";


type FooterLinkItem = {
  id: string;
  name: string;
  to: string;
};

type FooterLinkSection = {
  id: string;
  title: string;
  links: FooterLinkItem[];
};

const footerLinks: FooterLinkSection[] = [
  {
    title: "款式探索",
    id: "explore-service",
    links: [
      { name: "瀏覽款式", to: "/services", id: "browse-service" },
      { name: "風格分類", to: "/", id: "service-classification" },
      { name: "熱門設計", to: "/", id: "popular-design" },
    ],
  },
  {
    title: "美甲服務",
    id: "nail-service",
    links: [
      { name: "立即預約", to: "/", id: "booking-now" },
      { name: "美甲師列表", to: "/", id: "artist-list" },
      { name: "預約流程", to: "/", id: "booking-process" },
      { name: "價格資訊", to: "/", id: "price-info" },
    ],
  },
  {
    title: "我的帳戶",
    id: "my-account",
    links: [
      { name: "登入/註冊", to: "/login", id: "login-register" },
      { name: "我的預約", to: "/", id: "my-booking" },
      { name: "個人資料", to: "/", id: "my-profile" },
    ],
  },
  {
    title: "客戶支援",
    id: "customer-support",
    links: [
      { name: "聯絡我們", to: "/", id: "contact-us" },
      { name: "常見問題", to: "/", id: "common-faq" },
      { name: "隱私政策", to: "/", id: "privacy-policy" },
    ],
  },
];

const FooterBrand = () => {
  return (
    // brand
    <div className="flex flex-col px-2 gap-2">
      <div className="flex flex-col justify-center">
        <h2 className="text-center lg:text-left text-xl font-semibold">
          Nail Salon
        </h2>
        <p className="text-center lg:text-left">
          輕鬆預約美甲服務，找到最適合你的風格
        </p>
      </div>
      {/*review*/}
      <div className="text-gray-500 flex justify-center items-center flex-col lg:items-start">
        <div className="flex flex-row items-center">
          <img src={StarIcon} alt="star-icon" className="h-5 h-5 mr-1"/>
          <p>4.8/5 使用者評價</p>
        </div>
        <p>超過 100 位使用者已完成預約</p>
      </div>
      {/* social media */}
      <div className="flex flex-row gap-4 justify-center lg:justify-start">
        <FaceBookIcon className="w-6 h-6 text-gray-500" />
        <InstagramIcon className="w-6 h-6 text-gray-500" />
      </div>
    </div>
  );
};

const FooterSection = (
  { section }
  : { section: FooterLinkSection }
) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full lg:w-auto">
      <button
        type="button"
        className="w-full text-xl text-center lg:text-left"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="relative border-b border-gray-200 py-2 ">
          {section.title}
          <img
            src={ChevronIcon}
            className={`h-5 w-5 transition-transform duration-200 
            ${isOpen ? "rotate-180" : ""} absolute right-5 top-2 lg:hidden`}
          />
        </div>
      </button>

      <div className={`${isOpen ? "flex" : "hidden"}  lg:flex flex-col gap-2`}>
        {section.links.map((subService) => (
          <Link
            key={subService.id}
            to={subService.to}
            className="block hover:underline"
          >
            <button
              disabled={true}
              className="cursor-not-allowed text-gray-300">{subService.name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

const FooterLinks = () => {
  return (
    <div className="flex text-center flex-col items-center lg:flex-row mb-4 lg:items-start lg:gap-16">
      {footerLinks.map((section) => (
        <FooterSection key={section.id} section={section} />
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="mt-auto flex-col-reverse flex flex-col lg:flex-row lg:h-[200px] lg:items-center lg:justify-between mx-8">
      <FooterBrand />
      <FooterLinks />
    </footer>
  );
};

export default Footer;