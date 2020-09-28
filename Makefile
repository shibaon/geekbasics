deploy.update:
	pull.master build

pull.master:
	git pull origin master

build:
	npm install && npm run build
