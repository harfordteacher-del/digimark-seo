const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const dir = __dirname;
const copy = JSON.parse(fs.readFileSync(path.join(dir, 'content.json'), 'utf8'));
const phone = (process.env.DFP_WHATSAPP || '').replace(/^\+/, '').replace(/\s/g, '');
if (phone && !/^[1-9]\d{7,14}$/.test(phone)) throw new Error('DFP_WHATSAPP harus berupa nomor internasional yang valid.');
const contactReady = Boolean(phone);
const palette = { navy:'#101828', secondary:'#1D2939', gold:'#D4A853', white:'#FFFFFF', light:'#F8FAFC', text:'#475467', border:'#E4E7EC' };
const escape = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dim = (top,right=top,bottom=top,left=right) => ({unit:'px',top:String(top),right:String(right),bottom:String(bottom),left:String(left),isLinked:top===right&&right===bottom&&bottom===left});
const slider = (size,unit='px') => ({unit,size,sizes:[]});
const gap = size => ({unit:'px',column:String(size),row:String(size),isLinked:true,size});
let sequence = 0;
const id = () => (++sequence).toString(16).padStart(7,'0');
const font = (family,size,mobile,weight='400',line=1.65) => ({
  typography_typography:'custom', typography_font_family:family, typography_font_size:slider(size),
  typography_font_size_mobile:slider(mobile), typography_font_weight:weight, typography_line_height:slider(line,'em'),
});
const widget = (type,settings) => ({id:id(),elType:'widget',widgetType:type,settings,elements:[],isInner:false});
function heading(text,tag='h2',options={}) {
  return widget('heading',{
    title:escape(text),html_tag:tag,title_color:options.color||palette.navy,
    ...font('Plus Jakarta Sans',options.size||38,options.mobile||28,options.weight||'700',options.line||1.2),
    ...options.settings,
  });
}
function paragraph(text,options={}) {
  return widget('text-editor',{
    editor:`<p>${escape(text)}</p>`,text_color:options.color||palette.text,
    ...font('Inter',options.size||16,options.mobile||16,options.weight||'400',options.line||1.7),
    ...options.settings,
  });
}
function label(text,dark=false) {
  return heading(text,'div',{size:14,mobile:14,weight:'700',line:1.5,color:dark?palette.gold:palette.text});
}
function button(text,url,kind='primary') {
  const colors=kind==='primary'?[palette.navy,palette.gold]:kind==='nav'?[palette.navy,'transparent']:[palette.navy,palette.white];
  return widget('button',{
    text,link:{url,is_external:'',nofollow:'',custom_attributes:''},align:'left',align_mobile:'left',
    ...font('Inter',kind==='nav'?14:16,kind==='nav'?14:16,'600',1.4),
    button_text_color:colors[0],background_background:'classic',background_color:colors[1],
    hover_color:palette.white,button_background_hover_background:'classic',button_background_hover_color:palette.secondary,
    border_border:kind==='secondary'?'solid':'none',border_color:palette.border,border_width:dim(kind==='secondary'?1:0),
    border_radius:dim(kind==='nav'?6:10),text_padding:kind==='nav'?dim(12,6):dim(15,22),
    _element_width:'auto',_element_width_mobile:'auto',
  });
}
function container(elements,settings={}) {
  return {id:id(),elType:'container',settings:{
    content_width:'full',container_type:'flex',flex_direction:'column',flex_gap:gap(16),
    padding:dim(0),width:slider(100,'%'),...settings,
  },elements,isInner:false};
}
function row(elements,settings={}) {
  return container(elements,{flex_direction:'row',flex_direction_mobile:'column',flex_align_items:'stretch',flex_wrap:'wrap',flex_gap:gap(24),...settings});
}
function section(anchor,elements,background=palette.white,settings={}) {
  return container(elements,{
    html_tag:'section',_element_id:anchor,content_width:'boxed',boxed_width:slider(1140),
    background_background:'classic',background_color:background,
    padding:dim(80,24),padding_tablet:dim(64,24),padding_mobile:dim(48,20),flex_gap:gap(32),...settings,
  });
}
function col(elements,width,settings={}) {
  return container(elements,{width:slider(width,'%'),width_mobile:slider(100,'%'),...settings});
}
function intro(data,dark=false) {
  return col([label(data.eyebrow,dark),heading(data.title,'h2',{color:dark?palette.white:palette.navy}),
    ...(data.description?[paragraph(data.description,{color:dark?'#D0D5DD':palette.text})]:[])],78,{width_mobile:slider(100,'%'),flex_gap:gap(12)});
}
function card(elements,width=31,settings={}) {
  return col(elements,width,{
    width_tablet:slider(48,'%'),background_background:'classic',background_color:palette.white,
    padding:dim(28),padding_mobile:dim(24),border_border:'solid',border_color:palette.border,
    border_width:dim(1),border_radius:dim(16),flex_gap:gap(18),...settings,
  });
}
function contactLink(inquiry='kebutuhan digital marketing') {
  return contactReady?`https://wa.me/${phone}?text=${encodeURIComponent(`Halo Dita, saya ingin membahas ${inquiry}. Nama bisnis: ... Website: ... Tujuan utama: ...`)}`:'#konsultasi';
}

