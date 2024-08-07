#!/bin/bash

# Step 1: Build and start Docker containers in the background
(docker compose up --build &)

# Step 2: Frontend setup in the background
(
  cd frontend
  npm install --force
  npm run start &
)

# Wait for both processes to finish (optional)
wait
