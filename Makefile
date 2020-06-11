VERSION?=v0.0.1
IMAGE?=abernathy
BUILDER_IMAGE=$(IMAGE)-builder

.PHONY: images
images:
	docker build -t $(BUILDER_IMAGE):latest --target build-env .


.PHONY: static
static:
	docker build -t abernathy:latest .
	docker run -ti --rm \
	--name abernathy \
	-p 1234:80 \
	abernathy:latest


.PHONY: design.build
design.build:
	docker run -ti --rm \
		-v $(PWD):/app \
		-v /app/node_modules \
		-w /app \
		$(BUILDER_IMAGE) gulp build


.PHONY: design.icons
design.icons:
	docker run -ti --rm \
		-v $(PWD):/app \
		-v /app/node_modules \
		-w /app \
		$(BUILDER_IMAGE) gulp icons:build


.PHONY: design.watch
design.watch:
	docker run -ti --rm \
	  --name abernathy \
		-v $(PWD):/app \
		-v /app/node_modules \
		-v /app/public \
		-p 3000:3000 \
		-w /app/public \
		$(BUILDER_IMAGE) gulp serve


.PHONY: design.stop
design.stop:
	docker rm -f abernathy
