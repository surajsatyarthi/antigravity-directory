#!/bin/bash

# Script to find and kill runaway developmental processes
# prioritizing precision over brute-force.

echo "Searching for high-resource runaway development processes..."

# 1. Target the Antigravity Language Server specifically if it exceeds 30% CPU
LSP_PID=$(ps auxww | grep "language_server" | grep -v grep | awk '$3 > 30 {print $2}')

if [ ! -z "$LSP_PID" ]; then
    echo "Found runaway Language Server (PID: $LSP_PID). Terminating..."
    kill -9 $LSP_PID
else
    echo "Language Server is within normal parameters."
fi

# 2. Target orphaned next-dev or node processes
NODE_PIDS=$(ps auxww | grep "node" | grep -E "next-dev|webpack" | grep -v grep | awk '$3 > 20 {print $2}')

if [ ! -z "$NODE_PIDS" ]; then
    echo "Found runaway Node processes: $NODE_PIDS. Terminating..."
    kill -9 $NODE_PIDS
else
    echo "No significant runaway Node processes found."
fi

echo "Cleanup complete."
