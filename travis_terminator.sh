#!/bin/bash
label=$(jq '.labels|.[0]|.name' selenium_test_run_logs/pr_labels.json);
labels=$(jq '.labels|.[]|.name' selenium_test_run_logs/pr_labels.json);
if [ "$label" = "null" ]; then
    echo "No label found. Build was skipped";
    # travis_terminate 0;
else
    echo "Label(s) found: " $labels;
fi