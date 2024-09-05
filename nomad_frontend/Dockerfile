# Usa la imagen base de Node.js
FROM node:18

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Construye la aplicación
RUN npm run build

# Configura el contenedor para servir la aplicación
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
