export type LogoItem = {
  name: string;
  src: string;
  width: number;
  height: number;
  href?: string;
  category?: string;
};

export const logoItems: LogoItem[] = [
  {
    name: "Secret Network",
    src: "/logos/secret-network.png",
    width: 485,
    height: 158,
    href: "https://scrt.network/",
    category: "Blockchain Infrastructure",
  },
  {
    name: "Archway",
    src: "/logos/archway.png",
    width: 300,
    height: 101,
    href: "https://archway.io/",
    category: "Ecosystem",
  },
  {
    name: "Fina",
    src: "/logos/fina.png",
    width: 300,
    height: 93,
    href: "https://fina.cash/",
    category: "Fintech",
  },
  {
    name: "KalloView",
    src: "/logos/kalloview.webp",
    width: 293,
    height: 84,
    category: "Project",
  },
  {
    name: "Thinka",
    src: "/logos/thinka.png",
    width: 270,
    height: 80,
    category: "Project",
  },
  {
    name: "WhisperNode",
    src: "/logos/whispernode.png",
    width: 100,
    height: 101,
    category: "Infrastructure",
  },
  {
    name: "Jumia",
    src: "/logos/jumia.svg",
    width: 441,
    height: 77,
    href: "https://group.jumia.com/",
    category: "Commerce",
  },
  {
    name: "Bybit",
    src: "/logos/bybit.svg",
    width: 87,
    height: 34,
    href: "https://www.bybit.com/",
    category: "Digital Assets",
  },
];
