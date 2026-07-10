# QA Report — v2.2

The automated suite contains 59 passing tests across 14 files.

New Director coverage includes:

- validation of all built-in sequence references;
- branching choices and variable effects;
- conditional node skipping without applying blocked effects;
- preservation of imported node/option conditions and effects;
- event emission;
- nested interruption and resume behavior;
- explicit outcomes;
- custom library precedence;
- Conversation Studio conversion;
- global launch event dispatch;
- save migration to schema 10.

Commands validated:

```bash
npm run lint
npm run test
npm run build
npm run pwa:check
```
