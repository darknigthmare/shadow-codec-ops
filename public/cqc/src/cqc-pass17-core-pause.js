(function(root){
  'use strict';
  const document=root.document,byId=id=>document.getElementById(id);
  let hooks=null,kind=null;
  function element(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;}
  function render(){
    if(!hooks)return;
    for(let who=0;who<2;who++){
      const side=byId('corePauseSidePass17'+who);side.hidden=!kind;side.replaceChildren();if(!kind)continue;
      const profile=hooks.profile(who,kind),header=element('header');header.appendChild(element('small','',who?'ADVERSAIRE / JOUEUR 2':'JOUEUR 1'));header.appendChild(element('h3','',profile.name));header.appendChild(element('p','',profile.episode));side.appendChild(header);
      if(profile.note)side.appendChild(element('p','core17-pause-note',profile.note));
      for(const row of profile.rows||[]){const article=element('article');if(row.command)article.appendChild(element('kbd','',row.command));article.appendChild(element('h4','',row.name));if(row.detail)article.appendChild(element('p','',row.detail));if(row.description)article.appendChild(element('p','',row.description));side.appendChild(article);}
    }
    byId('pause-movebook').setAttribute('aria-pressed',String(kind==='techniques'));byId('corePauseFinishersPass17').setAttribute('aria-pressed',String(kind==='finishers'));
  }
  function toggle(panel){kind=kind===panel?null:panel;render();}
  function sync(on){if(!hooks)return;byId('pause-panel').setAttribute('aria-hidden',String(!on));if(!on)kind=null;render();}
  function mount(api){
    if(hooks)return;hooks=api;
    const pause=byId('pause-panel'),center=pause.firstElementChild,actions=center.querySelector('.panel-actions'),layout=element('div','core17-pause-layout');
    pause.classList.add('core17-pause');pause.setAttribute('role','dialog');pause.setAttribute('aria-modal','true');pause.setAttribute('aria-label','Combat en pause');pause.setAttribute('aria-hidden','true');center.classList.add('core17-pause-center');
    byId('back').textContent='RETOUR À LA SÉLECTION DES PERSONNAGES';
    const abandon=element('button','','ABANDONNER LE MATCH');abandon.id='corePauseAbandonPass17';abandon.type='button';abandon.onclick=hooks.abandon;
    const finishers=element('button','','FINISHERS');finishers.id='corePauseFinishersPass17';finishers.type='button';finishers.onclick=()=>toggle('finishers');
    byId('pause-movebook').textContent='TECHNIQUES';byId('pause-movebook').onclick=()=>toggle('techniques');
    byId('pause-movebook').setAttribute('aria-controls','corePauseSidePass170 corePauseSidePass171');finishers.setAttribute('aria-controls','corePauseSidePass170 corePauseSidePass171');
    for(const button of [byId('resume'),byId('back'),abandon,byId('pause-movebook'),finishers,byId('pause-help'),byId('boss-guide-pause'),byId('pause-cards')])actions.appendChild(button);
    layout.appendChild(center);
    for(let who=0;who<2;who++){const side=element('aside','core17-pause-side');side.id='corePauseSidePass17'+who;side.dataset.pausePlayer=String(who);side.hidden=true;side.setAttribute('aria-label',who?'Techniques de l’adversaire':'Techniques du joueur 1');layout.appendChild(side);}
    pause.appendChild(layout);
    document.addEventListener('keydown',event=>{
      if(event.code!=='Tab'||pause.hidden||document.querySelector('dialog[open]'))return;
      const buttons=[...pause.querySelectorAll('button')].filter(button=>!button.disabled&&!button.hidden&&button.getClientRects().length),first=buttons[0],last=buttons[buttons.length-1];
      if(!first)return;
      if(event.shiftKey&&(document.activeElement===first||!pause.contains(document.activeElement))){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&(document.activeElement===last||!pause.contains(document.activeElement))){event.preventDefault();first.focus();}
    },true);
    sync(false);
  }
  root.CQC_CORE_PAUSE_PASS17=Object.freeze({mount,sync});
})(globalThis);
