#syntax=docker/dockerfile:1

# This Dockerfile uses the service folder as context.


# --
# Upstream images

FROM ruby:3.2-alpine AS ruby_upstream
FROM nginx:1.29-alpine AS nginx_upstream


# --
# Prod build image

FROM ruby_upstream AS app_prod_build

# Create app directory
WORKDIR /app

# Set runtime environment
ENV APP_ENV=prod

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

# Download v1 source code from GitHub
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

# Set runtime environment
ENV APP_ENV=prod

# Copy nginx configuration
COPY --link ./nginx/default.conf.template /etc/nginx/templates/

# Copy app production built files
COPY --from=app_prod_build --link /app/_site/ /usr/share/nginx/html/v1/

# Set environment variables
ARG NGINX_HOST='local'
ENV NGINX_HOST=${NGINX_HOST}

# Set exposed port
ARG PORT='8080'
ENV NGINX_PORT=${PORT}
EXPOSE ${PORT}
