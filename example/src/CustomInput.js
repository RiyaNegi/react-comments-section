import React, {useState} from "react"

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
          value={text}
          onChange={handleChange}
        />
        <div >
          <button
            onClick={() =>submit(cancellor, text, parentId, edit, setText)}
            type='button'
            disabled={!text}
          >
            Post
          </button>
            <button onClick={() => handleCancel(cancellor,edit)}>
              Cancel
            </button>
        </div>
      </form>)
}

export default CustomInput
