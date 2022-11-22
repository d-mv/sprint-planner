 @PHONY: docker-build
 docker-build:
	docker build --pull --rm -f Dockerfile -t sprint-planner .

@PHONY: docker-run
docker-run:
    docker run --rm -it -p 8081:8081 sprint-planner