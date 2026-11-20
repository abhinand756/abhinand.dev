/**
 * JARVIS — safe Markdown renderer.
 *
 * A small, dependency-free renderer that turns Markdown into React elements.
 * Because it never uses `dangerouslySetInnerHTML`, raw HTML in a model
 * response is rendered as plain text — there is no XSS surface. Link
 * protocols are validated too, so `javascript:` and `data:` URLs are dropped.
 *
 * Supported: headings, bold, italic, strikethrough, inline code, fenced code
 * blocks, bullet + ordered lists (with one level of nesting), blockquotes,
 * horizontal rules, links and bare URLs.
 */

import React from "react";

/* ------------------------------------------------------------------ inline */

const CODE_SPAN = /`([^`\n]+)`/;
const BOLD = /\*\*([^*]+)\*\*|__([^_]+)__/;
const ITALIC = /\*([^*\n]+)\*|\*{3}([^*\n]+)\*{3}/;
const STRIKE = /~~([^~]+)~~/;
const LINK = /\[([^\]]*)\]\(([^)\s]+)\)/;
const AUTOLINK = /https?:\/\/[^\s<>()]+/;

interface InlineMatch {
  index: number;
  length: number;
  render: (key: string, depth: number) => React.ReactNode;
}

function firstMatch(text: string, patterns: Array<(t: string) => InlineMatch | null>): InlineMatch | null {
  let best: InlineMatch | null = null;
  for (const pattern of patterns) {
    const match = pattern(text);
    if (!match) continue;
    if (!best || match.index < best.index) best = match;
  }
  return best;
}

function matchCodeSpan(text: string): InlineMatch | null {
  const m = CODE_SPAN.exec(text);
  if (!m) return null;
  return {
    index: m.index,
    length: m[0].length,
    render: (key) => (
      <code
        key={key}
        className="rounded-md border border-[#1aa5c1]/25 bg-[#1aa5c1]/10 px-1.5 py-[1px] font-mono text-[12px] text-[#7dd6f6]"
      >
        {m[1]}
      </code>
    ),
  };
}

function matchBold(text: string): InlineMatch | null {
  const m = BOLD.exec(text);
  if (!m) return null;
  const inner = m[1] ?? m[2] ?? "";
  return {
    index: m.index,
    length: m[0].length,
    render: (key, depth) => (
      <strong key={key} className="font-semibold text-white">
        {parseInline(inner, depth + 1)}
      </strong>
    ),
  };
}

function matchItalic(text: string): InlineMatch | null {
  const m = ITALIC.exec(text);
  if (!m) return null;
  const inner = m[1] ?? m[2] ?? "";
  return {
    index: m.index,
    length: m[0].length,
    render: (key, depth) => (
      <em key={key} className="text-white/90 italic">
        {parseInline(inner, depth + 1)}
      </em>
    ),
  };
}

function matchStrike(text: string): InlineMatch | null {
  const m = STRIKE.exec(text);
  if (!m) return null;
  return {
    index: m.index,
    length: m[0].length,
    render: (key) => (
      <span key={key} className="text-white/50 line-through">
        {m[1]}
      </span>
    ),
  };
}

/** Only these URL shapes are allowed to become real links. */
function safeHref(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  if (value.startsWith("/") || value.startsWith("#")) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    const protocol = value.slice(0, value.indexOf(":") + 1).toLowerCase();
    return ["http:", "https:", "mailto:", "tel:"].includes(protocol) ? value : null;
  }
  return `https://${value}`;
}

function renderLink(key: string, label: React.ReactNode, rawHref: string): React.ReactNode {
  const href = safeHref(rawHref);
  if (!href) return <React.Fragment key={key}>{label}</React.Fragment>;
  const internal = href.startsWith("/") || href.startsWith("#");
  return (
    <a
      key={key}
      href={href}
      target={internal ? undefined : "_blank"}
      rel={internal ? undefined : "noopener noreferrer"}
      className="font-medium text-[#7dd6f6] underline decoration-[#1aa5c1]/50 decoration-dotted underline-offset-2 transition-colors hover:text-[#1aa5c1]"
    >
      {label}
    </a>
  );
}

