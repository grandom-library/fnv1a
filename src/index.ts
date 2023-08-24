const _32_BIT_OFFSET = 2166136261

const PRIMES = {
  32: BigInt(2 ** 24 + 2 ** 8 + 0x93),
  64: BigInt(2 ** 40 + 2 ** 8 + 0xb3),
  128: BigInt(2) ** BigInt(88) + BigInt(2 ** 8 + 0x3b),
  256: BigInt(2) ** BigInt(168) + BigInt(2 ** 8 + 0x63),
  512: BigInt(2) ** BigInt(344) + BigInt(2 ** 8 + 0x57),
  1024: BigInt(2) ** BigInt(680) + BigInt(2 ** 8 + 0x8d)
} as const

const OFFSETS: Record<keyof typeof PRIMES, bigint> = {
  32: BigInt(_32_BIT_OFFSET),
  64: 14695981039346656037n,
  128: 144066263297769815596495629667062367629n,
  256: 100029257958052580907070968620625704837092796014241193945225284501741471925557n,
  512: 9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785n,
  1024: 14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915n
} as const

/**
 * Returns a 32-bit FNV-1a hash.
 *
 * @param string The string to hash.
 */
function fnv1a (string: string): number

/**
 * Returns an n-bit FNV-1a hash.
 *
 * @param string The string to hash.
 * @param hashSize The size of the hash.
 */
function fnv1a (string: string, hashSize: number): bigint

function fnv1a (arg1: any, arg2?: any): any {
  if (typeof arg1 !== 'string') {
    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `The 'string' argument must be a string, got: ${arg1} (typeof === '${typeof arg1}').`
    )
  }

  const length = arg1.length

  // 32 bit hash as number -------------------------------------------------------------------------
  if (typeof arg2 === 'undefined') {
    let hash = _32_BIT_OFFSET

    for (let i = 0; i < length; i++) {
      hash ^= arg1.charCodeAt(i)
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)
    }

    return hash >>> 0
  }

  if (typeof arg2 !== 'number') {
    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `The 'hashSize' argument must be a number, got: ${arg2} (typeof === '${typeof arg2}').`
    )
  }

  if (!(arg2 in PRIMES)) {
    throw new RangeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `The 'hashSize' argument must be one of 32, 64, 128, 256, 512, 1024, got: ${arg2}.`
    )
  }

  // n-bit hash as BigInt --------------------------------------------------------------------------
  const size = arg2 as keyof typeof PRIMES
  const prime = PRIMES[size]

  let hash = OFFSETS[size]

  for (let i = 0; i < length; i++) {
    hash ^= BigInt(arg1.charCodeAt(i))
    hash = BigInt.asUintN(size, hash * prime)
  }

  return hash
}

export default fnv1a
