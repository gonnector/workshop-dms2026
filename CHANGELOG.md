# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed
- 프로젝트 지침 파일 `CLAUDE.md` → `AGENTS.md` 이름 변경 (내용 동일, 플랫폼 공통 지침 파일 통일. Claude Code v2.1.277+는 CLAUDE.md가 없으면 AGENTS.md를 읽음)

## [0.1.1] - 2026-03-22

### Added
- Playwright-based traffic simulation scripts (`scripts/`)
  - Main orchestrator (`simulate-traffic.ts`) with configurable concurrency and session count
  - 5 persona modules: Deal Hunter, Researcher, Trend Follower, Loyal Buyer, Window Shopper
  - Shared utilities for human-like interactions (gradual scroll, natural click, random delays)
  - Clarity tagging integration (data_source=simulation, cohort tags)
  - Randomized viewports (desktop/mobile) and user agents per session
  - Error resilience — failed sessions don't stop the simulation
  - `scripts/README.md` with setup and usage instructions

## [0.1.0] - 2026-03-22

### Added
- Comprehensive workshop design document (DESIGN.md)
  - E-commerce site (KOMMA) page structure and interaction design
  - Microsoft Clarity tagging strategy (custom tags, events, funnels)
  - 5 persona segments for simulated traffic
  - Claude Code analysis scenarios for STP methodology
- Project scaffolding (CLAUDE.md, README, LICENSE, .gitignore, .gitattributes)
