/** Яндекс.Метрика: номер счётчика и отправка целей. */
export const YM_ID = 113168398

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void
  }
}

/**
 * Достижение цели в Метрике. Цель с таким идентификатором нужно один раз создать
 * в кабинете Метрики (Настройки → Цели → JavaScript-событие).
 * Если счётчик не загрузился или цель не создана — вызов просто ничего не делает.
 */
export function reachGoal(goal: string, params?: Record<string, unknown>) {
  try {
    window.ym?.(YM_ID, 'reachGoal', goal, params)
  } catch {
    /* аналитика не должна ломать отправку заявки */
  }
}
