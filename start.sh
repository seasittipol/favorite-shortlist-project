#!/bin/bash

# Quick Start Script for Favorite Shortlist Project
# This script helps you get started quickly with the project

echo "🚀 Favorite Shortlist Project - Quick Start"
echo "=========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v sudo docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Function to show menu
show_menu() {
    echo "Choose an option:"
    echo "1) Start all services (Frontend + Backend + Database)"
    echo "2) Start only frontend"
    echo "3) Start only backend and database"
    echo "4) Stop all services"
    echo "5) View logs"
    echo "6) Rebuild and start"
    echo "7) Clean up (remove containers and volumes)"
    echo "8) Exit"
    echo ""
}

# Function to start all services
start_all() {
    echo "🚀 Starting all services..."
    sudo docker-compose up -d
    echo ""
    echo "✅ All services started!"
    echo ""
    echo "📍 Access your applications:"
    echo "   Frontend:  http://localhost:3000"
    echo "   Backend:   http://localhost:3001"
    echo "   API Docs:  http://localhost:3001/api"
    echo "   pgAdmin:   http://localhost:8080"
    echo ""
}

# Function to start only frontend
start_frontend() {
    echo "🎨 Starting frontend only..."
    sudo docker-compose up -d frontend
    echo ""
    echo "✅ Frontend started!"
    echo "📍 Access at: http://localhost:3000"
    echo ""
}

# Function to start backend and database
start_backend() {
    echo "⚙️  Starting backend and database..."
    sudo docker-compose up -d backend db pgadmin
    echo ""
    echo "✅ Backend services started!"
    echo "📍 Access your services:"
    echo "   Backend:   http://localhost:3001"
    echo "   API Docs:  http://localhost:3001/api"
    echo "   pgAdmin:   http://localhost:8080"
    echo ""
}

# Function to stop all services
stop_all() {
    echo "🛑 Stopping all services..."
    sudo docker-compose down
    echo "✅ All services stopped!"
    echo ""
}

# Function to view logs
view_logs() {
    echo "📋 Viewing logs (Ctrl+C to exit)..."
    sudo docker-compose logs -f
}

# Function to rebuild and start
rebuild() {
    echo "🔨 Rebuilding and starting services..."
    sudo docker-compose up -d --build
    echo ""
    echo "✅ Services rebuilt and started!"
    echo ""
    echo "📍 Access your applications:"
    echo "   Frontend:  http://localhost:3000"
    echo "   Backend:   http://localhost:3001"
    echo "   API Docs:  http://localhost:3001/api"
    echo "   pgAdmin:   http://localhost:8080"
    echo ""
}

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up containers and volumes..."
    read -p "⚠️  This will remove all data. Are you sure? (y/N): " confirm
    if [[ $confirm == [yY] ]]; then
        sudo docker-compose down -v
        echo "✅ Cleanup complete!"
    else
        echo "❌ Cleanup cancelled"
    fi
    echo ""
}

# Main loop
while true; do
    show_menu
    read -p "Enter your choice (1-8): " choice
    echo ""
    
    case $choice in
        1)
            start_all
            ;;
        2)
            start_frontend
            ;;
        3)
            start_backend
            ;;
        4)
            stop_all
            ;;
        5)
            view_logs
            ;;
        6)
            rebuild
            ;;
        7)
            cleanup
            ;;
        8)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please choose 1-8."
            echo ""
            ;;
    esac
done
