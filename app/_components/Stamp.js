// Rotating circular stamp: "SMALL BATCH · FEWER THAN FIFTY · MADE BY HAND ·"
export default function Stamp({ size = 132, className = "" }) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden='true'
    >
      <svg
        viewBox='0 0 120 120'
        className='stamp-spin absolute inset-0 h-full w-full'
      >
        <defs>
          <path
            id='stamp-circle'
            d='M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0'
          />
        </defs>
        <text
          fontFamily='var(--font-body)'
          fontSize='9.4'
          fontWeight='600'
          letterSpacing='2.6'
          fill='currentColor'
        >
          <textPath href='#stamp-circle'>
            SMALL BATCH ✦ FEWER THAN FIFTY ✦ MADE BY HAND ✦
          </textPath>
        </text>
      </svg>
      <div className='absolute inset-[26%] flex items-center justify-center rounded-full border border-current'>
        <span className='font-display text-lg italic leading-none'>
          M&amp;R
        </span>
      </div>
    </div>
  );
}
