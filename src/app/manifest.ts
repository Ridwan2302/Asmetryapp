import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Asmetry — Facial Analysis & Looksmaxing',
    short_name: 'Asmetry',
    description: 'Scan your face, get a facial-harmony score, and follow a daily protocol built around your results.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f5f7',
    theme_color: '#f5f5f7',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-256.png', sizes: '256x256', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-384.png', sizes: '384x384', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
