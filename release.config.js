export default {
  branches: [
    // Stable releases — semver tags 1.0.0, 1.2.3, etc.
    'main',

    // Feature-branch pre-releases.
    // Branch feat/my-button  → version 1.0.1-my-button.1  → npm tag: my-button
    // Branch feature/my-ui   → version 1.0.1-my-ui.1      → npm tag: my-ui
    // Install: npm install @datavac/ui-kit@my-button
    {
      name: 'feat/*',
      channel: '${name.replace(/^feat\\//, "").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}',
      prerelease: '${name.replace(/^feat\\//, "").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}',
    },
    {
      name: 'feature/*',
      channel: '${name.replace(/^feature\\//, "").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}',
      prerelease: '${name.replace(/^feature\\//, "").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}',
    },
  ],

  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',

    // Updates CHANGELOG.md (only on main; pre-release entries are minor noise on feat branches)
    '@semantic-release/changelog',

    // Publishes to npm with the correct dist-tag
    '@semantic-release/npm',

    // Commits updated package.json + CHANGELOG back to the branch and creates a GitHub release
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]',
      },
    ],
  ],
}
