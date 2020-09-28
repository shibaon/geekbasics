build:
	npm run build

deploy.update: pull.master build

pull.master:
	git pull origin master
