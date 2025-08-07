#!/bin/bash

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;94m'
NC='\033[0m' # No Color

# Environment
INSTALL_DIR="/opt/Lodestar-Forge"
REPO_URL="https://github.com/c0nf1den71al/Lodestar-Forge"
DOCKER_COMPOSE_VERSION="2.24.6"

echo "${BLUE}Lodestar-Forge Quick Installer${NC}"

# --- Functions ---

install_docker() {
    echo "${BLUE}Checking Docker installation...${NC}"
    if ! command -v docker &> /dev/null; then
        echo "${BLUE}Docker not found. Installing Docker...${NC}"
        curl -fsSL https://get.docker.com | sh
        sudo usermod -aG docker $USER
        echo "${GREEN}Docker installed. You may need to restart your terminal or log out/in for permissions to apply.${NC}"
    else
        echo "${GREEN}Docker is already installed.${NC}"
    fi

    # Re-check to see if docker is usable (use sudo fallback)
    if ! sudo docker version &> /dev/null; then
        echo "${BLUE}Docker installed but not accessible to current user. Using sudo for docker commands...${NC}"
        export USE_SUDO=true
    fi
}

install_docker_compose() {
    echo "${BLUE}Checking Docker Compose...${NC}"

    if ! sudo docker compose version &> /dev/null; then
        echo "${BLUE}Docker Compose not found or not working. Installing...${NC}"
        sudo curl -L "https://github.com/docker/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    else
        echo "${GREEN}Docker Compose is already installed and working.${NC}"
    fi
}

clone_or_update_repo() {
    echo "${BLUE}Setting up Lodestar Forge in ${INSTALL_DIR}...${NC}"
    if [ -d "$INSTALL_DIR/.git" ]; then
        echo "${GREEN}Repository already exists. Pulling latest changes...${NC}"
        sudo git -C "$INSTALL_DIR" pull
    else
        echo "${BLUE}Cloning repository...${NC}"
        sudo rm -rf "$INSTALL_DIR"
        sudo git clone "$REPO_URL" "$INSTALL_DIR"
    fi
    sudo chown -R "$USER":"$USER" "$INSTALL_DIR"
}

configure_project() {
    if [ ! -f "$INSTALL_DIR/.env" ]; then
        echo "${BLUE}Configuring Lodestar Forge...${NC}"
        sudo cp "$INSTALL_DIR/example.env" "$INSTALL_DIR/.env"

        echo "${BLUE}Generating secrets...${NC}"

        COUNT=$(grep -o "REPLACE_WITH_SECRET_STRING" "$INSTALL_DIR/.env" | wc -l)

        i=1
        while [ "$i" -le "$COUNT" ]; do
            SECRET=$(openssl rand -hex 32)
            sed -i "0,/REPLACE_WITH_SECRET_STRING/s|REPLACE_WITH_SECRET_STRING|$SECRET|" "$INSTALL_DIR/.env"
            i=$((i + 1))
        done

        echo "${GREEN}Lodestar Forge successfully configured...${NC}"
    else
        echo "${GREEN}Lodestar Forge already configured. Skipping...${NC}"
    fi

}

start_project() {
    echo "${BLUE}Starting Lodestar-Forge using Docker Compose...${NC}"
    cd "$INSTALL_DIR"

    if [ "$USE_SUDO" = true ]; then
        sudo docker compose up -d --build
    else
        docker compose up -d --build
    fi

    echo "${GREEN}Lodestar-Forge is now running!${NC}"
}

show_admin_credentials() {
    echo "${BLUE}Waiting for nucleus container to initialize...${NC}"

    # Wait for the container to be healthy or log output
    sleep 20  # adjust this if needed

    echo "${BLUE}Retrieving admin credentials from container logs...${NC}"

    CONTAINER_ID=$(sudo docker ps --filter "name=nucleus" --format "{{.ID}}" | head -n 1)

    # Get logs and extract the password line
    CREDENTIAL_LINE=$(sudo docker logs "$CONTAINER_ID" 2>&1 | grep -A 2 "Forge Admin Credentials" | grep "Password")

    if [ -n "$CREDENTIAL_LINE" ]; then
        PASSWORD=$(echo "$CREDENTIAL_LINE" | awk -F'Password: ' '{print $2}')
        echo "${GREEN}Lodestar Forge is now running. The following credentials can be used to access the application: ${NC}"
        echo " "
        echo "${BLUE}Email: admin@lodestar-forge.local${NC}"
        echo "${BLUE}Password: $PASSWORD${NC}"
    fi
}


# --- Execution ---

install_docker
install_docker_compose
clone_or_update_repo
configure_project
start_project
show_admin_credentials
