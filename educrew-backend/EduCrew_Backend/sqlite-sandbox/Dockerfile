FROM python:3.11-slim

RUN apt-get update >/dev/null 2>&1 && \
    apt-get install -y sqlite3 >/dev/null 2>&1 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
CMD ["bash"]
