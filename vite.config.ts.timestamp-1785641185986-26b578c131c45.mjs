// vite.config.ts
import { defineConfig } from "file:///C:/Users/admin/WorkBuddy/20260801231547/nest-chat-customer/node_modules/vite/dist/node/index.js";
import { NaiveUiResolver } from "file:///C:/Users/admin/WorkBuddy/20260801231547/nest-chat-customer/node_modules/unplugin-vue-components/dist/resolvers.js";
import { FileSystemIconLoader } from "file:///C:/Users/admin/WorkBuddy/20260801231547/nest-chat-customer/node_modules/unplugin-icons/dist/loaders.js";
import Icons from "file:///C:/Users/admin/WorkBuddy/20260801231547/nest-chat-customer/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///C:/Users/admin/WorkBuddy/20260801231547/nest-chat-customer/node_modules/unplugin-icons/dist/resolver.js";
import AutoImport from "file:///C:/Users/admin/WorkBuddy/20260801231547/nest-chat-customer/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/admin/WorkBuddy/20260801231547/nest-chat-customer/node_modules/unplugin-vue-components/dist/vite.js";
import Vue from "file:///C:/Users/admin/WorkBuddy/20260801231547/nest-chat-customer/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueJsx from "file:///C:/Users/admin/WorkBuddy/20260801231547/nest-chat-customer/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\admin\\WorkBuddy\\20260801231547\\nest-chat-customer";
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    build: {
      outDir: "dist",
      assetsDir: "static"
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    },
    plugins: [
      Vue(),
      VueJsx(),
      AutoImport({
        resolvers: [NaiveUiResolver(), IconsResolver()]
      }),
      Components({
        dts: true,
        deep: true,
        extensions: ["vue", "tsx"],
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.tsx\?tsx/],
        dirs: ["src/components", "src/layouts"],
        resolvers: [
          NaiveUiResolver(),
          IconsResolver({
            prefix: false,
            enabledCollections: ["iv"]
          })
        ]
      }),
      Icons({
        scale: 1,
        autoInstall: true,
        compiler: "vue3",
        customCollections: {
          iv: FileSystemIconLoader("./src/assets/icons")
        }
      })
    ],
    server: {
      hmr: true,
      port: 5050,
      host: "0.0.0.0",
      proxy: {
        [`/web-service`]: {
          target: `http://localhost:34570`,
          ws: true,
          changeOrigin: true
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxXb3JrQnVkZHlcXFxcMjAyNjA4MDEyMzE1NDdcXFxcbmVzdC1jaGF0LWN1c3RvbWVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZG1pblxcXFxXb3JrQnVkZHlcXFxcMjAyNjA4MDEyMzE1NDdcXFxcbmVzdC1jaGF0LWN1c3RvbWVyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hZG1pbi9Xb3JrQnVkZHkvMjAyNjA4MDEyMzE1NDcvbmVzdC1jaGF0LWN1c3RvbWVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBDb25maWdFbnYsIFVzZXJDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBOYWl2ZVVpUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbmltcG9ydCB7IEZpbGVTeXN0ZW1JY29uTG9hZGVyIH0gZnJvbSAndW5wbHVnaW4taWNvbnMvbG9hZGVycydcclxuaW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IFZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgICAgICAgICBhc3NldHNEaXI6ICdzdGF0aWMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgIFZ1ZSgpLFxyXG4gICAgICAgICAgICBWdWVKc3goKSxcclxuICAgICAgICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlcnM6IFtOYWl2ZVVpUmVzb2x2ZXIoKSwgSWNvbnNSZXNvbHZlcigpXVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgICAgICAgICBkdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkZWVwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAndHN4J10sXHJcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLnRzeCQvLCAvXFwudHN4XFw/dHN4L10sXHJcbiAgICAgICAgICAgICAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJywgJ3NyYy9sYXlvdXRzJ10sXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBOYWl2ZVVpUmVzb2x2ZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBJY29uc1Jlc29sdmVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbJ2l2J11cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgSWNvbnMoe1xyXG4gICAgICAgICAgICAgICAgc2NhbGU6IDEsXHJcbiAgICAgICAgICAgICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbXBpbGVyOiAndnVlMycsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21Db2xsZWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGl2OiBGaWxlU3lzdGVtSWNvbkxvYWRlcignLi9zcmMvYXNzZXRzL2ljb25zJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlcnZlcjoge1xyXG4gICAgICAgICAgICBobXI6IHRydWUsXHJcbiAgICAgICAgICAgIHBvcnQ6IDUwNTAsXHJcbiAgICAgICAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgICAgICAgICAgcHJveHk6IHtcclxuICAgICAgICAgICAgICAgIFtgL3dlYi1zZXJ2aWNlYF06IHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IGBodHRwOi8vbG9jYWxob3N0OjM0NTcwYCxcclxuICAgICAgICAgICAgICAgICAgICB3czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VyxTQUFTLG9CQUFvRDtBQUN6YSxTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFUakIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBNkI7QUFDdEUsU0FBTztBQUFBLElBQ0gsT0FBTztBQUFBLE1BQ0gsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLElBQ2Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNMLE9BQU87QUFBQSxRQUNILEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUN0QztBQUFBLElBQ0o7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNMLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxRQUNQLFdBQVcsQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUM7QUFBQSxNQUNsRCxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDUCxLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixZQUFZLENBQUMsT0FBTyxLQUFLO0FBQUEsUUFDekIsU0FBUyxDQUFDLFVBQVUsY0FBYyxVQUFVLFlBQVk7QUFBQSxRQUN4RCxNQUFNLENBQUMsa0JBQWtCLGFBQWE7QUFBQSxRQUN0QyxXQUFXO0FBQUEsVUFDUCxnQkFBZ0I7QUFBQSxVQUNoQixjQUFjO0FBQUEsWUFDVixRQUFRO0FBQUEsWUFDUixvQkFBb0IsQ0FBQyxJQUFJO0FBQUEsVUFDN0IsQ0FBQztBQUFBLFFBQ0w7QUFBQSxNQUNKLENBQUM7QUFBQSxNQUNELE1BQU07QUFBQSxRQUNGLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLFVBQVU7QUFBQSxRQUNWLG1CQUFtQjtBQUFBLFVBQ2YsSUFBSSxxQkFBcUIsb0JBQW9CO0FBQUEsUUFDakQ7QUFBQSxNQUNKLENBQUM7QUFBQSxJQUNMO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDSixLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDSCxDQUFDLGNBQWMsR0FBRztBQUFBLFVBQ2QsUUFBUTtBQUFBLFVBQ1IsSUFBSTtBQUFBLFVBQ0osY0FBYztBQUFBLFFBQ2xCO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
