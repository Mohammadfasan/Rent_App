export const Footer = () => {
  return (
    <>
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      
          * {
              font-family: 'Poppins', sans-serif;
          }
      `}</style>
      
      <footer className="relative flex flex-col items-center justify-around w-full py-16 text-sm text-gray-300 mt-4 bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden">
        
        {/* Background Effects - Same as Hero */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-500/15 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMEg2MFY2MEgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] opacity-5"></div>
          <div className="absolute inset-0 bg-radial-gradient at-center from-transparent via-blue-900/3 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-8">
          <a href="#" className="font-medium hover:text-white transition-all">Home</a>
          <a href="/cars" className="font-medium hover:text-white transition-all">Cars</a>
          <a href="/bookings" className="font-medium hover:text-white transition-all">MyBooking</a>
          <a href="/owner-dasboard" className="font-medium hover:text-white transition-all">Dasboad</a>
          <a href="#" className="font-medium hover:text-white transition-all">Help</a>
        </div>
        
        <div className="relative z-10 flex items-center gap-4 mt-8 text-indigo-400">
          {/* Facebook */}
          <a href="https://www.facebook.com/share/1CMTG51eKn/" className="hover:-translate-y-0.5 hover:text-indigo-300 transition-all duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/mohammedfasanfasan?igsh=aHBmOHNjODR5NW41" className="hover:-translate-y-0.5 hover:text-indigo-300 transition-all duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37"/>
              <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/mohamed-fasan-0728712a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:-translate-y-0.5 hover:text-indigo-300 transition-all duration-300">
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

        <p className="relative z-10 mt-8 text-center text-gray-400">
          Copyright © 2025 <a href="" className="hover:text-white">Fsn</a>. All rights reserved.
        </p>

        {/* Custom animations */}
        <style>{`
          .bg-radial-gradient {
            background-image: radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(59, 130, 246, 0.03) 100%);
          }
        `}</style>
      </footer>
    </>
  )
}