import { axiosInstance } from './get-axios-instance.ts'

// Função para obter as zonas (sites)
export async function getZones() {
  const allZones: any[] = []
  let page = 1
  const perPage = 50 // Máximo permitido pela API.

  try {
    while (true) {
      const response = await axiosInstance.get('/zones', {
        params: { page, per_page: perPage },
      })

      const zones = response.data.result
      allZones.push(...zones)

      // Verifica se há mais páginas
      const { result_info } = response.data
      if (result_info.page >= result_info.total_pages) {
        break // Última página
      }

      page++
    }
    return allZones
  } catch (error) {
    console.error(
      'Erro ao obter as zonas:',
      error.response?.data || error.message
    )
    process.exit(1)
  }
}
