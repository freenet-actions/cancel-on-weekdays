# Cancel on Weekdays

[![LICENSE](https://img.shields.io/github/license/freenet-actions/cancel-on-weekdays)](./LICENSE)

This action cancels the workflow (or, to be exact, fails the step) if it was run on one of the specified weekdays.

## Inputs

### `blocked_days`

*Default: 'friday, saturday, sunday'*

A case-insensitive list of weekdays (1-7 or English weekday names) that workflows calling this action should be cancelled on. Separated either through lines, or commas, or both.

See below for more detailed info and examples.

**1 = Monday...7 = Sunday**

## Outputs

### `cancel_reason`

The reason of the cancellation of the workflow. Empty if the workflow was not cancelled.

## Usage

#### This action should be run before any steps that might affect any systems, preferably as the first step of the deployment process.

### Cancelling during the weekend (Friday to Sunday)

Note: This is the default behavior.

```yaml
uses: freenet-actions/cancel-on-weekdays@v2 # Please pin a commit hash instead.
```

### Cancelling on specific days

```yaml
uses: freenet-actions/cancel-on-weekdays@v2 # Please pin a commit hash instead.
with:
  blocked_days: |
    saturday
    sunday
    monday
```

### Cancelling on specific days (in a single line)

**Note:** Spaces after the commas are *optional*.

```yaml
uses: freenet-actions/cancel-on-weekdays@v2 # Please pin a commit hash instead.
with:
  blocked_days: 'saturday, sunday, monday'
```

### Cancelling on specific days (using numbers)

**Note:** Also works in a single line, see above.

```yaml
uses: freenet-actions/cancel-on-weekdays@v2 # Please pin a commit hash instead.
with:
  blocked_days: |
    6
    7
    1
```

### Cancelling based on workflow variables

#### Only cancelling on specific days if the `environment` input is `prod`

```yaml
if: inputs.environment == 'prod'
uses: freenet-actions/cancel-on-weekdays@v2 # Please pin a commit hash instead.
with:
  blocked_days: 'saturday, sunday, monday'
```

#### Only cancelling on specific days if the `enforce` input is `false`

```yaml
if: inputs.enforce == false
uses: freenet-actions/cancel-on-weekdays@v2 # Please pin a commit hash instead.
with:
  blocked_days: 'saturday, sunday, monday'
```
