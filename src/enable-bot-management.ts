import { axiosInstance } from './get-axios-instance.ts'

// Função para ativar o Bot Management
export async function enableBotManagement(zoneId) {
  try {
    const response = await axiosInstance.put(
      `/zones/${zoneId}/bot_management`,
      {
        ai_bots_protection: 'block',
        enable_js: true,
        fight_mode: true,
      }
    )
    console.log(
      `Bot Management ativado para a zona ${zoneId}:`,
      response.data.success
    )
  } catch (error) {
    console.error(
      `Erro ao ativar Bot Management para a zona ${zoneId}:`,
      error.message
    )
  }
}
