VERSION?=v0.0.1
IMAGE?=abernathy
BUILDER_IMAGE=$(IMAGE)-builder

.PHONY: images
images:
	docker build -t $(BUILDER_IMAGE):latest --target build-env .


.PHONY: static
static:
	docker build -t $(IMAGE):latest .
	docker run -ti --rm \
	--name $(IMAGE) \
	-p 1234:80 \
	$(IMAGE):latest


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
	  --name $(IMAGE) \
		-v $(PWD):/app \
		-v /app/node_modules \
		-v /app/public \
		-p 3000:3000 \
		$(BUILDER_IMAGE) gulp serve


.PHONY: design.stop
design.stop:
	docker rm -f $(IMAGE)

.PHONY: ipaddress
ipaddress:
	ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | grep -v '172.'

	
