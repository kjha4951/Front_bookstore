
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': 'https://backend-deploy-2jqr.onrender.com',
  //   },
  // },
});
