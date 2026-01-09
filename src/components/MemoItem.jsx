import './MemoItem.css'

function MemoItem({ memo, onDelete, onToggleComplete, onEdit }) {
  return (
    <div className={`memo-item ${memo.completed ? 'completed' : ''}`}>
      <div className="memo-checkbox">
        <input
          type="checkbox"
          checked={memo.completed}
          onChange={() => onToggleComplete(memo.id)}
        />
      </div>
      
      <div className="memo-content" onClick={() => onEdit(memo)}>
        {memo.title && (
          <h3 className="memo-title">{memo.title}</h3>
        )}
        {memo.content && (
          <p className="memo-text">{memo.content}</p>
        )}
        <div className="memo-meta">
          <span className="memo-date">{memo.createdAt}</span>
          {memo.updatedAt && (
            <span className="memo-date">更新于: {memo.updatedAt}</span>
          )}
        </div>
      </div>
      
      <div className="memo-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(memo)}
          title="编辑"
        >
          ✏️
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(memo.id)}
          title="删除"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default MemoItem

