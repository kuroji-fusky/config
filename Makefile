all: install_js install_python

install_js:
  cd ./js; \
  pnpm install

install_python:
  cd updater; \
  
  @echo [Python] Setting up virtual environment...; \
  python -v venv venv; \
  source venv\Script\activate; \

  @echo [Python] Installing dependencies...; \
  pip install -r requirements.txt

cleanup:
  rm -rf node_modules/ __pycache__/