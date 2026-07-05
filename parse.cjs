const fs = require('fs');
const r = JSON.parse(fs.readFileSync('./lighthouse-mobile.json', 'utf8'));
console.log('Mobile Scores:');
for (const k in r.categories) {
  console.log(`  ${k}: ${r.categories[k].score * 100}`);
}
const perfs = r.categories.performance.auditRefs.filter(a => a.weight > 0 && r.audits[a.id].score < 1);
console.log('\nMobile Opportunities:');
perfs.forEach(a => {
  console.log(`  ${r.audits[a.id].title}: ${r.audits[a.id].displayValue || 'N/A'}`);
});
