FROM node:22-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
COPY ./prisma ./prisma
RUN DATABASE_URL="postgresql://tonytor:tonytor@localhost:5432/tonytor" npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]
