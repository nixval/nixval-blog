#!/bin/bash

if [ -z "$1" ]; then
  echo "Error: Please give post title."
  echo "Usage: ./new-post.sh \"My post title\""
  exit 1
fi

TITLE="$1"
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed -e 's/[^a-zA-Z0-9 ]/-/g' -e 's/ /-/g' -e 's/-\+/-/g')
DATE=$(date +%Y-%m-%d)

TARGET_DIR="src/content/blog/$SLUG"
TARGET_FILE="$TARGET_DIR/index.md"

if [ -d "$TARGET_DIR" ]; then
  echo "Error: posts with that slugg '$SLUG' already created!"
  exit 1
fi
mkdir -p "$TARGET_DIR"
cat <<EOF > "$TARGET_FILE"
---
title: "$TITLE"
description: "Descriptions of $TITLE..."
pubDate: "$DATE"
updatedDate: "$DATE"
heroImage: "./hero.jpg"
tags: ["untagged"]
draft: true
# series: "Nama Series"
# seriesOrder: 1
---

Write your article here...
EOF

echo "✅ Created Succesfully: $TARGET_FILE"
echo "📂 Folder Assets: $TARGET_DIR"
