import React, {useState, useEffect} from "react"

const CustomInput=({cancellor,
  parentId,
  child,
  value,
  handleCancelEdit,
  edit,
  onEdit,
  onSubmit,
  handleCancel,
  })=>{
    const [text, setText] = useState(value)

    const handleChange = (e) => {
        setText(e.target.value)
      }
    
      console.log(handleCancel)
    
    return(  <form>
        <input
          type='text'
          placeholder='Type your reply here.'
          component='input'
          value={text}
          onChange={handleChange}
        />
        <div >
          <button
            onClick={() =>
              edit === true
                ? (onEdit(cancellor, text, parentId),
                  handleCancelEdit(cancellor),
                  setText(''))
                : (onSubmit(text, parentId, child && child),
                  handleCancel(cancellor),
                  setText(''))
            }
            type='button'
            disabled={!text}
          >
            Post
          </button>
            <button>
              Cancel
            </button>
        </div>
      </form>)
}

export default CustomInput
