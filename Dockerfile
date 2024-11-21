FROM node:lts AS dev

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -D daisyui@latest

# Copy initial source files
COPY . .

EXPOSE 4321
CMD ["npm", "run", "dev"]