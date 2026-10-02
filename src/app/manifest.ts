import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Faro Sur",
    short_name: "Faro Sur",
    description: "Taller yucateco de confección de trajes de baño.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F7F5",
    theme_color: "#F8F7F5",
    lang: "es-MX",
    icons: [{ src: "/icon.png", sizes: "423x423", type: "image/png" }],
  };
}