const header=section('beranda',[
  row([
    col([heading(copy.brand,'div',{size:20,mobile:20}),paragraph(copy.role,{size:14,mobile:14})],37,{flex_gap:gap(2)}),
    col([row(copy.nav.map(n=>button(n.text,n.href,'nav')),{flex_direction_mobile:'row',flex_justify_content:'flex-end',flex_justify_content_mobile:'flex-start',flex_gap:gap(18),flex_gap_mobile:gap(14)})],58),
  ],{flex_align_items:'center',flex_gap:gap(24)}),
],palette.white,{html_tag:'header',padding:dim(22,24),padding_mobile:dim(20),border_border:'solid',border_width:dim(0,0,1,0),border_color:palette.border});

const portrait=widget('image',{
  image:{url:copy.portrait,id:0,alt:copy.portraitAlt},image_size:'full',width:slider(100,'%'),
  height:slider(520),height_tablet:slider(460),height_mobile:slider(370),'object-fit':'cover','object-position':'center center',
  image_border_radius:dim(18),caption_source:'none',link_to:'none',
});
const hero=section('utama',[
  row([
    col([
      label(copy.hero.eyebrow),heading(copy.hero.title,'h1',{size:54,mobile:34,line:1.15}),
      paragraph(copy.hero.description,{size:18,mobile:17}),
      row([button(copy.hero.primaryCta,contactLink()),button(copy.hero.secondaryCta,'#pengalaman','secondary')],{flex_direction_mobile:'row',flex_gap:gap(14)}),
      paragraph(copy.hero.note,{size:14,mobile:14}),
    ],55,{flex_gap:gap(24)}),
    col([portrait,row([
      col([heading(copy.hero.portraitCaption,'div',{size:17,mobile:17}),paragraph(copy.hero.portraitDetail,{size:14,mobile:14})],64,{flex_gap:gap(4)}),
      col([heading(copy.hero.experience,'div',{size:15,mobile:15,color:palette.navy})],32,{background_background:'classic',background_color:'#F8EDDA',padding:dim(10),border_radius:dim(8),flex_justify_content:'center'}),
    ],{flex_direction_mobile:'column',flex_gap:gap(12),flex_align_items:'center'})],40,{flex_gap:gap(16)}),
  ],{flex_gap:gap(40),flex_align_items:'center'}),
],palette.light,{padding:dim(64,24),padding_mobile:dim(40,20)});

const services=section('layanan',[
  intro(copy.services),
  row(copy.services.items.map((s,i)=>card([
    label(s.category),heading(s.title,'h3',{size:23,mobile:22}),paragraph(s.text),
    widget('text-editor',{editor:'<ul>'+s.details.map(t=>'<li>'+escape(t)+'</li>').join('')+'</ul>',text_color:palette.text,...font('Inter',16,16)}),
    button(s.cta,contactLink(s.inquiry),i===0?'primary':'secondary'),
  ])),{flex_gap:gap(24)}),
]);

