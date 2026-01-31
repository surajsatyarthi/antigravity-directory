import { Apple, Monitor, Terminal, Download } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Download Antigravity',
  description: 'Download the Antigravity desktop app for macOS, Windows, and Linux.',
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
          Download Antigravity
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          The AI-native IDE built for the next generation of software engineering.
          Available for macOS, Windows, and Linux.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* macOS */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 flex flex-col items-center hover:border-white/20 transition-all group">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
            <Apple className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">macOS</h2>
          <p className="text-gray-400 text-sm mb-8">Apple Silicon & Intel</p>
          <Link 
            href="#"
            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download for Mac
          </Link>
          <p className="mt-4 text-xs text-gray-500">Requires macOS 11.0+</p>
        </div>

        {/* Windows */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 flex flex-col items-center hover:border-white/20 transition-all group">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Windows</h2>
          <p className="text-gray-400 text-sm mb-8">64-bit Installer</p>
          <Link 
            href="#"
            className="w-full py-3 bg-[#1A1A1A] text-white border border-white/10 font-bold rounded-lg hover:bg-[#252525] transition-colors flex items-center justify-center gap-2 cursor-not-allowed opacity-75"
            title="Coming Soon"
          >
            <Download className="w-4 h-4" />
            Download for Windows
          </Link>
          <p className="mt-4 text-xs text-gray-500">Windows 10/11</p>
        </div>

        {/* Linux */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 flex flex-col items-center hover:border-white/20 transition-all group">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
            <Terminal className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Linux</h2>
          <p className="text-gray-400 text-sm mb-8">Debian & RPM</p>
          <Link 
            href="#"
            className="w-full py-3 bg-[#1A1A1A] text-white border border-white/10 font-bold rounded-lg hover:bg-[#252525] transition-colors flex items-center justify-center gap-2 cursor-not-allowed opacity-75"
             title="Coming Soon"
          >
            <Download className="w-4 h-4" />
            Download for Linux
          </Link>
          <p className="mt-4 text-xs text-gray-500">Ubuntu, Fedora, Arch</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-20 border-t border-white/10 pt-16">
        <h3 className="text-xl font-bold mb-6 text-center">System Requirements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-gray-400">
          <div>
            <strong className="block text-white mb-2">Minimum</strong>
            <ul className="space-y-1">
              <li>4GB RAM</li>
              <li>2-core CPU</li>
              <li>5GB Disk Space</li>
            </ul>
          </div>
          <div>
            <strong className="block text-white mb-2">Recommended</strong>
            <ul className="space-y-1">
              <li>16GB RAM</li>
              <li>8-core CPU</li>
              <li>SSD Storage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
