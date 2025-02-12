FROM node:lts AS dev

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -D daisyui@latest
RUN npm install -D astro-theme-toggle

# Copy initial source files
COPY . .

EXPOSE 4321
CMD ["npm", "run", "dev"]