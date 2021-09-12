import * as dotenv from 'dotenv'
dotenv.config()

import { Telegraf, session } from 'telegraf'
import * as Database from './util/database.js'
import { spawnObbligo, spawnVerita, pushMessageToDelete, deleteMessageQueue } from './util/util.js'

const bot = new Telegraf(process.env.TELEGRAM_API)

bot.use(session())

bot.start((ctx) => {
  deleteMessageQueue(ctx)
  pushMessageToDelete(ctx, ctx.update.message.message_id);
  start(ctx)
})

bot.action('obbligo', (ctx) => {
  deleteMessageQueue(ctx)
  obbligoCasuale(ctx)
})

bot.action('verita', (ctx) => {
  deleteMessageQueue(ctx)
  veritaCasuale(ctx)
})

async function start(ctx) {
  let msg = await ctx.reply('Benevenuto, sei pronto per giocare?')
  pushMessageToDelete(ctx, msg.message_id)
  await obbligoVerita(ctx)
}

async function obbligoVerita(ctx){
  let msg = await ctx.telegram.sendMessage(
    ctx.chat.id,
    "obbligo o verità?",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Obbligo',
              callback_data: 'obbligo'
            },
            {
              text: 'Verita',
              callback_data: 'verita'
            }
          ]
        ]
      }
    }
  )
  pushMessageToDelete(ctx, msg.message_id)
}

async function obbligoCasuale(ctx) {
  let msg = await ctx.reply(await spawnObbligo())
  pushMessageToDelete(ctx, msg.message_id)
  obbligoVerita(ctx)
}

async function veritaCasuale(ctx) {
  let msg = await ctx.reply(await spawnVerita())
  pushMessageToDelete(ctx, msg.message_id)
  obbligoVerita(ctx)
}


bot.launch()