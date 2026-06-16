FROM node:lts AS dev

WORKDIR /app

# Use pnpm 8 + the committed lockfile (lockfileVersion 6.0), matching the deploy
# workflow. `npm install` fails here: @astrojs/tailwind is deprecated and its peer
# range excludes Astro 6, which npm treats as a hard ERESOLVE error while pnpm warns.
RUN corepack enable && corepack prepare pnpm@8 --activate
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

# Copy initial source files
COPY . .

EXPOSE 4321
CMD ["pnpm", "run", "dev"]
