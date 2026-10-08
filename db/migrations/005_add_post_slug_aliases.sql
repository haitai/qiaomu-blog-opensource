-- Track old article slugs so custom slug edits do not break editor/public links.
CREATE TABLE IF NOT EXISTS post_slug_aliases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  alias_slug TEXT UNIQUE NOT NULL,
  post_id INTEGER NOT NULL,
  canonical_slug TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_post_slug_aliases_post_id ON post_slug_aliases(post_id);
