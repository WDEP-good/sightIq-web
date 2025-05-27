import  { UserConfig, ConfigEnv,loadEnv } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// 配置svg路径
const pathResolve = (pathStr: any) => {
  return path.resolve(__dirname, pathStr)
}




export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [pathResolve('@/../public/svg')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        watchFiles: true,
        enable: true,
        logger: true,
      }),
    ],
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },

      ]
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVICE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      port: 3001,
    },
  }
}