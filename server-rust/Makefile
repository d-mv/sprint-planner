# ARGS = -p $(PORT) -t $(GITLAB_TOKEN) -u $(GITLAB_BASE_URL) -j $(JIRA_BASE_URL) -c $(JIRA_CREDENTIALS)
# RUN = run -- $(ARGS)
RUN = run

.PHONY: start-watch
start-watch:
	cargo watch -x "$(RUN)"

.PHONY: run
run:
	cargo $(RUN)

# .PHONY: start
# start:
# 	./target/release/gitlab_metrics $(ARGS)

# .PHONY: build
# build:
# 	cargo build --release

# .PHONY: docker
# docker:
# 	docker build --pull --rm -t gitlab_metrics . && docker run --rm -it -p 8080:8080 gitlab_metrics

.PHONY: setup
setup:
	cargo install cargo-watch cargo-edit
