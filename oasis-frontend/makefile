target=root@106.14.140.93:/root/service/front

all: build resource deploy

build:
	npm run build

resource:
	scp -r nginx ${target}/.
	scp Dockerfile ${target}
	scp docker-compose.yml ${target}
	scp -r dist ${target}/.

deploy:
	ssh root@106.14.140.93 'cd service/front/ && docker-compose up -d --build'
