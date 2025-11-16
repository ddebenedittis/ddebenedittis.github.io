FROM node:lts AS dev

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy initial source files
COPY . .

EXPOSE 4321
CMD ["npm", "run", "dev"]