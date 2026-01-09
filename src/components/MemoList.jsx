import MemoItem from './MemoItem'
import './MemoList.css'

function MemoList({ memos, onDelete, onToggleComplete, onEdit }) {
  if (memos.length === 0) {
    return (
      <div className="memo-list-empty">
        <p>📋 还没有备忘录，开始创建第一个吧！</p>
      </div>
    )
  }

  return (
    <div className="memo-list">
      <h2 className="memo-list-title">我的备忘录 ({memos.length})</h2>
      <div className="memo-items">
        {memos.map(memo => (
          <MemoItem
            key={memo.id}
            memo={memo}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default MemoList

