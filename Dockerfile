FROM mhart/alpine-node:8.9
WORKDIR /app

# Create a /tmp/lock file for the healthcheck, which doesn't exist on alpine by default
RUN touch /tmp/lock

# Restore packages first to take advantage of cache
COPY package.json yarn.lock ./ 
# RUN yarn install --production=false
RUN yarn install --production=false

# Copy everything else
COPY . . 

EXPOSE 3000
HEALTHCHECK --interval=5s CMD [ -e /tmp/lock ] || exit 1
CMD ["yarn", "start"]