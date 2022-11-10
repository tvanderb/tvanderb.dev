SHELL := /bin/bash

serve:
	npx serve -l tcp://127.0.0.1:3000 public_html
