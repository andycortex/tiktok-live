import Image from 'next/image';

const VideoPlayer = () => {
  return (
    <section className="flex-1 flex items-center justify-center relative">
      <div className="relative w-full max-w-2xl aspect-9/16 bg-linear-to-br from-purple-200 to-pink-200 rounded-2xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-md">
            <Image src="https://picsum.photos/seed/streamer/40/40" alt="Streamer" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-pink-500" />
            <div>
              <p className="font-semibold text-sm">@usuario_tiktok</p>
              <p className="text-xs text-gray-600">Transmitiendo ahora</p>
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors shadow-md">
            Seguir
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-3 shadow-md">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-linear-to-r from-pink-500 to-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPlayer;
