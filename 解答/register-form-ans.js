import { useState } from 'react'

export default function RegisterForm() {
  // 狀態為物件，屬性對應到表單的欄位名稱
  const [user, setUser] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agree: false, // checkbox 同意會員註冊條款
  })

  const [user2, setUser2] = useState({
    name: '輸入姓名',
    email: '輸入email',
    username: '輸入帳號',
    password: '輸入密碼',
    confirmPassword: '輸入確認密碼',
    agree: false, // checkbox 同意會員註冊條款
  })

  // 錯誤訊息狀態
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agree: '', // 錯誤訊息用字串
  })

  // checkbox 呈現密碼用
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // 多欄位共用事件函式
  const handleFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    // 先阻擋form表單元件的預設送出行為
    e.preventDefault()
    // 表單檢查--- START ---
    // 建立一個新的錯誤訊息物件
    const newErrors = { username: '', password: '' }

    // 開始檢查
    // if (user.username === '') {
    // if(user.username) 檢查如果有填寫
    // if(!user.username) 檢查如果沒填的話…
    if (!user.username) {
      newErrors.username = '帳號為必填'
    }

    if (!user.password) {
      newErrors.password = '密碼為必填'
    }

    if (!user.email) {
      newErrors.email = 'email為必填'
    }
    if (!user.name) {
      newErrors.name = '姓名為必填'
    }
    if (user.confirmPassword != user.password) {
      newErrors.confirmPassword = '密碼需相同'
    }
    if (!user.password) {
      newErrors.password = '密碼為必填'
    }
    if (!user.agree) {
      newErrors.agree = '需網站會員註冊條款'
    }

    // 檢查完成後設定到錯誤狀態
    setErrors(newErrors)

    // newErrors物件中如果有屬性值不是空白字串時，代表有錯誤發生
    const hasErrors = Object.values(newErrors).some((v) => v)

    // 如果有錯誤發生，停止接下來的送到伺服器程式碼
    if (hasErrors) {
      alert('有檢查到錯誤')
      return // 在函式內作流程控制用，執行到這會跳出函式執行
    }
    // 表單檢查--- END ---

    // 檢查都沒問題才會到這裡執行
    alert('送到伺服器')
  }

  return (
    <>
      <h1>註冊表單</h1>
      <form onSubmit={handleSubmit}>
        <label>
          姓名:{' '}
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleFieldChange}
          />
        </label>
        <br />
        <span className="error">{errors.name}</span>
        <br />
        <label>
          Email:{' '}
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleFieldChange}
          />
        </label>
        <br />
        <span className="error">{errors.email}</span>
        <br />
        <label>
          帳號:{' '}
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleFieldChange}
          />
        </label>
        <br />
        <span className="error">{errors.username}</span>
        <br />
        <label>
          密碼:{' '}
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={user.password}
            onChange={handleFieldChange}
          />
        </label>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={(e) => {
            setShowPassword(!showPassword)
          }}
        />{' '}
        顯示密碼
        <br />
        <span className="error">{errors.password}</span>
        <br />
        <label>
          確認密碼:{' '}
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleFieldChange}
          />
        </label>
        <input
          type="checkbox"
          checked={showConfirmPassword}
          onChange={(e) => {
            setShowConfirmPassword(!showConfirmPassword)
          }}
        />{' '}
        顯示密碼
        <br />
        <span className="error">{errors.confirmPassword}</span>
        <br />
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={user.agree ? true : false}
            onChange={handleFieldChange}
          />{' '}
          我同意網站會員註冊條款
        </label>
        <br />
        <span className="error">{errors.agree}</span>
        <br />
        <button type="submit">註冊</button>
        <button
          type="button"
          onClick={() => {
            setUser({
              name: '',
              email: '',
              username: '',
              password: '',
              confirmPassword: '',
              agree: false,
            }),
              setErrors({
                name: '',
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
                agree: '',
              }),
              setShowPassword(false),
              setShowConfirmPassword(false)
          }}
        >
          重置
        </button>
      </form>
      <style jsx>
        {`
          .error {
            color: red;
            font-size: 12px;
            height: 16px;
          }
        `}
      </style>
    </>
  )
}
