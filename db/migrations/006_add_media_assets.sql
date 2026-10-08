-- Global media asset library and per-article usage links.
CREATE TABLE IF NOT EXISTS media_assets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL DEFAULT 'image',
  source TEXT NOT NULL DEFAULT 'upload',
  r2_key TEXT,
  url TEXT NOT NULL UNIQUE,
  variants_json TEXT,
  mime_type TEXT,
  size_bytes INTEGER,
  width INTEGER,
  height INTEGER,
  alt TEXT,
  prompt TEXT,
  revised_prompt TEXT,
  model TEXT,
  provider_name TEXT,
  aspect_ratio TEXT,
  resolution TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_media_assets_type_created ON media_assets(type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_assets_source_created ON media_assets(source, created_at DESC);

CREATE TABLE IF NOT EXISTS article_asset_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_id INTEGER NOT NULL,
  post_id INTEGER,
  slug TEXT,
  role TEXT NOT NULL DEFAULT 'inline',
  section_title TEXT,
  section_number INTEGER,
  inserted_at INTEGER DEFAULT (strftime('%s', 'now')),
  tool_call_id TEXT,
  session_id TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (asset_id) REFERENCES media_assets(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_article_asset_links_asset_id ON article_asset_links(asset_id);
CREATE INDEX IF NOT EXISTS idx_article_asset_links_post_id ON article_asset_links(post_id, inserted_at DESC);
CREATE INDEX IF NOT EXISTS idx_article_asset_links_slug ON article_asset_links(slug, inserted_at DESC);

CREATE TABLE IF NOT EXISTS ai_chat_tool_actions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_call_id TEXT NOT NULL UNIQUE,
  session_id TEXT,
  post_id INTEGER,
  slug TEXT,
  action_type TEXT NOT NULL,
  asset_id INTEGER,
  status TEXT NOT NULL DEFAULT 'success',
  error_message TEXT,
  applied_at INTEGER DEFAULT (strftime('%s', 'now')),
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (asset_id) REFERENCES media_assets(id) ON DELETE SET NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_ai_chat_tool_actions_session ON ai_chat_tool_actions(session_id, applied_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_chat_tool_actions_post_id ON ai_chat_tool_actions(post_id, applied_at DESC);