function matchLink(text: string): InlineMatch | null {
  const m = LINK.exec(text);
  if (!m) return null;
  const label = m[1] || m[2];
  return {
    index: m.index,
    length: m[0].length,
    render: (key, depth) => renderLink(key, parseInline(label, depth + 1), m[2]),
  };
}

function matchAutolink(text: string): InlineMatch | null {
  const m = AUTOLINK.exec(text);
  if (!m) return null;
  let url = m[0];
  let trailing = "";
  while (url.length > 1 && /[.,;:!?]$/.test(url)) {
    trailing = url.slice(-1) + trailing;
    url = url.slice(0, -1);
  }
  const href = safeHref(url);
  return {
    index: m.index,
    length: m[0].length,
    render: (key) =>
      href ? (
        <React.Fragment key={key}>
          {renderLink(key, url, href)}
          {trailing}
        </React.Fragment>
      ) : (
        <React.Fragment key={key}>{m[0]}</React.Fragment>
      ),
  };
}

const INLINE_MATCHERS = [matchCodeSpan, matchLink, matchBold, matchItalic, matchStrike, matchAutolink];

function parseInline(text: string, depth = 0): React.ReactNode[] {
  if (!text) return [];
  if (depth > 4) return [text];

  const nodes: React.ReactNode[] = [];
  let rest = text;
  let key = 0;

  while (rest.length > 0) {
    const match = firstMatch(rest, INLINE_MATCHERS);
    if (!match || match.index >= rest.length) {
      nodes.push(rest);
      break;
    }
    if (match.index > 0) nodes.push(rest.slice(0, match.index));
    nodes.push(match.render(`i${depth}-${key++}`, depth));
    rest = rest.slice(match.index + match.length);
  }

  return nodes;
}

/* ------------------------------------------------------------------- blocks */

interface ListItemNode {
  text: string;
  children: ListItemNode[];
}

const LIST_ITEM = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
const HEADING = /^(#{1,6})\s+(.*)$/;
const FENCE = /^\s*```([^\s`]*)\s*$/;
const HR = /^\s*([-*_])(\s*\1){2,}\s*$/;
const BLOCKQUOTE = /^\s*>\s?(.*)$/;

function parseList(
  lines: string[],
  start: number,
  baseIndent: number
): { items: ListItemNode[]; next: number; ordered: boolean } {
  const items: ListItemNode[] = [];
  let i = start;
  let ordered = false;
  let first = true;

  while (i < lines.length) {
    const line = lines[i];
    const match = LIST_ITEM.exec(line);
    if (!match) break;

    const indent = match[1].length;
    if (indent < baseIndent) break;

    if (indent > baseIndent && items.length > 0) {
      const nested = parseList(lines, i, indent);
      items[items.length - 1].children.push(...nested.items);
      i = nested.next;
      continue;
    }

    if (indent > baseIndent) break;

    if (first) {
      ordered = /\d/.test(match[2]);
      first = false;
    }

    items.push({ text: match[3].trim(), children: [] });
    i += 1;
  }

  return { items, next: i, ordered };
}

function renderList(
  items: ListItemNode[],
  ordered: boolean,
  keyPrefix: string
): React.ReactNode {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag key={keyPrefix} className="my-1.5 flex flex-col gap-1.5 pl-0">
      {items.map((item, index) => (
        <li key={`${keyPrefix}-${index}`} className="flex gap-2 text-[13.5px] leading-relaxed text-white/80">
          <span
            aria-hidden
            className="mt-[1px] flex-shrink-0 select-none text-[11px] font-semibold text-[#1aa5c1]"
          >
            {ordered ? `${index + 1}.` : "✦"}
          </span>
          <span className="min-w-0 flex-1">
            {parseInline(item.text)}
            {item.children.length > 0 && renderList(item.children, ordered, `${keyPrefix}-${index}-sub`)}
          </span>
        </li>
      ))}
    </Tag>
  );
}

