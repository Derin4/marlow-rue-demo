export default function TrustIcon({ name, size = 28 }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "box":
      return (
        <svg {...p}>
          <path d='M4 10l12-6 12 6v12l-12 6-12-6z' />
          <path d='M4 10l12 6 12-6M16 16v12' />
        </svg>
      );
    case "hands":
      return (
        <svg {...p}>
          <path d='M5 20c0-6 4-10 11-10s11 4 11 10c0 3-2 5-5 5H10c-3 0-5-2-5-5z' />
          <path d='M11 25v3h10v-3M16 10V5' />
        </svg>
      );
    case "return":
      return (
        <svg {...p}>
          <path d='M7 12h14a5 5 0 0 1 0 10H10' />
          <path d='M11 7l-5 5 5 5' />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d='M16 29s9-7.500 9-15a9 9 0 0 0-18 0c0 7.500 9 15 9 15z' />
          <circle cx='16' cy='14' r='3.200' />
        </svg>
      );
  }
}
