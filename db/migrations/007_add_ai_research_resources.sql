-- Persistent external research resources and provider jobs for AI chat.
CREATE TABLE IF NOT EXISTS ai_research_resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_type TEXT NOT NULL,
  url TEXT NOT NULL,
  canonical_url TEXT NOT NULL UNIQUE,
  platform TEXT NOT NULL DEFAULT '',
  provider TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  title TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  content_text TEXT NOT NULL DEFAULT '',
  content_r2_key TEXT,
  content_hash TEXT NOT NULL DEFAULT '',
  error_message TEXT NOT NULL DEFAULT '',
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_ai_research_resources_type_status ON ai_research_resources(source_type, status, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_research_resources_platform ON ai_research_resources(platform, updated_at DESC);

CREATE TABLE IF NOT EXISTS ai_research_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_id INTEGER NOT NULL,
  provider TEXT NOT NULL,
  provider_task_id TEXT,
  provider_note_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  raw_status TEXT NOT NULL DEFAULT '',
  error_message TEXT NOT NULL DEFAULT '',
  last_polled_at INTEGER,
  next_poll_at INTEGER,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (resource_id) REFERENCES ai_research_resources(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_research_jobs_provider_task ON ai_research_jobs(provider, provider_task_id) WHERE provider_task_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_research_jobs_provider_note ON ai_research_jobs(provider, provider_note_id) WHERE provider_note_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_ai_research_jobs_resource ON ai_research_jobs(resource_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_research_jobs_status_poll ON ai_research_jobs(status, next_poll_at);

CREATE TABLE IF NOT EXISTS ai_research_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_id INTEGER NOT NULL,
  session_id TEXT,
  post_id INTEGER,
  slug TEXT,
  role TEXT NOT NULL DEFAULT 'source',
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (resource_id) REFERENCES ai_research_resources(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_ai_research_links_session ON ai_research_links(session_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_research_links_post ON ai_research_links(post_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_research_links_slug ON ai_research_links(slug, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_research_links_unique ON ai_research_links(
  resource_id,
  COALESCE(session_id, ''),
  COALESCE(post_id, 0),
  COALESCE(slug, ''),
  role
);
