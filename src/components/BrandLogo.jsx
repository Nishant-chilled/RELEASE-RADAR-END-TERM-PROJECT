function BrandLogo() {
  return (
    <div className="brand-logo">
      <svg viewBox="0 0 100 100" className="brand-logo__svg" aria-hidden="true">
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb347" />
            <stop offset="100%" stopColor="#ff6a00" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="100" height="100" rx="22" fill="#0a0a0a" />

        <path
          d="M28 70V30H50Q65 30 65 45Q65 58 50 58H38M50 58L68 70"
          stroke="url(#logoGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        <circle cx="50" cy="50" r="40" fill="url(#logoGradient)" opacity="0.06" />
      </svg>

      <div className="brand-logo__text">
        <span className="brand-main">Release</span>
        <span className="brand-accent">Radar</span>
      </div>
    </div>
  );
}

export default BrandLogo;