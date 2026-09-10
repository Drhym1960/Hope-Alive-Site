FROM node:22-bookworm-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.33.3 --activate

COPY . .

RUN pnpm install --frozen-lockfile && pnpm run build:render

ENV NODE_ENV=production

EXPOSE 10000

CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
