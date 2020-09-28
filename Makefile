deploy.update: pull.master build.front

pull.master:
	git pull origin master

build.front:
	npm install && npm run build
