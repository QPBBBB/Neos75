# Neos75

- Work in this repository at `D:/Git/Neos75`.
- Organize functional modules under `Code/Module/<ModuleName>`. Put utility implementations and command-line entry points in each module's `Utilities` directory.
- Use PascalCase for project-owned directories, filename stems, functions, methods, constants, variables, parameters, and local import bindings. Preserve standard Git/legal filenames, language-required identifiers, external API names, protocol/data keys, and unmodified third-party material.
- Keep portable Python 3.9 in `Tools/Python39`. Use its `python.exe -B` for Python utilities. Preserve runtime/package filenames required by Python. Record the runtime source and version in `Tools/Environment.json`.
- Keep original firmware, captures, downloaded references and analysis evidence under `Research`. Use PascalCase archive filenames and record original names and SHA256 hashes in `Research/Provenance.json`. Do not rewrite captured bytes merely to change naming.
- Vendor/reference files under `Research` are external evidence, not active project code; do not execute vendor applications or rename their internal identifiers.
- Do not retain test code, self-check command branches, test fixtures, temporary verification scripts, reports from temporary checks, or bytecode/cache directories. Run necessary verification outside the repository and remove temporary output afterwards. Keep the functional read-only probes and offline inspection tools.
- Device probes must retain their read-query restrictions. Never add configuration writes, unlock, reset, erase, bootloader or flashing actions as part of repository cleanup.
- Preserve the screen dimension discrepancy and other limitations documented in `Documentation/ResearchNotes.txt`.
- Do not commit or push unless requested.
