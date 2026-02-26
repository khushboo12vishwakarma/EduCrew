FROM python:3.11-slim

# Create non-root user
RUN useradd -ms /bin/bash sandbox

WORKDIR /app

# Make /app writable by sandbox user
RUN chown sandbox:sandbox /app

USER sandbox

# No extra packages for now
CMD ["python", "main.py"]


docker run --rm \
  --cpus="0.5" -m "512m" --memory-swap "512m" \
  --network none \
  gcc:14.2.0 ...


docker run --rm \
  --cpus="0.5" \
  -m "512m" \
  --memory-swap "512m" \
  gcc:14.2.0 ...

  
docker run --rm \
  --cpus="0.5" -m "512m" --memory-swap "512m" \
  --network none \
  gcc:14.2.0 bash -lc \
  "timeout 5s ./run_user_code.sh"