const expertise=section('keahlian',[
  intro(copy.expertise),
  row(copy.expertise.items.map(s=>card([
    heading(s.title,'h3',{size:21,mobile:20}),paragraph(s.text),
  ],31,{background_color:palette.light,border_border:'none',padding:dim(24),border_radius:dim(12)})),{flex_gap:gap(24)}),
],palette.light);

const experience=section('pengalaman',[
  intro(copy.experience),
  row(copy.experience.items.map(s=>card([
    label(s.industry),heading(s.name,'h3',{size:24,mobile:22}),
    paragraph(s.role,{weight:'600',color:palette.navy}),paragraph(s.text),
  ])),{flex_gap:gap(24)}),
]);

const about=section('tentang',[
  row([
    col([label(copy.about.eyebrow,true),heading(copy.about.title,'h2',{color:palette.white,size:40,mobile:30})],39,{flex_gap:gap(16)}),
    col([...copy.about.paragraphs.map(p=>paragraph(p,{color:'#EAECF0'})),button(copy.about.cta,contactLink())],55,{flex_gap:gap(20)}),
  ],{flex_gap:gap(48)}),
],palette.navy);

const processSection=section('cara-kerja',[
  intro(copy.process),
  row(copy.process.items.map(s=>card([
    heading(s.title,'h3',{size:21,mobile:20}),paragraph(s.text),
  ],23,{width_tablet:slider(47,'%'),padding:dim(22),background_color:palette.light,border_border:'none'})),{flex_gap:gap(20)}),
]);

const faq=section('pertanyaan',[
  row([
    col([label(copy.faq.eyebrow),heading(copy.faq.title,'h2')],34,{flex_gap:gap(12)}),
    col(copy.faq.items.map(q=>container([
      heading(q.question,'h3',{size:20,mobile:19}),paragraph(q.answer),
    ],{padding:dim(0,0,24,0),border_border:'solid',border_width:dim(0,0,1,0),border_color:palette.border,flex_gap:gap(12)})),61,{flex_gap:gap(28)}),
  ],{flex_gap:gap(40)}),
],palette.light);

const contactChildren=[label(copy.contact.eyebrow,true),heading(copy.contact.title,'h2',{color:palette.white,size:42,mobile:30}),paragraph(copy.contact.text,{color:'#EAECF0',size:18,mobile:17})];
if(contactReady){contactChildren.push(button(copy.contact.cta,contactLink()));}
else {contactChildren.push(paragraph('Draf belum siap dipublikasikan: nomor WhatsApp pemilik perlu dikonfirmasi untuk mengaktifkan tombol konsultasi.',{color:'#F9DBA2',settings:{_element_id:'kontak-menunggu-konfirmasi'}}));}
contactChildren.push(paragraph(copy.contact.note,{color:'#D0D5DD',size:14,mobile:14}));
const contact=section('konsultasi',[col(contactChildren,85,{width_mobile:slider(100,'%'),flex_gap:gap(22)})],palette.navy);

const footer=section('privasi',[
  row([
    col([heading(copy.brand,'div',{size:18,mobile:18}),paragraph('Digital marketing · Medan, Sumatera Utara',{size:14,mobile:14})],50,{flex_gap:gap(6)}),
    col([paragraph('Pesan konsultasi melalui WhatsApp diproses menggunakan layanan WhatsApp untuk menanggapi kebutuhan Anda. Hindari mengirim data sensitif.',{size:14,mobile:14})],45),
  ],{flex_gap:gap(24)}),
  paragraph('© 2026 Dita Febiyan Pratiwi.',{size:14,mobile:14}),
],palette.white,{html_tag:'footer',padding:dim(32,24),padding_mobile:dim(28,20),flex_gap:gap(20)});

