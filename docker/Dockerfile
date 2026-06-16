FROM node:lts AS dev

WORKDIR /app

# Use pnpm 8 + the committed lockfile (lockfileVersion 6.0), matching the deploy
# workflow. pnpm 9+ ignores the 6.0 lockfile and re-resolves dependencies; pnpm 8
# honors it, so installs here match exactly what CI deploys.
RUN corepack enable && corepack prepare pnpm@8 --activate
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

# Copy initial source files
COPY . .

EXPOSE 4321
CMD ["pnpm", "run", "dev"]
