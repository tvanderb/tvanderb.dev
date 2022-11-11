SHELL := /bin/bash

all: start

start:
	yarn install
	node server.mjs

dev:
	npx serve -l tcp://127.0.0.1:3000 public_html