const main=container([hero,services,expertise,experience,about,processSection,faq,contact],{
  html_tag:'main',_element_id:'konten',flex_gap:gap(0),css_classes:'dfp-main',
});
const root=container([header,main,footer],{css_classes:'dfp-home',flex_gap:gap(0)});
function markNested(n,isRoot=false){if(n.elType==='container')n.isInner=!isRoot;for(const child of n.elements||[])markNested(child);}
markNested(root,true);
const template={version:'0.4',title:contactReady?'Dita — Homepage Elementor Free':'Dita — Homepage DRAF (kontak perlu diisi)',type:'page',content:[root],page_settings:{hide_title:'yes',background_background:'classic',background_color:palette.white}};

// The preview is generated from the same native-widget tree as the Elementor template.
// It is a reference rendering, not a claim of a tested WordPress/Elementor import.
const rules=[];
function cssValue(v){return typeof v==='object'&&v!==null&&'size'in v?`${v.size}${v.unit}`:v;}
function dims(v){return `${v.top}${v.unit} ${v.right}${v.unit} ${v.bottom}${v.unit} ${v.left}${v.unit}`;}
function styles(n,suffix=''){
 const s=n.settings,p=k=>s[k+suffix]??(suffix?undefined:s[k]);
 const styles=[];
 const add=(prop,key)=>{const v=p(key);if(v!==undefined&&v!==null&&v!=='')styles.push(`${prop}:${cssValue(v)}`);};
 if(n.elType==='container'){
  add('width','width');add('background','background_color');
  if(p('padding'))styles.push('padding:'+dims(p('padding')));
  if(p('border_radius'))styles.push('border-radius:'+dims(p('border_radius')));
  if(p('border_border')==='solid'){styles.push('border-style:solid');if(p('border_width'))styles.push('border-width:'+dims(p('border_width')));add('border-color','border_color');}
 }else{
  add('font-family','typography_font_family');add('font-size','typography_font_size');add('font-weight','typography_font_weight');add('line-height','typography_line_height');
  if(n.widgetType==='heading')add('color','title_color');else if(n.widgetType==='text-editor')add('color','text_color');
  if(n.widgetType==='button'){
   add('color','button_text_color');add('background','background_color');if(p('text_padding'))styles.push('padding:'+dims(p('text_padding')));
   if(p('border_radius'))styles.push('border-radius:'+dims(p('border_radius')));
   if(p('border_border')==='solid'){styles.push('border-style:solid');if(p('border_width'))styles.push('border-width:'+dims(p('border_width')));add('border-color','border_color');}
  }
  if(n.widgetType==='image'){
   add('width','width');add('height','height');add('object-fit','object-fit');add('object-position','object-position');
   if(p('image_border_radius'))styles.push('border-radius:'+dims(p('image_border_radius')));
  }
 }
 return styles.join(';');
}
function render(n){
 const cls='dfp-'+n.id;
 for(const [suffix,media] of [['',''],['_tablet','@media(max-width:1024px)'],['_mobile','@media(max-width:767px)']]){
  let selector='.'+cls;
  if(n.widgetType==='button')selector+=' a';
  else if(n.widgetType==='image')selector+=' img';
  const declarations=styles(n,suffix);
  const css=declarations?`${selector}{${declarations}}`:'';
  let layout='';
  if(n.elType==='container'){
   const s=n.settings,p=k=>s[k+suffix];
   const declarations=[];
   if(p('flex_direction'))declarations.push('flex-direction:'+p('flex_direction'));
   if(p('flex_wrap'))declarations.push('flex-wrap:'+p('flex_wrap'));
   if(p('flex_align_items'))declarations.push('align-items:'+p('flex_align_items'));
   if(p('flex_justify_content'))declarations.push('justify-content:'+p('flex_justify_content'));
   if(p('flex_gap'))declarations.push(`gap:${p('flex_gap').row}px ${p('flex_gap').column}px`);
   const inner=n.settings.content_width==='boxed'?'>.dfp-inner':'';
   if(declarations.length)layout=`.${cls}${inner}{${declarations.join(';')}}`;
  }
  if(css||layout)rules.push(media?`${media}{${css}${layout}}`:css+layout);
 }
 const attrId=n.settings._element_id?` id="${escape(n.settings._element_id)}"`:'';
 if(n.elType==='container'){
  const tag=n.settings.html_tag||'div';
  const body=n.elements.map(render).join('\n');
  return `<${tag}${attrId} class="${cls} dfp-container ${n.settings.css_classes||''}">${n.settings.content_width==='boxed'?`<div class="dfp-container dfp-inner">${body}</div>`:body}</${tag}>`;
 }
 const s=n.settings;
 if(n.widgetType==='heading')return `<${s.html_tag||'h2'}${attrId} class="${cls}">${s.title}</${s.html_tag||'h2'}>`;
 if(n.widgetType==='text-editor')return `<div${attrId} class="${cls} dfp-text">${s.editor}</div>`;
 if(n.widgetType==='image')return `<div class="${cls} dfp-image"><img src="${escape(s.image.url)}" alt="${escape(s.image.alt)}" width="960" height="1280" fetchpriority="high" decoding="async"></div>`;
 if(n.widgetType==='button')return `<div class="${cls} dfp-button"><a href="${escape(s.link.url)}">${escape(s.text)}</a></div>`;
 throw new Error('Unsupported widget '+n.widgetType);
}
const markup=render(root);
const baseCss=`*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:#475467;font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.7;background:#fff}h1,h2,h3,h4,p{margin:0}a{color:inherit}img{display:block;max-width:100%}.dfp-container{display:flex;min-width:0;flex-shrink:1}.dfp-inner{width:100%;max-width:1140px;margin-inline:auto}.dfp-button{width:auto;max-width:100%;flex-shrink:0}.dfp-button a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;text-decoration:none;border:0;transition:background .15s,color .15s}.dfp-button a:hover{background:#1D2939;color:#fff}.dfp-text ul{padding-left:20px;margin:0}.dfp-text li+li{margin-top:6px}.dfp-image{width:100%}.dfp-text{overflow-wrap:anywhere}[id]{scroll-margin-top:24px}:focus-visible{outline:3px solid #2563EB;outline-offset:5px}.dfp-preview-notice{font:14px/1.6 Inter,Arial,sans-serif;padding:12px 24px;background:#101828;color:#EAECF0;text-align:center}.skip-link{position:fixed;top:8px;left:8px;transform:translateY(-200%);z-index:20;background:#fff;padding:12px 20px;color:#101828}.skip-link:focus{transform:translateY(0)}@media(max-width:767px){.dfp-button{max-width:100%}.dfp-button a{white-space:normal;text-align:center}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}`;
const html=`<!doctype html>\n<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(copy.seo.title)} — Preview draf</title><meta name="description" content="${escape(copy.seo.description)}"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet"><style>${baseCss}\n${rules.join('\n')}</style></head><body><a class="skip-link" href="#konten">Lewati ke konten</a><div class="dfp-preview-notice">Preview draf homepage · ${contactReady?'Nomor WhatsApp telah dikonfigurasi.':'Nomor WhatsApp menunggu konfirmasi.'} Tampilan impor perlu diperiksa di Elementor.</div>${markup}</body></html>\n`;

