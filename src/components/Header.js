import Link from 'next/link';

const Header = ({
  secondaryText = "¿Ya tienes cuenta?",
  ctaText = "Iniciar Sesión",
  ctaLink = "/login"
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <i className="fab fa-tiktok text-2xl text-gray-900"></i>
          <span className="font-bold text-lg">TikTok Live</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{secondaryText}</span>
          <Link href={ctaLink} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors btn-hover">
            {ctaText}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;