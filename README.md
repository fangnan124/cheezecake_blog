# Cheezecake Blog

Life is good.

## Setup development environment

1. Create `.env`, `database.yml`, from related `.example` files and set all needed variables:

    ```bash
    cp .env.example .env
    cp config/database.yml.example config/database.yml
    cp config/master.key.example config/master.key
    ```

2. Create `docker-compose.override.yml` file with docker preferences for development environment:

    ```bash
    cp docker-compose.development.yml docker-compose.override.yml
    ```

3. Install [docker for mac](https://docs.docker.com/docker-for-mac/install/#download-docker-for-mac), then run:

    ```bash
    docker-compose build
    ```

4. Run the project:

    ```bash
    docker-compose up
    docker-compose up -d # Detached mode: Run containers in the background
    ```

5. Create development & test databases:

    ```bash
    docker-compose exec web rails db:create
    ```

6. Load schema & seeds:

    ```bash
    docker-compose exec web rails db:schema:load
    docker-compose exec web rails db:seed
    ```
    
## Commands to run before pushing to origin
    
1. Rubocop:

    ```bash
    rubocop
    ```
    
2. ESLint:

    ```bash
    ./node_modules/.bin/eslint "app/javascript/**" --fix
    ```
    
3. Rspec:

    ```bash
    rspec
    ```

## Useful Commands

1. Storybook:

    ```bash
    yarn run storybook
    ```
    
2. Credentials:

    ```bash
    docker-compose exec web env EDITOR=vim rails credentials:show
    docker-compose exec web env EDITOR=vim rails credentials:edit
    ```