const helperCss=`/* Opsional. Tempel di Appearance > Customize > Additional CSS. Semua aturan dibatasi ke homepage baru. */\n.dfp-home [id]{scroll-margin-top:24px}\n.dfp-home a:focus-visible{outline:3px solid #2563EB;outline-offset:5px}\n.dfp-home .elementor-button{min-height:44px;display:inline-flex;align-items:center;justify-content:center}\n.dfp-home .elementor-widget-text-editor p:last-child{margin-bottom:0}\n.dfp-home .elementor-widget-text-editor ul{margin-block:0;padding-inline-start:20px}\n.dfp-home .elementor-widget-image img{display:block}\n@media(prefers-reduced-motion:reduce){.dfp-home *{animation:none!important;transition:none!important}}\n`;

const seoSettings={...copy.seo,openGraph:{title:copy.seo.title,description:copy.seo.description,image:copy.portrait},contactConfigured:contactReady,publishReady:false,missingConfiguration:contactReady?[]:['Nomor WhatsApp pemilik'],schemaGuidance:{profile:'Person',services:'Service jika sesuai dengan konten halaman',breadcrumbs:'Pertahankan BreadcrumbList Yoast jika relevan',note:'Tinjau output Yoast sebelum menambahkan JSON-LD. Jangan memasang duplikat, alamat fiktif, atau rating yang tidak didukung.'},previewRobots:'noindex,nofollow',productionRobots:'Atur index,follow hanya setelah halaman final, kontak aktif, dan pengaturan WordPress/Yoast diperiksa.'};

