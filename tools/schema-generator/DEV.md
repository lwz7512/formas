# Schema Generator Development Mode

## Quick Start

To run the schema-generator in development mode with automatic rebuilding:

### Option 1: From the root directory
```bash
pnpm run dev:generator
```

### Option 2: From the schema-generator directory
```bash
cd tools/schema-generator
pnpm run dev
```

## How it works

1. **Watch Mode**: The `father-build --watch` command monitors all files in the `src/` directory
2. **Automatic Rebuild**: When you make changes to any source file, it automatically rebuilds the project
3. **Workspace Integration**: Since this is part of a pnpm workspace, other projects that depend on `@formas/fr-generator` will immediately see the changes

## Development Workflow

1. Start the development mode using one of the commands above
2. Make changes to files in `src/`
3. The build will automatically trigger and update the `dist/` directory
4. Other projects in the workspace will see the changes immediately

## Files being watched

- All files in `src/` directory are automatically watched by father-build
- The watch mode is controlled by the `--watch` flag, not configuration

## Stopping Development Mode

Press `Ctrl+C` to stop the watch process.

## Troubleshooting

If changes aren't being reflected:
1. Make sure the dev process is running
2. Check that you're editing files in the `src/` directory
3. Verify the build output in the `dist/` directory
4. Restart the dev process if needed

## Current Status

✅ **Development mode is now working!** The `father-build --watch` process is running and monitoring for changes. 