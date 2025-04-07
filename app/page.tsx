import Image from "next/image";
import GlassIMG from "../public/glass.png";
import QRCodeGenerator from "../components/ui/QRCodeGenerator";
import { FooterSocialIcons } from "../components/ui/icons";

const Home = () => {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      {/* Decorative elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-3xl"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-400/20 blur-3xl"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-200/10 blur-3xl"></div>
      
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 z-10">
        <QRCodeGenerator />
        
        {/* Footer with developer info */}
        <footer className="w-full mt-12 pb-6">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="glass py-6 px-4 sm:px-8 rounded-2xl text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Connect with the developer
              </h3>
              <FooterSocialIcons />
              <p className="mt-4 text-sm text-gray-600">
                © {new Date().getFullYear()} Designed and developed by Khadim Ali
              </p>
            </div>
          </div>
        </footer>
        
        <Image
          src={GlassIMG}
          alt="Background pattern"
          width={1600}
          height={1200}
          priority
          className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none opacity-20 mix-blend-overlay"
        />
      </div>
    </main>
  );
};

export default Home;
