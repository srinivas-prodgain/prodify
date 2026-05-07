Use this prompt now. This one tells Codex to **query Axiom, make at least one code change if it finds any error log, and create a PR**.

````md id="78dp2q"
You have access to the Axiom MCP server.

This is a test project. You are allowed to create a branch and a pull request.

## Goal

Use Axiom MCP to find recent error logs. If you find at least one relevant error log, make at least one small code change related to the error and create a pull request.

This is a simulation/test workflow, so even if the issue is minor, still make one safe improvement related to the error.

## Allowed

- Use `listDatasets`.
- Use `getDatasetInfoAndSchema`.
- Use `queryApl`.
- Query read-only Axiom log data.
- Inspect the codebase.
- Modify code.
- Add or update tests.
- Create a pull request.
- Make at least one safe change if any error log is found.

## Not allowed

- Do not modify secrets or `.env` files.
- Do not modify auth, billing, permissions, database migrations, infrastructure, or deployment config.
- Do not modify Axiom dashboards, monitors, alerts, or datasets.
- Do not query PII fields.
- Do not make unrelated large refactors.
- Do not auto-merge the PR.

## Process

1. List available Axiom datasets.
2. Pick the most likely application log dataset.
   - Prefer names like `logs`, `app`, `prod`, `production`, `test`, `http`, `reports`, or service-specific names.
   - Avoid `axiom-audit` unless it is the only option.
3. Inspect the schema of the chosen dataset.
4. Query recent error logs.

If the dataset has `level` and `environment`, use this pattern:

```apl
['DATASET_NAME']
| where environment == "production"
| where level in ("error", "fatal")
| order by _time desc
| limit 10
````

If there is no `environment` field:

```apl
['DATASET_NAME']
| where level in ("error", "fatal")
| order by _time desc
| limit 10
```

If there is no `level` field, look for error indicators such as:

* severity
* status
* status_code
* error
* exception
* message

For HTTP logs, treat `status_code >= 500` as an error.

## Required behavior if any error log is found

If at least one error log is found:

1. Identify the most actionable error.
2. Inspect the codebase for related files.
3. Make one small safe change related to the error.
4. Add or update a test if possible.
5. Run the relevant test/build/lint command if available.
6. Create a pull request.

The change may be small, for example:

* add a missing null/undefined guard
* improve error handling
* add safer parsing
* add a fallback value
* add a defensive check
* improve logging around the failure path
* add a test covering the failure path

Do not stop with only a summary if an error log exists. For this test project, at least one PR must be created when any error log is found.

## If no error logs are found

If no error logs are found, do not create a fake fix. Instead summarize:

* datasets checked
* query used
* why no PR was created

## PR requirements

Create a PR with:

Title:

```text
fix: handle Axiom-reported test error
```

PR body must include:

* Dataset queried
* APL query used
* Error log found
* Root cause or likely cause
* Code change made
* Tests run
* Risk level
* Note that this is a test-project simulation

Do not auto-merge.

````

Also make sure your workflow has write permissions now:

```yaml id="c5g25k"
permissions:
  contents: write
  pull-requests: write
  issues: write
````

And use writable sandbox:

```yaml id="pk6p01"
sandbox: workspace-write
```

Not:

```yaml id="tt7p14"
sandbox: read-only
```
