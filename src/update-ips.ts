import fs from 'fs'

import { axiosInstance } from './get-axios-instance.ts'
import { getZones } from './get-zones.ts'
const LOG_FILE_PATH = './ips-updated-log.txt'

const IP_FROM = '209.172.6.8'
const IP_TO = '209.172.6.9'

export async function updateIPs() {
  console.log('Iniciando varredura de zonas para atualizar IPs...')
  fs.writeFileSync(
    LOG_FILE_PATH,
    `Início da atualização de IPs: ${new Date().toISOString()}\n\n`
  )

  const zones = await getZones()
  for (const zone of zones) {
    const zoneId = zone.id
    const zoneName = zone.name

    try {
      const dnsRecordsResp = await axiosInstance.get(
        `/zones/${zoneId}/dns_records`,
        {
          params: {
            per_page: 100,
          },
        }
      )

      const dnsRecords = dnsRecordsResp.data.result
      const matchingRecords = dnsRecords.filter(
        (record: any) => record.type === 'A' && record.content === IP_FROM
      )

      for (const record of matchingRecords) {
        console.log(`Atualizando IP em ${record.name} (${zoneName})`)

        // await axiosInstance.put(`/zones/${zoneId}/dns_records/${record.id}`, {
        //   type: record.type,
        //   name: record.name,
        //   content: IP_TO,
        //   ttl: record.ttl,
        //   proxied: record.proxied,
        // })

        console.log(`✔ IP atualizado para ${record.name}`)
        fs.appendFileSync(
          LOG_FILE_PATH,
          `${record.type} - ${record.name} (${zoneName}) atualizado de ${IP_FROM} para ${IP_TO}\n`
        )
      }
    } catch (error) {
      console.error(
        `Erro ao processar zona ${zoneName}:`,
        error.response?.data || error.message
      )
    }
  }

  console.log('Atualização de IPs concluída.')
  fs.appendFileSync(
    LOG_FILE_PATH,
    `\nConcluído em: ${new Date().toISOString()}\n`
  )
}
