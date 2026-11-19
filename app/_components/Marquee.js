export default function Marquee({ items, dur = 50 }) {
  const row = (hidden) => (
    <div
      className='flex shrink-0 items-center'
      aria-hidden={hidden || undefined}
    >
      {items.map((t, i) => (
        <span
          key={i}
          className='flex items-center whitespace-nowrap font-display text-lg italic tracking-wide'
        >
          <span className='px-6'>{t}</span>
          <span className='text-rust'>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className='ticker' style={{ "--dur": `${dur}s` }}>
      {row(false)}
      {row(true)}
    </div>
  );
}
