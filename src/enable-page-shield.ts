const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const CLOUDFLARE_API = 'https://api.cloudflare.com/client/v4'
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN
const API_EMAIL = process.env.CLOUDFLARE_EMAIL
const API_KEY = process.env.CLOUDFLARE_API_KEY
const DRY_RUN = process.env.CLOUDFLARE_DRY_RUN

async function getZones() {
  let page = 1
  let zones = []
  let res

  do {
    res = await axios.get(`${CLOUDFLARE_API}/zones`, {
      params: { page, per_page: 50 },
      headers: {
        'X-Auth-Email': API_EMAIL,
        'X-Auth-Key': API_KEY,
      },
    })
    zones = zones.concat(res.data.result)
    page++
  } while (page <= res.data.result_info.total_pages)

  return zones
}

async function enablePageShield(zoneId) {
  if (DRY_RUN === 'true') {
    console.log('      📋 [DRY RUN] Pulando atualização')
    return true
  }

  const url = `${CLOUDFLARE_API}/zones/${zoneId}/page_shield`

  const body = {
    enabled: true,
  }

  try {
    const res = await axios.put(url, body, {
      headers: {
        'X-Auth-Email': API_EMAIL,
        'X-Auth-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    })

    return res.data.success
  } catch (err) {
    console.error(
      `      ❌ Erro ao ativar Page Shield: ${
        err.response?.data?.errors?.[0]?.message || err.message
      }`
    )
    return false
  }
}

async function main() {
  try {
    const zones = await getZones()
    console.log(`🔍 Encontradas ${zones.length} zonas\n`)

    let successCount = 0
    let failureCount = 0

    for (const zone of zones) {
      console.log(`🌐 Zona: ${zone.name}`)
      const ok = await enablePageShield(zone.id)
      if (ok) {
        console.log('   ✅ Page Shield ativado com sucesso\n')
        successCount++
      } else {
        console.log('   ❌ Falha ao ativar Page Shield\n')
        failureCount++
      }
    }

    console.log(
      `\n🎉 Concluído! Sucesso: ${successCount}, Falhas: ${failureCount}`
    )
  } catch (err) {
    console.error('❌ Erro:', err.response?.data || err.message)
  }
}

main()
