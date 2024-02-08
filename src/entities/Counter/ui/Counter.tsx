import { Button } from '../../../shared/ui/Button/Button'
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue'
import { useCounterActions } from '../model/slice/counterSlice'

export const Counter = () => {
  const counterValue = useCounterValue()
  const {increment, decrement} = useCounterActions()
  const incHandler = () => {
    increment()
  }
  const decHandler = () => {
    decrement()
  }
  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button onClick={incHandler} data-testid="increment-btn">
        Increment
      </Button>
      <Button onClick={decHandler} data-testid="decrement-btn">
        Decrement
      </Button>
    </div>
  )
}
