#!/bin/bash

# Restore script for database
# Usage: bash scripts/restore.sh <backup_file>

set -e

if [ -z "$1" ]; then
    echo "Usage: bash scripts/restore.sh <backup_file>"
    echo "Example: bash scripts/restore.sh ./backups/cinebook_db_20251030_100000.archive.gz"
    exit 1
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "📥 Restoring database from backup..."

# Check if file is gzipped
if [[ $BACKUP_FILE == *.gz ]]; then
    echo "Decompressing backup..."
    TEMP_FILE="${BACKUP_FILE%.gz}"
    gunzip -c "$BACKUP_FILE" > "$TEMP_FILE"
    BACKUP_FILE="$TEMP_FILE"
fi

# Restore MongoDB
echo "Restoring MongoDB..."
docker-compose exec -T mongodb mongorestore --uri="mongodb://cinebook:changeme@mongodb:27017/?authSource=admin" --archive=$BACKUP_FILE

# Clean up temp file if it was created
if [[ "$1" == *.gz ]]; then
    rm "$BACKUP_FILE"
fi

echo "✅ Database restore completed!"
