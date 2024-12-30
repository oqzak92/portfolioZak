import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolioZak/', // Remplacez par le nom de votre dépôt GitHub
  build: {
    outDir: 'dist', // Assurez-vous que le dossier de sortie est correct
  },
  plugins: [react()],
})
