# Redux & Redux Toolkit

---

## Redux là gì?

- Là một thư viện JS dùng để quản lý và cập nhật `state` của ứng dụng

- Redux hoạt động như một kho lưu trữ tập trung cho các `state` mà được sử dụng ở nhiều `components` hay nhiều nơi khác nhau trong ứng dụng

- Redux là một pattern (1 khuôn mẫu): có nhiều khái niệm, quy tắc mới phải tuân theo

---

## Vì sao phải sử dụng Redux?

- Quản lý Global state

  - Các components tại mọi nơi trong ứng dụng có thể truy xuất và cập nhật
  - Giải quyết vấn đề của React khi muốn truyền dữ liệu vào các cấp con cháu

- Dễ dàng debug (Redux dev-tool)
- Xử lý caching dữ liệu từ server (lưu các dữ liệu từ server để các lần tải sau nhanh hơn)

---

## Vấn đề của Redux Core

- Cấu hình Redux phức tạp
- Phải cài đặt thủ công nhiều packages để có thể hoạt động hiệu quả
- Redux yêu cầu nhiều `boilerplate code` (code bị lặp đi lặp lại nhiều lần)
  > giải quyết bằng cách sử dụng **Redux Toolkit**

---

## Khi nào nên sử dụng Redux ?

Redux sẽ rất hữu dụng đối với các trường hợp sau:

- Dự án có số lượng lớn `state` và các `state` được sử dụng ở nhiều nơi
- `State` được cập nhật thường xuyên
- Logic code cập nhật các `state` _phức tạp_
- Ứng dụng có số lượng code trung bình hoặc lớn và có nhiều người làm chung
- Cần debug và muốn xem cách `state` được cập nhật tại bất kì khoảng thời gian nào

---

## Kiến trúc của Redux

### State management

```js
function Counter() {
  // State: a counter value
  const [counter, setCounter] = useState(0)

  // Action: code that causes an update to the state when some thing happens
  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1)
  }

  // View: the UI definition
  return (
    <div>
      Value: {counter}
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

![markdown](/img/image1.png)

`Redux`
![markdown](/img/image3.gif)

### Immutability (bất biến)

#### VD: Mutation (không nên sử dụng trong Redux)

Gây ra bug:

- UI không được cập nhật một cách chính xác để hiển thị các giá trị mới nhất
- Phá vỡ khả năng debug, xem được các giá trị `state` ở từng thời điểm khác nhau nó được cập nhật như thế nào

```js
/**
 * Ví dụ về mutation (thay đổi giá trị obj, array)
 * KHÔNG NÊN DÙNG TRONG REDUX
 */

const obj = { a: 1, b: 2 }

obj.b = 3

const arr = ['a', 'b']

arr.push('c')
arr[1] = 'd'
```

#### VD: Imutation (nên sử dụng trong Redux)

```js
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
```

---

#### Config Store `store.js`

```js
// Redux Core
import { combineReducers, createStore } from 'redux'
import filtersReducer from '../components/Filters/FiltersSlice'
import todoListReducer from '../components/TodoList/TodosSlice'

import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancers = composeWithDevTools()

const rootReducer = combineReducers({
  filters: filtersReducer,
  todoList: todoListReducer,
})

const store = createStore(rootReducer, composedEnhancers)

export default store
```

```js
// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'
import filtersSlice from '../components/Filters/filtersSlice'
import todosSlice from '../components/TodoList/todosSlice'

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todosSlice.reducer,
  },
})

export default store
```

---

##### Config Slice

```js
// Redux Core

/**
 * Các giá trị state mới luôn luôn được tính toán dựa trên giá trị của state trước đó
 * Không bao giờ được thay đổi các giá trị state hiện tại -> thực hiện code Immuation
 */

const initState = {
  search: '',
  status: 'All',
  priorities: [],
}

const filtersReducer = (state = initState, action) => {
  switch (action.type) {
    case 'filters/searchFilterChange':
      return {
        ...state,
        search: action.payload,
      }

    case 'filters/statusFilterChange':
      return {
        ...state,
        status: action.payload,
      }

    case 'filters/prioritiesFilterChange':
      return {
        ...state,
        priorities: action.payload,
      }
    default:
      return state
  }
}

export default filtersReducer

// action.js
export const searchFilterChange = (text) => {
  return {
    type: 'filters/searchFilterChange',
    payload: text,
  }
}

export const statusFilterChange = (status) => {
  return {
    type: 'filters/statusFilterChange',
    payload: status,
  }
}

export const priorityFilterChange = (priorities) => {
  return {
    type: 'filters/prioritiesFilterChange',
    payload: priorities,
  }
}
```

```js
// Redux Toolkit
import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'filters',
  initialState: {
    search: '',
    status: 'All',
    priorities: [],
  },
  reducers: {
    searchFilterChange: (state, action) => {
      // mutation || IMMER
      state.search = action.payload
    },
    statusFilterChange: (state, action) => {
      state.status = action.payload
    },
    prioritiesFilterChange: (state, action) => {
      state.priorities = action.payload
    },
  },
})
```

---

#### Dispatch

```js
// Redux Core
import { searchFilterChange } from '../../redux/actions'
import { useDispatch } from 'react-redux'

// ...

const dispatch = useDispatch()

const handleSearchTextChange = (e) => {
  setSearchText(e.target.value)
  dispatch(searchFilterChange(e.target.value))
}
```

```js
// Redux Toolkit
import filtersSlice from './filtersSlice'
import { useDispatch } from 'react-redux'

// ...

const dispatch = useDispatch()

const handleSearchTextChange = (e) => {
  setSearchText(e.target.value)
  dispatch(filtersSlice.actions.searchFilterChange(e.target.value))
}
```

![dispatch](/img/image3.gif)

---

#### Selector

```js
// Redux Core
import { createSelector } from 'reselect'

export const searchTextSelector = (state) => state.filters.search
export const filterStatusSelector = (state) => state.filters.status
export const filterPrioritiesSelector = (state) => state.filters.priorities
export const todoListSelector = (state) => state.todoList
```

```js
// Redux Toolkit
import { createSelector } from '@reduxjs/toolkit'

export const searchTextSelector = (state) => state.filters.search
export const filterStatusSelector = (state) => state.filters.status
export const filterPrioritiesSelector = (state) => state.filters.priorities
export const todoListSelector = (state) => state.todoList
```

```js
export const todosRemainingSelector = createSelector(
  todoListSelector,
  filterStatusSelector,
  searchTextSelector,
  filterPrioritiesSelector,
  (todoList, status, searchText, priorities) => {
    return todoList.filter((todo) => {
      if (status === 'All') {
        return priorities.length
          ? todo.name.includes(searchText) && priorities.includes(todo.priority)
          : todo.name.includes(searchText)
      }

      return (
        todo.name.includes(searchText) &&
        (status === 'Completed' ? todo.completed : !todo.completed) &&
        (priorities.length ? priorities.includes(todo.priority) : true)
      )
    })
  }
)
```

##### Usage

```js
const todoList = useSelector(todosRemainingSelector)
```
