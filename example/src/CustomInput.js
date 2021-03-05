import React, {useState, useEffect} from "react"

const CustomInput=({cancellor,
  parentId,
  value,
  edit,
  submit,
  handleCancel,
  })=>{
    const [text, setText] = useState(value)

    const handleChange = (e) => {
        setText(e.target.value)
      }
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
                ? submit(cancellor, text, parentId, true, setText)
                : submit(cancellor, text, parentId, false, setText)
            }
            type='button'
            disabled={!text}
          >
            Post
          </button>
            <button onClick={() =>
              edit
                ? handleCancel(cancellor,edit)
                : handleCancel(cancellor,false)
            }>
              Cancel
            </button>
        </div>
      </form>)
}

export default CustomInput
