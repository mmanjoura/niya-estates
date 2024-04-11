FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install --force --omit=dev 
RUN npm run build . --force --omit=dev
CMD ["npm", "start"]


# docker contain run -p :8080 by default
#---------------------------------------
# cd into frontend folder
# make sure you have docker installed and client running
# run this command to build the image
# docker build -t niya-frontend-app .
# run this command to test the container
# docker run -dp 3000:3000 niya-frontend-app
# list all running containers
# docker ps
# stop the container
# docker stop DOCKER_ID



# netstat -aon | findstr 8080
# taskkill /PID xxxx /F

#deloyment to GCP
# Enable cloud build api
# Enable Artifact Registry API
# gcloud auth login //if you have not logged in
# -- Tag the image with the registry name
# docker tag niya-frontend-app gcr.io/niya-voyage/niya-frontend-app
# -- give docker access to the registry
# gcloud auth configure-docker
# -- Push the image to the registry
# docker push gcr.io/niya-voyage/niya-frontend-app
# -- Googles Cloud Run service
# create a service



# Use the official Node.js 18 image from Docker Hub as the base image.
FROM node:18-alpine

# Set the working directory inside the container to /app.
WORKDIR /app

# Copy all files from the current directory (where the Dockerfile resides) into the /app directory in the container.
COPY . .

# Install dependencies using npm. 
# --force: Forces installation of all packages, even if the package folder already exists.
# --omit=dev: Skips installing development dependencies, which can save space and time for production deployments.
RUN npm install --force --omit=dev 

# Build the application. This could involve transpiling TypeScript/ES6, bundling assets, etc.
RUN npm run build

# Set the default command to run when the container starts.
# In this case, it starts the Node.js application using the 'npm start' command.
CMD ["npm", "start"]