function renderHeading(level: number, text: string, key: string): React.ReactNode {
  const className =
    level <= 2
      ? "mt-3 mb-1.5 bg-gradient-to-r from-[#1aa5c1] to-[#497fed] bg-clip-text text-[15px] font-bold text-transparent first:mt-0"
      : level === 3
        ? "mt-3 mb-1 text-[13.5px] font-semibold text-[#7dd6f6] first:mt-0"
        : "mt-2 mb-1 text-[13px] font-semibold text-white/85 first:mt-0";
  const Tag = (["h1", "h2", "h3", "h4", "h5", "h6"] as const)[Math.min(level, 6) - 1];
  return (
    <Tag key={key} className={className}>
      {parseInline(text)}
    </Tag>
  );
}

function parseBlocks(content: string): React.ReactNode[] {
  const lines = content.replace(/\r\n?/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (!line.trim()) {
      i += 1;
      continue;
    }

    // Fenced code block
    const fence = FENCE.exec(line);
    if (fence) {
      const language = fence[1];
      const body: string[] = [];
      i += 1;
      while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) {
        body.push(lines[i]);
        i += 1;
      }
      i += 1; // consume closing fence (or run off the end while streaming)
      blocks.push(
        <pre
          key={`b${key++}`}
          className="my-2 overflow-x-auto rounded-xl border border-[#1aa5c1]/20 bg-black/50 p-3"
        >
          {language && (
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-[#1aa5c1]/60">
              {language}
            </span>
          )}
          <code className="font-mono text-[12px] leading-relaxed text-[#c6fafa] whitespace-pre">
            {body.join("\n")}
          </code>
        </pre>
      );
      continue;
    }

    // Horizontal rule
    if (HR.test(line)) {
      blocks.push(
        <div
          key={`b${key++}`}
          className="my-3 h-px w-full bg-gradient-to-r from-transparent via-[#1aa5c1]/40 to-transparent"
        />
      );
      i += 1;
      continue;
    }

    // Heading
    const heading = HEADING.exec(line);
    if (heading) {
      blocks.push(renderHeading(heading[1].length, heading[2].trim(), `b${key++}`));
      i += 1;
      continue;
    }

    // Blockquote
    if (BLOCKQUOTE.test(line)) {
      const quoted: string[] = [];
      while (i < lines.length) {
        const m = BLOCKQUOTE.exec(lines[i]);
        if (!m) break;
        quoted.push(m[1]);
        i += 1;
      }
      blocks.push(
        <blockquote
          key={`b${key++}`}
          className="my-2 rounded-r-lg border-l-2 border-[#1aa5c1]/60 bg-[#1aa5c1]/5 py-1.5 pl-3 pr-2 text-[13px] italic text-white/70"
        >
          {parseInline(quoted.join(" "))}
        </blockquote>
      );
      continue;
    }

    // List
    const listMatch = LIST_ITEM.exec(line);
    if (listMatch) {
      const { items, next, ordered } = parseList(lines, i, listMatch[1].length);
      blocks.push(renderList(items, ordered, `b${key++}`));
      i = next;
      continue;
    }

    // Paragraph — collect until a blank line or the start of another block
    const paragraph: string[] = [];
    while (i < lines.length) {
      const current = lines[i];
      if (
        !current.trim() ||
        FENCE.test(current) ||
        HR.test(current) ||
        HEADING.test(current) ||
        BLOCKQUOTE.test(current) ||
        LIST_ITEM.test(current)
      ) {
        break;
      }
      paragraph.push(current.trim());
      i += 1;
    }
    if (paragraph.length > 0) {
      blocks.push(
        <p key={`b${key++}`} className="my-1.5 text-[13.5px] leading-relaxed text-white/80 first:mt-0">
          {parseInline(paragraph.join(" "))}
        </p>
      );
    }
  }

  return blocks;
}

export function Markdown({ content }: { content: string }) {
  return <div className="jarvis-markdown break-words">{parseBlocks(content)}</div>;
}

export default Markdown;
