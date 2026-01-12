import Image from "next/image";
import Card from "@/components/ui/Card";

export default function AuthLayout({
  children,
  title,
  description,
  sidePanelContent,
}) {
  const defaultSidePanelContent = (
    <>
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
          <i className="fas fa-shield-alt text-3xl"></i>
        </div>
        <h2 className="text-3xl font-bold mb-4">Account Security</h2>
        <p className="text-white/90 mb-6">
          Keep your account secure. Follow the steps to recover access to your
          account quickly and safely.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <i className="fas fa-check text-sm"></i>
          </div>
          <span className="text-sm">Secure recovery process</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <i className="fas fa-check text-sm"></i>
          </div>
          <span className="text-sm">Email validation</span>
        </div>
      </div>
    </>
  );

  return (
    <main className="pt-20 pb-8 px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <Card>
          <div className="grid md:grid-cols-2">
            <div className="gradient-bg p-12 text-white relative overflow-hidden hidden md:block">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 h-full flex flex-col justify-center slide-in-left">
                {sidePanelContent || defaultSidePanelContent}
              </div>
            </div>
            <div className="p-12 slide-in-right">
              <div className="max-w-sm mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {title}
                  </h1>
                  <p className="text-gray-600 text-sm">{description}</p>
                </div>
                {children}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
