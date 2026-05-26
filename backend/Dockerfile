FROM python:3.13-slim

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev pkg-config gcc \
    && rm -rf /var/lib/apt/lists/*

# Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Collect static
RUN python3 manage.py collectstatic --noinput 2>/dev/null || true

EXPOSE 8000

CMD ["gunicorn", "buildranchi.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]