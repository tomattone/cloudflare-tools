import { enableBotManagement } from './src/enable-bot-management.ts'
import { getZones } from './src/get-zones.ts'
import { updateIPs } from './src/update-ips.ts'

const option = process.argv[2] // o argumento passado na linha de comando

export async function botManagement() {
  console.log('Obtendo zonas...')
  const zones: any = await getZones()

  console.log(`Encontradas ${zones.length} zonas. Ativando Bot Management...`)
  for (const zone of zones) {
    console.log(`Ativando Bot Management para: ${zone.name}`)
    await enableBotManagement(zone.id)
  }
  console.log('Processo concluído.')
}

async function main() {
  switch (option) {
    case 'bot-management':
      await botManagement()
      break
    case 'update-ips':
      await updateIPs()
      break
    default:
      console.log('Uso: npm run start -- bot-management | update-ips')
  }
}

main()
