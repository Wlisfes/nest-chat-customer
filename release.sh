#!/bin/bash
# ============================================================
#  nest-chat-customer 一键发布脚本
#  用法: bash release.sh [版本号]
#        bash release.sh v1.0.1      指定版本
#        bash release.sh             自动生成时间戳版本
#  流程: git pull -> docker build -> kubectl 滚动更新
# ============================================================
set -e
cd "$(dirname "$0")"

APP=nest-chat-customer

# 1. 确定版本号
VERSION="$1"
if [ -z "$VERSION" ]; then
  VERSION="v$(date +%Y%m%d-%H%M%S)"
fi

echo "==> [1/4] Pull latest code"
git pull origin master

echo "==> [2/4] Build image ${APP}:${VERSION}"
docker build -t "${APP}:${VERSION}" -t "${APP}:latest" .

echo "==> [3/4] Deploy to Kubernetes"
kubectl apply -f k8s/
kubectl set image "deployment/${APP}" "app=${APP}:${VERSION}"

echo "==> [4/4] Wait for rollout"
kubectl rollout status "deployment/${APP}" --timeout=180s

echo ""
echo "Released ${APP}:${VERSION}"
echo "Rollback:  kubectl rollout undo deployment/${APP}"
echo "History:   kubectl rollout history deployment/${APP}"
