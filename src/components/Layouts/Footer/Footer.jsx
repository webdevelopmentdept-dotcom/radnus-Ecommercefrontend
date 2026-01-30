import { useLocation, Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  MdOutlineMobileFriendly,
  MdHeadset,
  MdPower,
  MdSpeaker,
  MdAttachFile,
} from "react-icons/md";
import { Truck, ShieldCheck, BadgeCheck, Wrench } from "lucide-react";
import logo from "../../../assets/radnuslogo.png";

const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-white border-t mt-0">


      {/* TRUST STRIP */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-700">
        <div className="flex flex-col items-center gap-2">
          <Truck className="w-6 h-6 text-gray-800" />
          <span>Nationwide Delivery</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-gray-800" />
          <span>Secure Payments</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <BadgeCheck className="w-6 h-6 text-gray-800" />
          <span>Authentic Products</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Wrench className="w-6 h-6 text-gray-800" />
          <span>Warranty Support</span>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* BRAND */}
        <div>
          <img src={logo} alt="Radnus" className="h-9 mb-3" />
          <p className="text-gray-600 leading-6">
            Radnus is a trusted brand delivering premium mobile accessories and
            digital solutions across India.
          </p>
          <p className="mt-3 text-red-600 font-medium">Trusted Since 2003</p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-4 text-gray-600">
            <a
              href="https://www.facebook.com/radnus.cellphone.training"
              className="hover:text-red-600"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.instagram.com/radnus_cellphone_training/"
              className="hover:text-red-600"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/results?search_query=radnus+pondicherry"
              className="hover:text-red-600"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=919940973030"
              className="hover:text-red-600"
            >
              <FaWhatsapp size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/radnus-communication-470b7a327/"
              className="hover:text-red-600"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* QUICK SHOP WITH ICONS */}
        <div>
          <h4 className="font-semibold text-red-600 mb-3">Quick Shop</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <MdOutlineMobileFriendly size={20} />
              <Link
                to="/category/mobile-accessories"
                className="hover:text-red-600"
              >
                Mobile Accessories
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MdPower size={20} />
              <Link to="/category/chargers" className="hover:text-red-600">
                Chargers & Cables
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MdHeadset size={20} />
              <Link to="/category/earphones" className="hover:text-red-600">
                Earphones & Headsets
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MdPower size={20} />
              <Link to="/category/power-banks" className="hover:text-red-600">
                Power Banks
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MdAttachFile size={20} />
              <Link to="/category/mobile-stands" className="hover:text-red-600">
                Mobile Stands
              </Link>
            </li>
          </ul>
        </div>

        {/* RADNUS NETWORK */}
        <div>
          <h4 className="font-semibold text-red-600 mb-3">Radnus Network</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2 hover:text-red-600 cursor-pointer">
              <a href="https://radnus.in" target="_blank" rel="noreferrer">
                Official Website
              </a>
            </li>
            <li className="flex items-center gap-2 hover:text-red-600 cursor-pointer">
              <a
                href="https://radnusunlockers.com/"
                target="_blank"
                rel="noreferrer"
              >
                Radnus Unlocker
              </a>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="font-semibold text-red-600 mb-3">Support</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <MdHeadset size={20} />
              <Link to="/customer-service" className="hover:text-red-600">
                Contact Support
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MdAttachFile size={20} />
              <Link to="/shipping-returns" className="hover:text-red-600">
                Shipping & Returns
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MdAttachFile size={20} />
              <Link to="/warranty" className="hover:text-red-600">
                Warranty Information
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MdAttachFile size={20} />
              <Link to="/track-order" className="hover:text-red-600">
                Track Your Order
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Radnus. All rights reserved.</span>
          <div className="text-center sm:text-right">
            <div className="text-red-600 font-medium">
              Secure Payments • Authentic Products • Nationwide Delivery
            </div>
            <div className="text-gray-500 mt-1">
              Privacy Policy • Terms & Conditions • Refund Policy
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;