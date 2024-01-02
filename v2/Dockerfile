#syntax=docker/dockerfile:1.4

# This Dockerfile uses the service folder as context.


# --
# Upstream images

FROM ruby:3.2-alpine AS ruby_upstream
FROM nginx:alpine AS nginx_upstream


# --
# Base image

FROM ruby_upstream AS app_base

# Create app directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache \
		build-base \
		&& \
	# Install Jekyll
	gem install jekyll && \
	# Clean up
	gem cleanup && \
	apk del --no-cache \
		build-base \
		&& \
	apk cache clean && \
	rm -rf /var/cache/apk/*

# --
# Prod build image

FROM app_base AS app_prod_build

ENV APP_ENV=prod
ENV NODE_ENV=production

# Download source code for v2 from GitHub
RUN wget -O app.tar.gz https://github.com/matiboux/matiboux.me/archive/refs/heads/v2.tar.gz && \
	tar -xzf app.tar.gz --strip-components=1 && \
	rm app.tar.gz

# Set baseurl to '/v2'
RUN if grep -q '^baseurl:.*$' _config.yml; then \
		sed -i 's/^baseurl:.*$/baseurl: \/v2/' _config.yml; \
	else \
		echo "baseurl: /v2" >> _config.yml; \
	fi

# Build application
RUN jekyll build


# --
# Prod image

FROM nginx_upstream AS app_prod

ENV APP_ENV=prod
ENV NODE_ENV=production

# Set app directory
WORKDIR /usr/share/nginx/html

# Make 'v2' directory
RUN mkdir -p ./v2

# Copy built static website files
COPY --from=app_prod_build --link /app/_site ./v2
