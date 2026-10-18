/**
 * This function loops through a function rerunning all assertions
 * inside of it until it gets a truthy result.
 *
 * If the maximum duration is reached, it then rejects.
 *
 * @param assertions {() => void | Promise<void>}
 * @param maxDuration {number}
 */
export async function waitFor(
  assertions: () => void | Promise<void>,
  maxDuration = 1000,
): Promise<void> {
  return new Promise((resolve, reject) => {
    let elapsedTime = 0
    let running = false

    const interval = setInterval(async () => {
      if (running) {
        return
      }

      running = true
      elapsedTime += 10

      try {
        await assertions()
        clearInterval(interval)
        resolve()
      } catch (err) {
        if (elapsedTime >= maxDuration) {
          clearInterval(interval)
          reject(err)
        }
      } finally {
        running = false
      }
    }, 10)
  })
}
