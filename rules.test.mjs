import assert from 'node:assert/strict'
import test from 'node:test'
import { evaluate, spin } from './rules.js'

test('three pearls pay fifty times the selected stake', () => {
  const result = spin(100, 5, () => .99)
  assert.deepEqual(result.reels, ['pearl', 'pearl', 'pearl'])
  assert.equal(result.payout, 250)
  assert.equal(result.balance, 345)
})

test('the shell pair works anywhere and a triple takes precedence', () => {
  assert.deepEqual(evaluate(['shell', 'wave', 'shell']).match, [0, 2])
  assert.equal(evaluate(['shell', 'wave', 'shell']).multiplier, 2)
  assert.equal(evaluate(['shell', 'shell', 'shell']).multiplier, 10)
  assert.equal(evaluate(['wave', 'wave', 'shell']).multiplier, 0)
})

test('a lost spin deducts only the stake and invalid stakes do not draw', () => {
  const rolls = [0, .3, .5]
  assert.equal(spin(10, 10, () => rolls.shift()).balance, 0)
  assert.equal(spin(4, 5, () => assert.fail('Should not draw')), null)
  assert.equal(spin(100, 3, () => assert.fail('Should not draw')), null)
})
