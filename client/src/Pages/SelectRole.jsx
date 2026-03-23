import React, { useEffect } from "react";
import "./css/SelectRole.css";
import { Link } from "react-router-dom";

const SelectRole = () => {
  return (
    <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col academic-gradient selection-portal-wrapper">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full">
          {/* Hero Header */}
          <div className="mb-16 text-left">
            <span className="text-label-sm font-label uppercase tracking-widest text-primary font-semibold mb-4 block">Selection Portal</span>
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-on-surface tracking-tight mb-4 mt-0">
              Welcome to <span className="text-primary">ABL Portal</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed m-0">
              Choose your workspace to begin. Each role is tailored to provide the specific tools and insights you need for your academic ecosystem.
            </p>
          </div>

          {/* Bento Grid of Roles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Student Card */}
            <Link to="/student-login" className="group relative flex flex-col items-start p-8 bg-surface-container-lowest rounded-xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(44,47,49,0.06)] ring-1 ring-outline-variant/15 active:scale-[0.98] no-underline">
              <div className="w-14 h-14 rounded-full bg-primary-container/10 flex flex-shrink-0 items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface mb-3 group-hover:text-primary mt-0">Student</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8 m-0">Manage your academic journey and discover events happening across campus.</p>
              <div className="mt-auto flex items-center text-primary font-semibold text-sm">
                Access Portal
                <span className="material-symbols-outlined ml-2 text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </Link>

            {/* Admin Card */}
            <Link to="/admin-login" className="group relative flex flex-col items-start p-8 bg-surface-container-lowest rounded-xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(44,47,49,0.06)] ring-1 ring-outline-variant/15 active:scale-[0.98] no-underline">
              <div className="w-14 h-14 rounded-full bg-secondary-container/10 flex flex-shrink-0 items-center justify-center text-secondary mb-6 transition-colors group-hover:bg-secondary group-hover:text-on-secondary">
                <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface mb-3 group-hover:text-secondary mt-0">Admin</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8 m-0">Oversee university operations, system health, and secure portal management.</p>
              <div className="mt-auto flex items-center text-secondary font-semibold text-sm">
                System Control
                <span className="material-symbols-outlined ml-2 text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </Link>

            {/* Club Admin Card */}
            <Link to="/club-admin-login" className="group relative flex flex-col items-start p-8 bg-surface-container-lowest rounded-xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(44,47,49,0.06)] ring-1 ring-outline-variant/15 active:scale-[0.98] no-underline">
              <div className="w-14 h-14 rounded-full bg-tertiary-container/10 flex flex-shrink-0 items-center justify-center text-tertiary mb-6 transition-colors group-hover:bg-tertiary group-hover:text-on-tertiary">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface mb-3 group-hover:text-tertiary mt-0">Club Admin</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8 m-0">Organize campus activities, track engagement, and manage club memberships.</p>
              <div className="mt-auto flex items-center text-tertiary font-semibold text-sm">
                Manage Clubs
                <span className="material-symbols-outlined ml-2 text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </Link>

            {/* Mentor Card */}
            <Link to="/mentor-login" className="group relative flex flex-col items-start p-8 bg-surface-container-lowest rounded-xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(44,47,49,0.06)] ring-1 ring-outline-variant/15 active:scale-[0.98] no-underline">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex flex-shrink-0 items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface mb-3 group-hover:text-primary mt-0">Mentor</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8 m-0">Guide students, share expertise, and provide strategic academic advice.</p>
              <div className="mt-auto flex items-center text-primary font-semibold text-sm">
                Advisory Board
                <span className="material-symbols-outlined ml-2 text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </Link>
          </div>

          {/* Contextual Note */}
          <div className="mt-16 p-8 rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center gap-6">
            <div className="flex -space-x-3">
              <img alt="Portrait 1" className="w-12 h-12 rounded-full border-4 border-surface-container-lowest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2DtBT5YbBjrpIhkExaJKMIVLTUDMBRUjZu5aBfoim3jzvp1muHzUryjpho6apWS3x8ZK9duDoRpA-tIK3P-M1clxbLKrBdcFtm0GNBSICYqhgvTrn_Uu24oAMKp4XA6f1GOyTx0aQCwp0BQyy8gWmg3mLa7bxbCVnv_EsVWjAUODAh4ECy85dQn0hrbnV5jcLChP6VLe6Mc9x-QWFjZuFMBeqUc36Ux_ypEVcQssg21V1HvETRWfubFfEU9wOrbeciXnrsPJrQaI" />
              <img alt="Portrait 2" className="w-12 h-12 rounded-full border-4 border-surface-container-lowest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqUJzSpfiPrzhkpIexRMef1wn7S-vewBAq5bt8JraKF0Gku7zMkdueXKtiJaWdIv3zQv-lGDIJOFk4wsGax_ZpaYgtqGhqsMhFTx049JBi3TxG576m1cuMJcw56HXfYrT6OXacsca2DnMYbA93dTGVULxRX26x51qlV4dIOZkQkMcFboPhTqCwU8T6iKbMS_hv2TVDpw9bKwpOFKIn6KEq2lcEQGWicEAbeEcS5RnYd_FZerYvhU43duLW9zSpJuWWRo80Wiqw9Pg" />
              <img alt="Portrait 3" className="w-12 h-12 rounded-full border-4 border-surface-container-lowest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXTz9d4UMuQp4YaWSMGo-Ow9N5KJ84Ik1hngANnMSZ3OuPXY3hGuMgklShTzMDt3G5vLMZOPSHVkLDBZZNsvjuM1pbwVp3NmuV_qGlT9ShzIhDC_bCo6fr9Q_ZHHIa6kK4kklnJn5_GFkStJO4cl3jcYH0QOF1eZpWHglbedFa4OlYzKj-MOQmsHzwC1GXWxe8okH1Hs18B_W2EXJXIPwfcE3mNuU_Q4OqLgGL_snTnyi12hSVJRAzICaXCZGLP7p07Moqzio7gxg" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-on-surface text-sm font-medium m-0">Join 15,000+ members already using ABL Portal</p>
              <p className="text-on-surface-variant text-xs m-0">Access is strictly limited to verified university credentials.</p>
            </div>
            <div className="md:ml-auto">
              <button className="border-0 px-6 py-2.5 rounded-full bg-[#0053cc] text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer">
                New User Registration
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-8 py-12 mt-auto border-t border-[#abadaf]/15 bg-[#f5f7f9] dark:bg-[#1a1c1e]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-lg font-bold text-[#2c2f31] dark:text-[#e2e2e6] font-headline m-0">
            ABL Learning Portal
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-[#2c2f31] dark:text-[#e2e2e6] opacity-60 text-xs uppercase tracking-wider font-label hover:text-[#0053cc] dark:hover:text-[#779dff] transition-opacity no-underline" href="/#">Privacy Policy</a>
            <a className="text-[#2c2f31] dark:text-[#e2e2e6] opacity-60 text-xs uppercase tracking-wider font-label hover:text-[#0053cc] dark:hover:text-[#779dff] transition-opacity no-underline" href="/#">Terms of Service</a>
            <a className="text-[#2c2f31] dark:text-[#e2e2e6] opacity-60 text-xs uppercase tracking-wider font-label hover:text-[#0053cc] dark:hover:text-[#779dff] transition-opacity no-underline" href="/#">Accessibility</a>
            <a className="text-[#2c2f31] dark:text-[#e2e2e6] opacity-60 text-xs uppercase tracking-wider font-label hover:text-[#0053cc] dark:hover:text-[#779dff] transition-opacity no-underline" href="/#">Contact</a>
          </div>
          <p className="text-[#2c2f31] dark:text-[#e2e2e6] opacity-60 text-sm font-body m-0">
            © 2024 ABL Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SelectRole;