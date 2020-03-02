target=root@lfm:/root/service/front

all: dist resource deploy

dist:
	npm run build

resource:
	scp -r nginx ${target}/.
	scp Dockerfile ${target}
	scp docker-compose.yml ${target}
	scp -r dist ${target}/.

deploy:
	ssh root@lfm 'cd service/front/ && docker-compose up -d --build'