fs.writeFileSync(path.join(dir,'elementor-homepage.json'),JSON.stringify(template,null,2)+'\n');
fs.writeFileSync(path.join(dir,'index.html'),html);
fs.writeFileSync(path.join(dir,'optional.css'),helperCss);
fs.writeFileSync(path.join(dir,'seo-settings.json'),JSON.stringify(seoSettings,null,2)+'\n');

// Static checks are deliberately separate from an actual Elementor import/render test.
const nodes=[];
function walk(n){nodes.push(n);for(const c of n.elements||[])walk(c);}walk(root);
const errors=[];
const ids=new Set();const anchors=new Set();
for(const n of nodes){
 if(ids.has(n.id))errors.push('Duplicate Elementor element ID '+n.id);ids.add(n.id);
 if(n.settings._element_id){if(anchors.has(n.settings._element_id))errors.push('Duplicate anchor');anchors.add(n.settings._element_id);}
}
const h1=nodes.filter(n=>n.widgetType==='heading'&&n.settings.html_tag==='h1');
if(h1.length!==1||!h1[0].settings.title.trim())errors.push('Need exactly one nonempty H1');
for(const n of nodes.filter(n=>n.widgetType==='button')){
 const href=n.settings.link.url;
 if(!href||href==='#')errors.push('Empty destination '+n.settings.text);
 if(href.startsWith('#')&&!anchors.has(href.slice(1)))errors.push('Unresolved anchor '+href);
}
for(const n of nodes.filter(n=>n.elType==='widget')){
 if(!['heading','text-editor','button','image'].includes(n.widgetType))errors.push('Non-basic widget '+n.widgetType);
 if(n.widgetType!=='image'&&n.settings.typography_font_size_mobile.size<14)errors.push('Small mobile text');
 if(n.widgetType==='image'&&!n.settings.image.alt)errors.push('Missing image alt');
}
if(/placeholder\.png|lorem ipsum/i.test(JSON.stringify(template)))errors.push('Placeholder content');
const luminance=hex=>{const c=hex.replace('#','').match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];};
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return +((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2);};
const contrasts=[{pair:'Body / putih',ratio:contrast(palette.text,palette.white)},{pair:'Navy / gold',ratio:contrast(palette.navy,palette.gold)},{pair:'Teks terang / navy',ratio:contrast('#EAECF0',palette.navy)},{pair:'Gold / navy',ratio:contrast(palette.gold,palette.navy)}];
if(contrasts.some(c=>c.ratio<4.5))errors.push('Insufficient text contrast');
const check={date:'2026-11-21',status:errors.length?'failed':'static-checks-passed',contactConfigured:contactReady,publishReady:false,widgets:nodes.filter(n=>n.elType==='widget').length,containers:nodes.filter(n=>n.elType==='container').length,h1Count:h1.length,anchorCount:anchors.size,allowedWidgets:['heading','text-editor','button','image'],contrasts,errors,renderTest:'NOT RUN: WordPress/Elementor import and visual browser QA. Responsive control values are present but not a render test.',pending:contactReady?['Impor ke halaman draf Elementor dan uji desktop/mobile di WordPress.']:['Konfirmasi dan konfigurasi nomor WhatsApp.','Impor ke halaman draf Elementor dan uji desktop/mobile di WordPress.'],checksums:Object.fromEntries(['elementor-homepage.json','index.html','optional.css','seo-settings.json','content.json'].map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,file))).digest('hex')]))};
fs.writeFileSync(path.join(dir,'checks.json'),JSON.stringify(check,null,2)+'\n');
console.log(JSON.stringify(check,null,2));
if(errors.length)process.exitCode=1;
