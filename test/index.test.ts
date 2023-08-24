import fnv1a from '../src'

describe('errors', () => {
  test('1st arg must be a string', () => {
    // @ts-expect-error
    expect(() => fnv1a()).toThrowWithMessage(
      TypeError,
      'The \'string\' argument must be a string, got: undefined (typeof === \'undefined\').'
    )
  })

  test('2nd arg must be a number', () => {
    // @ts-expect-error
    expect(() => fnv1a('', false)).toThrowWithMessage(
      TypeError,
      'The \'hashSize\' argument must be a number, got: false (typeof === \'boolean\').'
    )
  })

  test('2nd arg must be one of 32, 64, 128, 256, 512, 1024', () => {
    expect(() => fnv1a('', 48)).toThrowWithMessage(
      RangeError,
      'The \'hashSize\' argument must be one of 32, 64, 128, 256, 512, 1024, got: 48.'
    )
  })
})

describe('number', () => {
  test('number - 32 bit', () => {
    expect(fnv1a('')).toBe(2166136261)
    expect(fnv1a('a')).toBe(3826002220)
    expect(fnv1a('Iscx9cE2rk1YMvPzpb4NFCUiLOiXmm2l')).toBe(2773037204)
  })
})

describe('bigint', () => {
  test('bigint - 32 bit', () => {
    expect(fnv1a('', 32).toString()).toBe(2166136261n.toString())
    expect(fnv1a('a', 32).toString()).toBe(3826002220n.toString())
    expect(fnv1a('Iscx9cE2rk1YMvPzpb4NFCUiLOiXmm2l', 32).toString()).toBe(2773037204n.toString())
  })

  test('bigint - 64 bit', () => {
    expect(fnv1a('', 64).toString()).toBe(14695981039346656037n.toString())
    expect(fnv1a('a', 64).toString()).toBe(12638187200555641996n.toString())
  })

  test('bigint - 128 bit', () => {
    expect(fnv1a('', 128).toString()).toBe(144066263297769815596495629667062367629n.toString())
    expect(fnv1a('a', 128).toString()).toBe(279349696671665264231447081680185756004n.toString())
  })

  test('bigint - 256 bit', () => {
    expect(fnv1a('', 256).toString()).toBe(100029257958052580907070968620625704837092796014241193945225284501741471925557n.toString())
    expect(fnv1a('a', 256).toString()).toBe(44867753943577790287705335483255842241845894581843275463348238411130865804156n.toString())
  })

  test('bigint - 512 bit', () => {
    expect(fnv1a('', 512).toString()).toBe(9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785n.toString())
    expect(fnv1a('a', 512).toString()).toBe(11953317394135539349154433287628773929568787445269509959212693531458072457957106370775899041675541513348796391014922741597244887016216087954051796457488264n.toString())
  })

  test('bigint - 1024 bit', () => {
    expect(fnv1a('', 1024).toString()).toBe(14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915n.toString())
    expect(fnv1a('a', 1024).toString()).toBe(5818363527381644214167233747835538701107978818630109145693299645251540493578435218053541778827587683654772935121139775523503145629158537612850888831472542273057513046212368429512907352387112346131801901403545957510684065167101045719835285505190875790984075398467686988232751512038527112618n.toString())
  })
})
