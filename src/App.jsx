import { useState, useEffect } from 'react'
import MemoList from './components/MemoList'
import MemoForm from './components/MemoForm'
import './App.css'

function App() {
  const [memos, setMemos] = useState([])
  const [editingMemo, setEditingMemo] = useState(null)

  // 从本地存储加载备忘录
  useEffect(() => {
    const savedMemos = localStorage.getItem('memos')
    if (savedMemos) {
      setMemos(JSON.parse(savedMemos))
    }
  }, [])

  // 保存到本地存储
  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos))
  }, [memos])

  // 添加备忘录
  const addMemo = (memo) => {
    const newMemo = {
      id: Date.now(),
      title: memo.title,
      content: memo.content,
      completed: false,
      createdAt: new Date().toLocaleString('zh-CN')
    }
    setMemos([newMemo, ...memos])
  }

  // 更新备忘录
  const updateMemo = (id, updatedMemo) => {
    setMemos(memos.map(memo => 
      memo.id === id 
        ? { ...memo, ...updatedMemo, updatedAt: new Date().toLocaleString('zh-CN') }
        : memo
    ))
    setEditingMemo(null)
  }

  // 删除备忘录
  const deleteMemo = (id) => {
    setMemos(memos.filter(memo => memo.id !== id))
  }

  // 切换完成状态
  const toggleComplete = (id) => {
    setMemos(memos.map(memo => 
      memo.id === id 
        ? { ...memo, completed: !memo.completed }
        : memo
    ))
  }

  // 开始编辑
  const startEdit = (memo) => {
    setEditingMemo(memo)
  }

  // 取消编辑
  const cancelEdit = () => {
    setEditingMemo(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 备忘录</h1>
        <p>记录你的想法和待办事项</p>
      </header>
      
      <main className="app-main">
        <MemoForm 
          onSubmit={editingMemo ? (memo) => updateMemo(editingMemo.id, memo) : addMemo}
          editingMemo={editingMemo}
          onCancel={cancelEdit}
        />
        
        <MemoList 
          memos={memos}
          onDelete={deleteMemo}
          onToggleComplete={toggleComplete}
          onEdit={startEdit}
        />
      </main>
    </div>
  )
}

export default App

