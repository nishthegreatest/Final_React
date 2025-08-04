import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const FootPage = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 px-16 py-8 mt-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Brand */}
        <div>
          <h1 className="text-indigo-400 text-xl font-semibold mb-2 tracking-wide">
            MyShop
          </h1>
          <p className="text-sm leading-relaxed">
            Discover the best deals and latest trends in fashion, electronics, and more.
          </p>
          <div className="flex gap-5 mt-3 text-indigo-400">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-indigo-300 transition-colors duration-200" aria-label="Facebook">
              <FaFacebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-indigo-300 transition-colors duration-200" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-300 transition-colors duration-200" aria-label="Twitter">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h2 className="text-indigo-400 text-lg font-semibold mb-2 border-b border-indigo-700 pb-1">
            Shop
          </h2>
          <ul className="space-y-1 text-sm">
            {["Men", "Women", "Kids", "Electronics"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-indigo-300 transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h2 className="text-indigo-400 text-lg font-semibold mb-2 border-b border-indigo-700 pb-1">
            Support
          </h2>
          <ul className="space-y-1 text-sm">
            {["FAQs", "Shipping", "Returns", "Contact Us"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-indigo-300 transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="text-indigo-400 text-lg font-semibold mb-2 border-b border-indigo-700 pb-1">
            Company
          </h2>
          <ul className="space-y-1 text-sm">
            {["About", "Careers", "Press", "Blog"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-indigo-300 transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mb-[-5] mt-6 border-t border-indigo-800 pt-4">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default FootPage;
