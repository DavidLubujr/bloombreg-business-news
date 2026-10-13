import fs from 'node:fs';
fs.rmSync('dist',{recursive:true,force:true});fs.cpSync('public','dist',{recursive:true});
const origin=process.env.URL || process.env.DEPLOY_PRIME_URL;
if(origin){let h=fs.readFileSync('dist/index.html','utf8');h=h.replaceAll('content="/assets/cyborg-floating.png"',`content="${origin}/assets/cyborg-floating.png"`);h=h.replace('</head>',`<meta property="og:url" content="${origin}"><link rel="canonical" href="${origin}"></head>`);fs.writeFileSync('dist/index.html',h);}
console.log('Netlify build passed');
