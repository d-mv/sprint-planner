.PHONY: start
start:
	docker compose -p sprint-planner up

.PHONY: build-start
build-start:
	docker compose kill || true
	docker compose -p sprint-planner --env-file .env build
	docker compose -p sprint-planner up

.PHONY: re-build-start
re-build-start:
	docker compose kill || true
	docker compose -p sprint-planner --env-file .env build --no-cache
	docker compose -p sprint-planner up

.PHONY: build-start-local
build-start-local:
	docker compose kill || true
	docker compose -p sprint-planner --env-file .env.local build
	docker compose -p sprint-planner up