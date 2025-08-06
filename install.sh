#!/bin/bash

set -e

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Lodestar-Forge Quick Installer${NC}"

# --- Functions ---

install_docker() {
    echo -e "${GREEN}Checking Docker installation...${NC}"
    if ! command -v docker &> /dev/null; then
        echo -e "${GREEN}Docker not found. Installing Docker...${NC}"
        curl -fsSL https://get.docker.com | sh
        sudo usermod -aG docker $USER
        echo -e "${GREEN}Docker installed. You may need to restart your terminal for group changes to apply.${NC}"
    else
        echo -e "${GREEN}Docker is already installed.${NC}"
    fi
}

install_docker_compose() {
    echo -e "${GREEN}Checking Docker Compose...${NC}"
    if ! docker compose version &> /dev/null; then
        echo -e "${GREEN}Docker Compose not found. Installing...${NC}"
        DOCKER_COMPOSE_VERSION="2.24.6"
        sudo curl -L "https://github.com/docker/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    else
        echo -e "${GREEN}Docker Compose is already installed.${NC}"
    fi
}

clone_repo() {
    REPO_URL="https://github.com/c0nf1den71al/Lodestar-Forge"
    if [ ! -d "Lodestar-Forge" ]; then
        echo -e "${GREEN}Cloning Lodestar-Forge...${NC}"
        git clone "$REPO_URL"
    else
        echo -e "${GREEN}Lodestar-Forge directory already exists. Skipping clone.${NC}"
    fi
}

start_project() {
    echo -e "${GREEN}Starting Lodestar-Forge using Docker Compose...${NC}"
    cd Lodestar-Forge
    docker compose up -d --build
    echo -e "${GREEN}Lodestar-Forge is now running!${NC}"
}

# --- Execution ---

install_docker
install_docker_compose
clone_repo
start_project
