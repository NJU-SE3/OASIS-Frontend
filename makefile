source:
	rm -rf container/public/*
	cp -r oasis-frontend/dist/* container/public

denpend:
	cd oasis-frontend && npm install

deploy:
	cd oasis-frontend && make resource deploy 