# SHAYE frontend API client

Authentication now uses the backend API instead of checking plaintext
passwords in `localStorage`.

## Configuration

The API address is defined in `assets/js/api-config.js`. Development defaults
to:

```text
http://localhost:3000/api
```

Set `window.SHAYE_API_CONFIG.baseUrl` to the deployed HTTPS backend URL before
publishing the frontend. A `shaye_api_base_url` localStorage value can override
the default for development without editing the file.

## Session storage

- `shaye_auth_token`: seven-day JWT returned by the backend
- `shaye_api_user`: sanitized server user; never contains a password
- `shaye_current_user`: current email retained for compatibility
- `shaye_users`: temporary cache used by finance/task/team prototype screens

Registration, login, profile refresh, invite-code validation, logout and
sensitive password verification are server-backed. Finance, tasks and team data
still need dedicated backend endpoints in later phases.
