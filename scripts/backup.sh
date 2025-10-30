#!/bin/bash

# Backup script for database
# Usage: bash scripts/backup.sh

set -e

echo "📦 Creating database backup..."

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/cinebook_db_$TIMESTAMP.archive"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup MongoDB
echo "Dumping MongoDB..."
docker-compose exec -T mongodb mongodump --uri="mongodb://cinebook:changeme@mongodb:27017/cinebook_db?authSource=admin" --archive=$BACKUP_FILE

# Compress backup
echo "Compressing backup..."
gzip $BACKUP_FILE

echo "✅ Backup completed: ${BACKUP_FILE}.gz"
echo "Backup size: $(du -h ${BACKUP_FILE}.gz | cut -f1)"

# Keep only last 7 backups
echo "Cleaning old backups (keeping last 7)..."
ls -t $BACKUP_DIR/*.gz | tail -n +8 | xargs -r rm

echo "✅ Backup management completed!"
