cp index.html bin/index.html
./node_modules/.bin/esbuild ./src/index.tsx --bundle --minify --sourcemap --target=chrome58,firefox57,safari11,edge16 --outfile=bin/index.js
cd bin
sleep 2 & open http://localhost:8000/ &
python3 -m http.server
