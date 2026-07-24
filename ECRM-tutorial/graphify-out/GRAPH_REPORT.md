# Graph Report - .  (2026-07-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 93 nodes · 70 edges · 25 communities (19 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `761e6660`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- create_doc.js
- package.json
- dependencies
- server.js
- seed_admin.js
- patch_html.js
- login.js
- vercel.json
- register.js
- submissions.js
- tasks.js
- setup_db.js
- merge_pages.py
- realtime.js

## God Nodes (most connected - your core abstractions)
1. `scripts` - 3 edges
2. `bcryptjs` - 2 edges
3. `express` - 2 edges
4. `jsonwebtoken` - 2 edges
5. `pg` - 2 edges
6. `get_h2_text()` - 2 edges
7. `main()` - 2 edges
8. `{ Client }` - 1 edges
9. `bcrypt` - 1 edges
10. `jwt` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (25 total, 6 thin omitted)

### Community 0 - "create_doc.js"
Cohesion: 0.11
Nodes (7): border, borders, doc, {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak, LevelFormat, Header, Footer,
  TabStopType, TabStopPosition
}, fs, thickBorder, thickBorders

### Community 1 - "package.json"
Cohesion: 0.18
Nodes (10): author, description, keywords, license, main, name, scripts, start (+2 more)

### Community 2 - "dependencies"
Cohesion: 0.22
Nodes (9): bcryptjs, express, jsonwebtoken, dependencies, bcryptjs, express, jsonwebtoken, pg (+1 more)

### Community 3 - "server.js"
Cohesion: 0.29
Nodes (6): app, bcrypt, { Client }, express, jwt, path

### Community 4 - "seed_admin.js"
Cohesion: 0.40
Nodes (3): accounts, bcrypt, { Client }

### Community 5 - "patch_html.js"
Cohesion: 0.40
Nodes (4): fs, html, htmlPath, path

### Community 6 - "login.js"
Cohesion: 0.50
Nodes (3): bcrypt, { Client }, jwt

### Community 7 - "vercel.json"
Cohesion: 0.50
Nodes (3): builds, routes, version

## Knowledge Gaps
- **47 isolated node(s):** `{ Client }`, `bcrypt`, `jwt`, `{ Client }`, `{ Client }` (+42 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **What connects `{ Client }`, `bcrypt`, `jwt` to the rest of the system?**
  _47 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `create_doc.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._