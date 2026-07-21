# SHAYE frontend API client

Authentication now uses the backend API instead of checking plaintext
passwords in `localStorage`.

## Configuration

The API address is defined in `assets/js/api-config.js`. The current testing
default is the public GitHub Codespaces backend:

```text
https://refactored-train-9vvj99975wy2x75q-3000.app.github.dev/api
```

The Codespace and its `npm start` process must remain running for this testing
address to work. If the Codespace is deleted and recreated, replace the default
with the newly generated public port URL. A `shaye_api_base_url` localStorage
value can override the default for development without editing the file.

## Session storage

- `shaye_auth_token`: seven-day JWT returned by the backend
- `shaye_api_user`: sanitized server user; never contains a password
- `shaye_current_user`: current email retained for compatibility
- `shaye_users`: temporary cache used by finance/task/team prototype screens

Registration, login, profile refresh, invite-code validation, logout and
sensitive password verification are server-backed. Finance, tasks and team data
still need dedicated backend endpoints in later phases.
