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
	gem install jekyll -v '~> 3.10.0' && \
	gem install kramdown-parser-gfm -v '~> 1.1.0' && \
	gem install jekyll-theme-minimal -v '~> 0.1.1' && \
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

# Download source code for v1 from GitHub
RUN wget -O app.tar.gz https://github.com/matiboux/matiboux.me/archive/refs/heads/v1.tar.gz && \
	tar -xzf app.tar.gz --strip-components=1 && \
	rm app.tar.gz

# Set baseurl to '/v1'
RUN if grep -q '^baseurl:.*$' _config.yml; then \
		sed -i 's/^baseurl:.*$/baseurl: \/v1/' _config.yml; \
	else \
		echo "baseurl: /v1" >> _config.yml; \
	fi

# Set theme to 'jekyll-theme-minimal'
RUN if ! grep -q '^theme:.*$' _config.yml; then \
		echo "theme: jekyll-theme-minimal" >> _config.yml; \
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

# Make 'v1' directory
RUN mkdir -p ./v1

# Copy built static website files
COPY --from=app_prod_build --link /app/_site ./v1
