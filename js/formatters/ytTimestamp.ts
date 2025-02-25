// For the Python implementation, see kuropy/formatters/ytTimestamp.py
/**
 * Parses timestamp retrieved from the YouTube API
 * 
 * @param ts A compatible timestamp
 */
export const ytTimestamp = (ts: string) => {
  const match = ts.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  if (!match) return "0:00"

  /* eslint-disable-next-line no-unused-vars */
  const [_, h, m, s] = match

  const _int = (n: string) => n ? parseInt(n, 10) : 0
  const _pad = (num: number) => num.toString().padStart(2, "0")
  const _concatTimeStr = (...val: (string | number)[]) => val.join(":")

  const hours = _int(h)
  const minutes = _int(m)
  const seconds = _int(s)

  const padMinute = _pad(minutes)
  const padSecond = _pad(seconds)

  const hourString = _concatTimeStr(hours, padMinute, padSecond)
  const minSecString = _concatTimeStr(padMinute, padSecond)

  return hours ? hourString : minSecString
}