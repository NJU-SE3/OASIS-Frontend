source:
	rm -rf container/public/*
	cp -r oasis-frontend/dist/* container/public

denpend:
	cd oasis-frontend && npm i

build:
	cd oasis-frontend && npm run build

deploy:
	cd oasis-frontend && make resource deploy