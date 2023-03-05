import { classNames } from './classNames'

describe('class-names', () => {
  test('with one class', () => {
    expect(classNames('someClass')).toBe('someClass')
  })
  test('with any classes', () => {
    const expected = 'someClass Class1 Class2'
    expect(classNames('someClass', {}, ['Class1', 'Class2'])).toBe(expected)
  })
  test('with mods', () => {
    const expected = 'someClass Class1 Class2 hovered scrollable'
    expect(
      classNames('someClass', { hovered: true, scrollable: true }, [
        'Class1',
        'Class2'
      ])
    ).toBe(expected)
  })
  test('with mods false', () => {
    const expected = 'someClass Class1 Class2 hovered'
    expect(
      classNames('someClass', { hovered: true, scrollable: false }, [
        'Class1',
        'Class2'
      ])
    ).toBe(expected)
  })
  test('with mods undefined', () => {
    const expected = 'someClass Class1 Class2 hovered'
    expect(
      classNames('someClass', { hovered: true, scrollable: undefined }, [
        'Class1',
        'Class2'
      ])
    ).toBe(expected)
  })
})
