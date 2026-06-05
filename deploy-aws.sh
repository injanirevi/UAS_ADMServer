#!/bin/bash

# ================================================
# AWS EC2 Deployment Bootstrap Script
# Jalankan script ini di EC2 setelah GitHub Actions deploy untuk setup manual
# ================================================

set -e

echo "🚀 Starting AWS EC2 Deployment Setup..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ================================================
# 1. Update System
# ================================================
echo -e "${YELLOW}Step 1: Updating system...${NC}"
sudo apt-get update -y
sudo apt-get upgrade -y
echo -e "${GREEN}✓ System updated${NC}"

# ================================================
# 2. Install Docker (if not already)
# ================================================
echo -e "${YELLOW}Step 2: Checking Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker ubuntu
    echo -e "${GREEN}✓ Docker installed${NC}"
else
    echo -e "${GREEN}✓ Docker already installed${NC}"
fi

# ================================================
# 3. Install Docker Compose (if not already)
# ================================================
echo -e "${YELLOW}Step 3: Checking Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✓ Docker Compose installed${NC}"
else
    echo -e "${GREEN}✓ Docker Compose already installed${NC}"
fi

# ================================================
# 4. Start Docker daemon
# ================================================
echo -e "${YELLOW}Step 4: Starting Docker daemon...${NC}"
sudo systemctl start docker
sudo systemctl enable docker
echo -e "${GREEN}✓ Docker daemon started${NC}"

# ================================================
# 5. Create app directory
# ================================================
echo -e "${YELLOW}Step 5: Creating app directory...${NC}"
mkdir -p ~/uas-app
cd ~/uas-app
echo -e "${GREEN}✓ App directory created${NC}"

# ================================================
# 6. Download docker-compose.prod.yml
# ================================================
echo -e "${YELLOW}Step 6: Downloading docker-compose.prod.yml...${NC}"
curl -fsSL https://raw.githubusercontent.com/injanirevi/UAS_ADMServer/main/docker-compose.prod.yml -o docker-compose.yml
echo -e "${GREEN}✓ docker-compose.yml downloaded${NC}"

# ================================================
# 7. Create .env file
# ================================================
echo -e "${YELLOW}Step 7: Creating .env file...${NC}"
read -p "Enter DockerHub Username (default: reviinjani): " DOCKERHUB_USERNAME
DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME:-reviinjani}

read -p "Enter Database User (default: userwebdinamis): " DB_USER
DB_USER=${DB_USER:-userwebdinamis}

DB_PASSWORD=

read -p "Enter Database Name (default: dbcompro_2388010027): " DB_NAME
DB_NAME=${DB_NAME:-dbcompro_2388010027}

read -p "Enter NEXTAUTH_SECRET (min 32 chars): " NEXTAUTH_SECRET
while [ ${#NEXTAUTH_SECRET} -lt 32 ]; do
    echo -e "${RED}✗ Secret must be at least 32 characters${NC}"
    read -p "Enter NEXTAUTH_SECRET (min 32 chars): " NEXTAUTH_SECRET
done

# Create .env file
cat > .env << EOF
DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME}
DB_USER=${DB_USER}
DB_PASSWORD=
DB_NAME=${DB_NAME}
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
EOF

echo -e "${GREEN}✓ .env file created${NC}"

# ================================================
# 8. Pull Docker images
# ================================================
echo -e "${YELLOW}Step 8: Pulling Docker images...${NC}"
docker-compose pull
echo -e "${GREEN}✓ Images pulled${NC}"

# ================================================
# 9. Start containers
# ================================================
echo -e "${YELLOW}Step 9: Starting containers...${NC}"
docker-compose up -d
echo -e "${GREEN}✓ Containers started${NC}"

# ================================================
# 10. Health check
# ================================================
echo -e "${YELLOW}Step 10: Checking container status...${NC}"
sleep 5
docker-compose ps
echo -e "${GREEN}✓ Health check complete${NC}"

# ================================================
# 11. Display access information
# ================================================
echo -e "\n${GREEN}==========================================="
echo "✓ Deployment completed successfully!"
echo "==========================================="
echo -e "${NC}"
echo "Access your applications:"
echo -e "${GREEN}• Static Site: http://13.229.108.94${NC}"
echo -e "${GREEN}• Dynamic App: http://13.229.108.94:3000${NC}"
echo ""
echo "Database details:"
echo "• Host: uas-db"
echo "• Port: 3306"
echo -e "• Database: ${DB_NAME}${NC}"
echo ""
echo "Useful commands:"
echo "• View logs:        docker-compose logs -f"
echo "• Stop containers:  docker-compose down"
echo "• Restart:          docker-compose up -d"
echo -e "• View status:      docker-compose ps${NC}\n"
