import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "MedRing",
        short_name: "MedRing",
        theme_color: "#2F80ED",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icon.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
}