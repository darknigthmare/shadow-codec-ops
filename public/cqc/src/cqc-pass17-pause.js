(function(root){
  'use strict';
  let api=null, panel=null;
  const document=root.document;
  const byId=id=>document.getElementById(id);
  function element(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;}
  function row(target,row){
    const article=element('article');
    if(row.command)article.appendChild(element('kbd','',row.command));
    article.appendChild(element('h4','',row.name||'Technique'));
    if(row.detail)article.appendChild(element('p','',row.detail));
    if(row.description)article.appendChild(element('p','',row.description));
    if(row.counterplay)article.appendChild(element('p','',row.counterplay));
    target.appendChild(article);
  }
  function render(){
    if(!api)return;
    for(let who=0;who<2;who++){
      const side=byId('pauseSidePass17'+who);
      side.hidden=!panel;
      side.replaceChildren();
      if(!panel)continue;
      const profile=api.profile(who,panel),header=element('header');
      header.appendChild(element('small','',who?'ADVERSAIRE / JOUEUR 2':'JOUEUR 1'));
      header.appendChild(element('h3','',profile.name));
      header.appendChild(element('p','',profile.episode));
      side.appendChild(header);
      if(profile.note)side.appendChild(element('p','pass17-pause-note',profile.note));
      for(const move of profile.rows||[])row(side,move);
      if(!profile.rows?.length)side.appendChild(element('p','',panel==='finishers'?'Aucun finisher disponible pour cette incarnation.':'Aucune technique disponible.'));
    }
    byId('techFight45').setAttribute('aria-pressed',String(panel==='techniques'));
    byId('finishFight46').setAttribute('aria-pressed',String(panel==='finishers'));
  }
  function toggle(kind){if(!api)return;panel=panel===kind?null:kind;render();}
  function sync(on){
    if(!api)return;
    byId('pauseBtn').textContent=on?'▶':'Ⅱ';
    byId('pauseBtn').setAttribute('aria-label',on?'Reprendre le combat':'Mettre le combat en pause');
    byId('pauseBtn').setAttribute('title',on?'Reprendre · Échap':'Pause · Échap');
    byId('pause43').setAttribute('aria-hidden',String(!on));
    if(!on){panel=null;render();return;}
    render();
    const returnButton=byId('leaveFight'),abandon=byId('abandonMatchPass17');
    returnButton.hidden=!api.canLeave();abandon.hidden=!api.canLeave();
    if(!byId('pause43').contains(document.activeElement))byId('resume43').focus();
  }
  function mount(hooks){
    if(api)return;api=hooks;
    const fight=byId('fightScreen'),pause=byId('pause43'),old=pause.firstElementChild;
    fight.classList.add('pass17-pause');pause.classList.add('pass17-pause-dialog');
    pause.setAttribute('role','dialog');pause.setAttribute('aria-modal','true');pause.setAttribute('aria-label','Combat en pause');pause.setAttribute('aria-hidden','true');
    const layout=element('div','pass17-pause-layout'),center=element('div','pass17-pause-center'),actions=element('div','pass17-pause-actions');
    center.appendChild(element('h2','','PAUSE'));
    center.appendChild(element('p','','Le combat et son chronomètre sont suspendus.'));
    byId('leaveFight').textContent='RETOUR À LA SÉLECTION DES PERSONNAGES';
    const abandon=element('button','','ABANDONNER LE MATCH');abandon.id='abandonMatchPass17';abandon.type='button';abandon.onclick=()=>api.abandon();
    byId('techFight45').textContent='TECHNIQUES · F1';byId('techFight45').onclick=()=>toggle('techniques');
    byId('finishFight46').textContent='FINISHERS · F2';byId('finishFight46').onclick=()=>toggle('finishers');
    byId('techFight45').setAttribute('aria-controls','pauseSidePass170 pauseSidePass171');byId('finishFight46').setAttribute('aria-controls','pauseSidePass170 pauseSidePass171');
    for(const button of [byId('resume43'),byId('leaveFight'),abandon,byId('techFight45'),byId('finishFight46'),byId('dojoToggle')])actions.appendChild(button);
    center.appendChild(actions);center.appendChild(byId('dojoPanel'));layout.appendChild(center);
    for(let who=0;who<2;who++){const side=element('aside','pass17-pause-side');side.id='pauseSidePass17'+who;side.dataset.pausePlayer=String(who);side.hidden=true;side.setAttribute('aria-label',who?'Techniques de l’adversaire':'Techniques du joueur 1');layout.appendChild(side);}
    if(old)old.remove();pause.appendChild(layout);fight.appendChild(byId('pauseBtn'));
    document.addEventListener('keydown',event=>{
      if(api.running()&&!api.legacyPanelOpen()&&!api.external()&&['F1','F2'].includes(event.code)){
        event.preventDefault();event.stopImmediatePropagation();if(event.repeat)return;
        if(event.code==='F2'&&byId('finishFight46').hidden)return;
        api.pause(true);toggle(event.code==='F1'?'techniques':'finishers');return;
      }
      if(event.code==='Tab'&&!pause.classList.contains('hidden')){
        const buttons=[...pause.querySelectorAll('button,select,input')].filter(node=>!node.disabled&&!node.hidden&&node.getClientRects().length);
        if(!buttons.length)return;
        const first=buttons[0],last=buttons[buttons.length-1],focused=document.activeElement;
        if(event.shiftKey&&(focused===first||!pause.contains(focused))){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&(focused===last||!pause.contains(focused))){event.preventDefault();first.focus();}
      }
    },true);
    sync(false);
  }
  root.CQC_PAUSE_PASS17=Object.freeze({mount,sync});
})(globalThis);
