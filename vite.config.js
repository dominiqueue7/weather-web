import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/current/': {
          target: 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/current\//, `?serviceKey=${env.VITE_APP_API_KEY}&`),
        },
        '/api/short-term/': {
          target: 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/short-term\//, `?serviceKey=${env.VITE_APP_API_KEY}&`),
        },
        '/api/daily/': {
          target: 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/daily\//, `?serviceKey=${env.VITE_APP_API_KEY}&`),
        },
      },
    },
  }
})
