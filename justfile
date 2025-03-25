install: pnpm-install install-js install-python

install-js:
  cd js
  pnpm install

pnpm-install:
    if ! command -v pnpm >/dev/null 2>&1; then
        echo "PNPM not found, installing rn"
        npm install -g pnpm
    else
        echo "PNPM is installed on your system"
    fi

install-python:
  echo [Python] Setting up virtual environment...
  python -v venv venv
  source venv\Script\activate

  echo [Python] Installing dependencies...
  pip install -r requirements.txt

cleanup:
  rm -rf **/node_modules/ **/__pycache__/