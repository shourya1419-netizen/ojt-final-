#!/usr/bin/env bash
# Exit on error
set -o errexit

# Navigate to the project directory (handles spaces safely)
cd "demo ojt"

# Run Gunicorn
# 1. Bind to 0.0.0.0 (required for Render to reach the app)
# 2. Use the PORT environment variable provided by Render (defaults to 10000 if missing)
exec gunicorn mysite.wsgi:application --bind 0.0.0.0:${PORT:-10000}
