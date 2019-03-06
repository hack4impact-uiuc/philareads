#!/bin/bash
set -e
cd frontend
npm run build
cd ../
echo $(pwd)
rm -r backend/api/react_frontend/build || true
mkdir -p backend/api/react_frontend/
mv frontend/build backend/api/react_frontend
echo 'build folder should be in backend/api/react_frontend now!'
