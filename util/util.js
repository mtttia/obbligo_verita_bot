import * as Database from './database.js'

export async function spawnObbligo() {
  const obblighi = await Database.getObblighi()
  return obblighi[random(0, obblighi.length)].testo
}

export async function spawnVerita() {
  const verita = await Database.getVerita()  
  const i = random(0, verita.length)
  return verita[i].testo
}

function random(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

export function pushMessageToDelete(ctx, messageId)
{
    let _a;
    (_a = ctx.session) !== null && _a !== void 0
        ? _a
        : (ctx.session = { session : true, messageToDelete : [] })
    
    if(!ctx.session.messageToDelete)
    {
        ctx.session.messageToDelete = [messageId];
    }
    else
    {
        ctx.session.messageToDelete.push(messageId);
    }
}

export function deleteMessageQueue(ctx)
{
    try
    {
        
        let _a
        ;(_a = ctx.session) !== null && _a !== void 0
        ? _a
        : (ctx.session = { session : true, messageToDelete : []})
        if(ctx.session.messageToDelete)
        {
            ctx.session.messageToDelete.forEach(id => {
                ctx.deleteMessage(id).catch(err => {})
            })
            
            ctx.session.messageToDelete = [];
        }
    }catch(ex)
    {
        Error(ctx, ex);
    }
}