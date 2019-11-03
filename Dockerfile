#################################
### STAGE 1: Build do projeto ###
#################################

# Inserindo a imagem do Node versão 10.4 com o nome builder
FROM node:10.4 as builder

# Criar o diretorio e setar como o diretorio principal
RUN mkdir /vwalma
WORKDIR /vwalma

# Inserir o package json dentro do docker
COPY package.json /vwalma/package.json

# Roda o NPM INSTALL
RUN npm install

# Copia o projeto todo para a pasta principal
COPY . /vwalma

# Builda o projeto
RUN npm run build

#########################################
### STAGE 2: Configuração do Servidor ###
#########################################

# Inserindo a imagem do NGINX
FROM nginx:latest

#Removando arquivo de configuração default do nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copiando o arquivo de configuração do nginx para dentro do container
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

# Removendo a página default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Do container 'builder' pegar os artefatos da pasta dist e inserindo dentro do repositorio do nginx
# para que elas sejam servidas
COPY --from=builder /vwalma/build /usr/share/nginx/html

# Exportando a porta 8000
EXPOSE 80

# Rodando o servidor
CMD ["nginx", "-g", "daemon off;"]