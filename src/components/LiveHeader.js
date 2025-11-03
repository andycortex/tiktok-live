const LiveHeader = ({ onLogout }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <i className="fab fa-tiktok text-2xl text-gray-900"></i>
          <span className="font-bold text-lg">TikTok Live</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="bg-red-600 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white">
            <span className="w-2 h-2 bg-white rounded-full live-pulse"></span>
            EN VIVO
          </span>
          <span className="text-sm text-gray-600">
            <i className="fas fa-eye mr-1"></i>
            <span id="viewerCount">12.5K</span> espectadores
          </span>
          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full text-sm font-semibold text-gray-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default LiveHeader;