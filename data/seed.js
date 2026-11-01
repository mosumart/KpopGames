// Primary agency profile citations verified 2026-11-01. No claims about current rankings.
export const GROUPS = [
 {name:'BTS',source:'https://bighitsmusic.com/bts/profile',members:['RM','Jin','SUGA','j-hope','Jimin','V','Jung Kook'],debut:'2013',fandom:'ARMY'},
 {name:'BLACKPINK',source:'https://ygfamily.com/ko/artists/blackpink/profile',members:['JISOO','JENNIE','ROSÉ','LISA'],debut:'2016'},
 {name:'TWICE',source:'https://twice.jype.com/profile',members:['NAYEON','JEONGYEON','MOMO','SANA','JIHYO','MINA','DAHYUN','CHAEYOUNG','TZUYU']},
 {name:'Stray Kids',source:'https://straykids.jype.com/profile',members:['BANG CHAN','LEE KNOW','CHANGBIN','HYUNJIN','HAN','FELIX','SEUNGMIN','I.N']}
];
export const PHOTO_TITLES = {
 'RM':'RM (musician)','Jin':'Jin (singer)','SUGA':'Suga','j-hope':'J-Hope','Jimin':'Jimin (singer, born 1995)','V':'V (singer)','Jung Kook':'Jungkook',
 'JISOO':'Jisoo','JENNIE':'Jennie (singer)','ROSÉ':'Rosé (singer)','LISA':'Lisa (rapper)',
 'NAYEON':'Nayeon','JEONGYEON':'Jeongyeon','MOMO':'Momo (singer)','SANA':'Sana (singer)','JIHYO':'Jihyo','MINA':'Mina (Japanese singer)','DAHYUN':'Dahyun','CHAEYOUNG':'Chaeyoung','TZUYU':'Tzuyu',
 'BANG CHAN':'Bang Chan','LEE KNOW':'Lee Know','CHANGBIN':'Changbin','HYUNJIN':'Hyunjin (musician)','HAN':'Han (musician)','FELIX':'Felix (rapper)','SEUNGMIN':'Seungmin','I.N':'I.N'
};
export const SELECTABLE = ['All Artists','BTS','BLACKPINK','TWICE','Stray Kids','SEVENTEEN','aespa','ENHYPEN','IVE'];
const verified='2026-11-01';
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-');
export function seedQuestions(){
 let q=[];
 const add=(obj)=>q.push({id:'seed-'+(q.length+1),verifiedAt:verified,approved:true,origin:'official',difficulty:'easy',...obj});
 for(const g of GROUPS){
  const sameGroup=GROUPS.filter(x=>x!==g);
  add({mode:'group',group:g.name,prompt:`Kumpulan manakah mempunyai ahli ${g.members.slice(0,3).join(', ')}?`,answer:g.name,options:[g.name,...sameGroup.map(x=>x.name)].slice(0,4),source:g.source,explanation:`${g.members.slice(0,3).join(', ')} disenaraikan dalam profil rasmi ${g.name}.`});
  add({mode:'trivia',group:g.name,prompt:`Berapakah bilangan ahli yang disenaraikan dalam profil rasmi ${g.name}?`,answer:String(g.members.length),options:['4','7','8','9'].includes(String(g.members.length))?['4','7','8','9']:['4','7','8','9'],source:g.source,explanation:`Profil rasmi menyenaraikan ${g.members.length} ahli.`});
  for(const [i,m] of g.members.entries()){
   const wrong=GROUPS.filter(x=>x!==g).flatMap(x=>x.members).slice(i*3,i*3+3);
   const alt=wrong.length===3?wrong:GROUPS.filter(x=>x!==g).flatMap(x=>x.members).slice(0,3);
   add({mode:'trivia',group:g.name,prompt:`Antara pilihan berikut, siapakah ahli ${g.name}?`,answer:m,options:[m,...alt],source:g.source,explanation:`${m} tersenarai dalam profil rasmi ${g.name}.`,difficulty:i>=4?'medium':'easy'});
   add({mode:'group',group:g.name,prompt:`${m} ialah ahli kumpulan K-pop yang mana?`,answer:g.name,options:GROUPS.map(x=>x.name),source:g.source,explanation:`Profil rasmi ${g.name} menyenaraikan ${m} sebagai ahli kumpulan.`,difficulty:'easy'});
   add({mode:'clue',group:g.name,prompt:'Teka nama artis berdasarkan petunjuk!',answer:m,options:[m,...alt],clues:[`Artis ini daripada kumpulan ${g.name}.`,`Namanya bermula dengan huruf ${m[0]}.`,`Namanya mempunyai ${m.replaceAll(' ','').length} aksara (tanpa ruang).`],source:g.source,explanation:`Nama ${m} disahkan dalam profil rasmi ${g.name}.`,difficulty:'medium'});
   add({mode:'truefalse',group:g.name,prompt:`${m} ialah ahli kumpulan ${g.name}.`,answer:'Betul',options:['Betul','Salah'],source:g.source,explanation:`${m} disenaraikan sebagai ahli ${g.name}.`});
  }
  const outsider=GROUPS.find(x=>x!==g).members[0];
  add({mode:'truefalse',group:g.name,prompt:`${outsider} ialah ahli kumpulan ${g.name}.`,answer:'Salah',options:['Betul','Salah'],source:g.source,explanation:`${outsider} disenaraikan bersama kumpulan lain dalam sumber rasmi, bukan ${g.name}.`});
  if(g.debut) add({mode:'trivia',group:g.name,prompt:`Pada tahun berapakah ${g.name} debut di Korea?`,answer:g.debut,options:['2013','2015','2016','2018'],source:g.source,explanation:`Tahun debut kumpulan ${g.name}: ${g.debut}.`,difficulty:'medium'});
  if(g.fandom) add({mode:'trivia',group:g.name,prompt:`Apakah nama fandom rasmi ${g.name}?`,answer:g.fandom,options:['ARMY','BLINK','ONCE','STAY'],source:g.source,explanation:`Profil rasmi ${g.name} menyebut peminatnya sebagai ${g.fandom}.`,difficulty:'medium'});
 }
 return q;
}
