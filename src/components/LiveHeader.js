const LiveHeader = ({ onLogout, user, isConnected }) => {
  // Accept isConnected prop
let url = user?.tiktok; // Podría ser null, undefined, o el string de la URL
let username = null; // Inicializamos la variable que contendrá el resultado

if (url && url.includes('@')) {
    // Si la URL existe Y contiene el símbolo @, procedemos a extraer el nombre.
    let partes = url.split("@");
    username = partes[partes.length - 1]; 
    
    // Opcional: Validar que el resultado no sea una cadena vacía (si el @ fuera el último carácter)
    if (username === "") {
        username = null; // O el valor que prefieras para indicar un error
    }
}

// Resultado: "isastore.ropadecloset"
  return (
    <header className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <i className="fab fa-tiktok text-2xl text-gray-900"></i>
          <span className="font-bold text-lg">TikTok Live</span>
        </div>
        <div className="flex items-center space-x-4">
          {user && user.tiktok && (
            <span className="text-sm text-gray-600">
              @{username}
            </span>
          )}
          {isConnected && ( // Conditionally render based on isConnected
            <span className="bg-red-600 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-white">
              <span className="w-2 h-2 bg-white rounded-full live-pulse"></span>
              EN VIVO
            </span>
          )}

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
