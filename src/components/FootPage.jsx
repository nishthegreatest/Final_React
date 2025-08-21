import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const FootPage = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8 relative">
      {/* Gradient border on top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center place-items-center">
        {/* Brand */}
        <div>
          <h1 className="text-white text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 tracking-wide">
            MyShop
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed text-gray-400 max-w-xs mx-auto">
            Discover the best deals and latest trends in fashion, electronics,
            and more.
          </p>
          <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors"
            >
              <FaFacebook size={16} className="sm:w-[18px] sm:h-[18px]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition-colors"
            >
              <FaInstagram size={16} className="sm:w-[18px] sm:h-[18px]" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 sm:p-2 rounded-full bg-gray-800 hover:bg-sky-500 transition-colors"
            >
              <FaTwitter size={16} className="sm:w-[18px] sm:h-[18px]" />
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h2 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">Shop</h2>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            {["Men", "Women", "Kids", "Electronics"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h2 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h2>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            {["FAQs", "Shipping", "Returns", "Contact Us"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="text-white text-base sm:text-lg font-semibold mb-3 sm:mb-4">Company</h2>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            {["About", "Careers", "Press", "Blog"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center text-xs text-gray-500 mt-8 sm:mt-12 border-t border-gray-800 pt-4 sm:pt-6">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-400">MyShop</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default FootPage;
