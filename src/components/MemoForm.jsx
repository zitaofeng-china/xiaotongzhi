import { useState, useEffect } from 'react'
import './MemoForm.css'

function MemoForm({ onSubmit, editingMemo, onCancel }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (editingMemo) {
      setTitle(editingMemo.title || '')
      setContent(editingMemo.content || '')
    } else {
      setTitle('')
      setContent('')
    }
  }, [editingMemo])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() || content.trim()) {
      onSubmit({ title: title.trim(), content: content.trim() })
      setTitle('')
      setContent('')
    }
  }

  return (
    <div className="memo-form-container">
      <form className="memo-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>{editingMemo ? '编辑备忘录' : '新建备忘录'}</h2>
          {editingMemo && (
            <button type="button" className="cancel-btn" onClick={onCancel}>
              取消
            </button>
          )}
        </div>
        
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="标题（可选）"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="输入内容..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
          />
        </div>
        
        <button type="submit" className="submit-btn">
          {editingMemo ? '保存修改' : '添加备忘录'}
        </button>
      </form>
    </div>
  )
}

export default MemoForm

