import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const BACKEND_API_URL = env.VITE_BACKEND_API_URL;
    return {
        plugins: [react()],
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
        server: {
            proxy: {
                '/api': {
                    target: BACKEND_API_URL,
                    changeOrigin: true,
                    secure: true,
                },
            },
        },
    };
});
