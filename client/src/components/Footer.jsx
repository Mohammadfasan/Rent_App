
export const Footer = () => {
  return (
    <>
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      
          * {
              font-family: 'Poppins', sans-serif;
          }
      `}</style>
      
      <footer className="flex flex-col bg-black items-center justify-around w-full py-16 text-sm text-gray-300 mt-4">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <a href="#" className="font-medium hover:text-white transition-all">Home</a>
          <a href="#" className="font-medium hover:text-white transition-all">About</a>
          <a href="#" className="font-medium hover:text-white transition-all">Services</a>
          <a href="#" className="font-medium hover:text-white transition-all">Contact</a>
          <a href="#" className="font-medium hover:text-white transition-all">Help</a>
        </div>
        
        <div className="flex items-center gap-4 mt-8 text-indigo-400">
          {/* Facebook */}
          <a href="#" className="hover:-translate-y-0.5 hover:text-indigo-300 transition-all duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" className="hover:-translate-y-0.5 hover:text-indigo-300 transition-all duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37"/>
              <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="#" className="hover:-translate-y-0.5 hover:text-indigo-300 transition-all duration-300">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          {/* Twitter */}
          <a href="#" className="hover:-translate-y-0.5 hover:text-indigo-300 transition-all duration-300">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2"/>
            </svg>
          </a>
        </div>

        <p className="mt-8 text-center text-gray-400">
          Copyright © 2025 <a href="https://prebuiltui.com" className="hover:text-white">PrebuiltUI</a>. All rights reserved.
        </p>
      </footer>
    </>
  )
}
