#!/bin/bash
set -e
cd frontend
npm run build
cd ../
echo $(pwd)
rm -r backend/api/react_frontend/build || true
mv frontend/build backend/api/react_frontend
