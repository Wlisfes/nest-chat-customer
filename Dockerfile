# ============================================================
#  nest-chat-customer 多阶段构建
#  Stage 1: node 构建 Vue 产物
#  Stage 2: nginx 承载静态文件, 生成独立发布镜像
# ============================================================

# ---- Stage 1: Build ----
FROM node:20-alpine AS builder
WORKDIR /app

# 先复制依赖清单, 利用 Docker 层缓存
COPY package.json package-lock.json ./
RUN npm install --registry=https://registry.npmmirror.com

# 复制源码并构建
COPY . .
RUN npx vite build

# ---- Stage 2: Runtime ----
FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1
