#!/usr/bin/env node

let pkg = require('./package');
let repo = (pkg && pkg.repository) || 'https://github.com/ccheever/bunny2.git';
let readme = repo.replace(/\.git$/, '/blob/master/README.md');
console.log(`<script>
  window.location = ${JSON.stringify(readme)};
</script>`);
