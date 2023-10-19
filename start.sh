# backend
cd backend
docker-compose up -d

cd cinemateket
dotnet run &

cd ../..

# frontend
cd frontend
npm install
npm run dev