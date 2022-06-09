function Counter() {
  // State: a counter value
  const [counter, setCounter] = useState(0)

  // Action: code that causes an update to the state when some thing happens
  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1)
  }

  return (
    <div>
      Value: {counter}
      <button onClick={increment}>Increment</button>
    </div>
  )
}

/**
 * Ví dụ về mutation (thay đổi giá trị obj, array)
 * KHÔNG NÊN DÙNG TRONG REDUX
 */

const obj = { a: 1, b: 2 }

obj.b = 3

const arr = ['a', 'b']

arr.push('c')
arr[1] = 'd'

/**
 * Ví dụ về Immutaiton (không thay đổi giá trị obj, array)
 * NÊN DÙNG TRONG REDUX
 */

const obj = {
  a: { c: 3 },
  b: 2,
}

const obj2 = {
  //copy obj
  ...obj,
  // overwrite a
  a: {
    // copy obj.a
    ...obj.a,
    // overwrite c
    c: 42,
  },
}

const arr = ['a', 'b']
// create a new copy of arr, with 'c' appended to the end
const arr2 = arr.concat('c')

// or, we can make a copy of the original array:
const arr3 = arr.slice()
// and mutate the copy:
arr3.push('c')
